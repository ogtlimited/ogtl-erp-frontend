import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { salaryDeductionTypesFormJson } from "../../components/FormJSON/payroll/salary-deductiontypes";
import FormModal2 from "../../components/Modal/FormModal2";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import moment from "moment";
import HelperService from "../../services/helper";

const DeductionType = () => {
  const [template, setTemplate] = useState(salaryDeductionTypesFormJson);
  const { createEmployee, showAlert, setformUpdate } = useAppContext();
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const [statusRow, setstatusRow] = useState({});
  const [status, setStatus] = useState("");

  const [mode, setmode] = useState("add");

  const fetchDeductionType = () => {
    axiosInstance
      .get("/api/deductionType")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDeductionType();
  }, []);

  useEffect(() => {
    createEmployee().then((res) => {
      const { departments } = res.data.createEmployeeForm;
      console.log("departments", departments);

      const deptOpts = departments?.map((e) => {
        return {
          label: `${e.department}`,
          value: e._id,
        };
      });
      console.log("departments again", deptOpts);
      const finalForm = salaryDeductionTypesFormJson.Fields.map((field) => {
        if (field.name === "departmentId") {
          field.options = deptOpts;
          return field;
        }
        return field;
      });

      setTemplate({
        title: salaryDeductionTypesFormJson.title,
        Fields: finalForm,
      });
      if (!loadSelect) setloadSelect(true);
    });
  }, []);

  useEffect(() => {
    if (submitted === true) {
      axiosInstance
        .post("/api/deductionType", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchDeductionType();
          setData((prevData) => [...data, res.data.data]);

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
  }, [submitted, formValue]);

  //delete score card
  const deleteDeductionType = (row) => {
    axiosInstance
      .delete(`/api/deductionType/${row._id}`)
      .then((res) => {
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const updateDeductionType = (row) => {
    axiosInstance
      .patch(`/api/deductionType/${row._id}`, row)
      .then((res) => {
        setData((prevData) => [...data, res.data.data]);
        fetchDeductionType();
        showAlert(true, res?.data?.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error?.response?.data?.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "departmentId",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row?.departmentId?.department}</h2>,
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
      csvExport: false,
      headerStyle: { minWidth: "70px", textAlign: "left" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="tab-pane" id="tab_deduction_types">
      <div>
        <div className="row">
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#test1"
            >
              Add Deduction Type
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="col-3 mb-2"></div>
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>

      <FormModal2
        id="test1"
        title="Add Deduction Type"
        editData={editData}
        setformValue={setFormValue}
        template={HelperService.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />

      <ConfirmModal
        title="Deduction Types"
        selectedRow={selectedRow}
        deleteFunction={deleteDeductionType}
      />
    </div>
  );
};

export default DeductionType;
