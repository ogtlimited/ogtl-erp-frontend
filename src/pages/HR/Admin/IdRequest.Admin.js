import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { idRequestJson } from "../../../components/FormJSON/HR/Employee/idrequest";
import FormModal from "../../../components/Modal/Modal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import moment from "moment";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";

const IdRequest = () => {
  const [approval, setApproval] = useState([
    {
      title: "open",
      color: "text-secondary",
    },
    {
      title: "sent to production",
      color: "text-info",
    },
    {
      title: "Id card created",
      color: "text-info",
    },
    {
      title: "submitted to HR",
      color: "text-info",
    },
    {
      title: "issued to employee",
      color: "text-success",
    },
  ]);
  const [template, setTemplate] = useState(idRequestJson);
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

  const fetchOrientation = () => {
    axiosInstance
      .get("/api/id-request")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchOrientation();
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
      const finalForm = idRequestJson.Fields.map((field) => {
        if (field.name === "employee_id") {
          field.options = deptOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: idRequestJson.title,
        Fields: finalForm,
      });
      if (!loadSelect) setloadSelect(true);
    });
  }, []);

  useEffect(() => {
    if (submitted === true) {
      axiosInstance
        .post("/api/id-request", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchOrientation();
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
  const deleteOrientation = (row) => {
    axiosInstance
      .delete(`/api/id-request/${row._id}`)
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

  const updateOrientation = (row) => {
    axiosInstance
      .patch(`/api/id-request/${row._id}`, row)
      .then((res) => {
        setData((prevData) => [...data, res.data.data]);
        fetchOrientation();
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
      dataField: "employee_id",
      text: "Date Hired",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <h2>
          {moment(row.employee_id.date_of_joining).format("Do MMM, YYYY")}
        </h2>
      ),
    },
    {
      dataField: "employee_id",
      text: "Job Title",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <h2>{row.employee_id.designation.designation}</h2>
      ),
    },
    {
      dataField: "employee_id",
      text: "Employee Id",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row.employee_id.ogid}</h2>,
    },
    {
      dataField: "employee_id",
      text: "Contract Type",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row.employee_id.employeeType}</h2>,
    },
    {
      dataField: "date",
      text: "Effective Date",
      sort: true,
      formatter: (value, row) => (
        <h2>{moment(row.start_date).format("Do MMM, YYYY")}</h2>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "120px" },
      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={approval}
            setStatus={setStatus}
            value={value}
            row={row}
            setstatusRow={setstatusRow}
          />
        </>
      ),
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
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Permanent ID Request</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>

              <li className="breadcrumb-item active">
                Permanent ID Request List
              </li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Request Permanent ID
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
        <FormModal
          editData={editData}
          setformValue={setFormValue}
          template={template}
          setsubmitted={setSubmitted}
        />
      )}
      <ConfirmModal
        title="Orientation"
        selectedRow={selectedRow}
        deleteFunction={deleteOrientation}
      />
    </>
  );
};

export default IdRequest;
