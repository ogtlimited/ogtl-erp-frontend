import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { salaryDeductionsFormJson } from "../../components/FormJSON/payroll/salary-deductions";
import FormModal2 from "../../components/Modal/FormModal2";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import moment from "moment";
import HelperService from "../../services/helper";

const Deductions = () => {
  const [template, setTemplate] = useState(salaryDeductionsFormJson);
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

  const fetchDeductions = () => {
    axiosInstance
      .get("/api/deduction")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDeductions();
  }, []);

  useEffect(() => {
    createEmployee().then((res) => {
      const { employees } = res.data.createEmployeeForm;

      const deptOpts = employees?.map((e) => {
        return {
          label: `${e.first_name}  ${e.last_name}`,
          value: e._id,
        };
      });
      const finalForm = salaryDeductionsFormJson.Fields.map((field) => {
        if (field.name === "employeeId") {
          field.options = deptOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: salaryDeductionsFormJson.title,
        Fields: finalForm,
      });
      if (!loadSelect) setloadSelect(true);
    });
  }, []);

  useEffect(() => {
    if (submitted === true) {
      axiosInstance
        .post("/api/deduction", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchDeductions();
          setData((prevData) => [...data, res.data.data]);

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
  }, [submitted, formValue]);

  const deleteDeductions = (row) => {
    axiosInstance
      .delete(`/api/deduction/${row._id}`)
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

  const updateDeductions = (row) => {
    axiosInstance
      .patch(`/api/deduction/${row._id}`, row)
      .then((res) => {
        setData((prevData) => [...data, res.data.data]);
        fetchDeductions();
        showAlert(true, res?.data?.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error?.response?.data?.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "employee_id",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <h2>
          {row.employee_id.first_name} {row.employee_id.last_name}
        </h2>
      ),
    },
    {
      dataField: "deductionTypeId",
      text: "Deduction Type",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row?.deductionTypeId?.title}</h2>,
    },
    {
      dataField: "quantity",
      text: "Quantity",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
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
    <div className="tab-pane" id="tab_deductions">
      <div>
        <div className="row">
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add Deduction
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
      {loadSelect && (
        <FormModal2
          title="Add Deduction"
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />
      )}
      <ConfirmModal
        title="Deductions"
        selectedRow={selectedRow}
        deleteFunction={deleteDeductions}
      />
    </div>
  );
};

export default Deductions;
