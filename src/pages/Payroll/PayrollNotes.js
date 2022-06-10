import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { salaryPayrollNotesFormJson } from "../../components/FormJSON/payroll/payroll-notes";
import FormModal2 from "../../components/Modal/FormModal2";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import moment from "moment";
import HelperService from "../../services/helper";
import GeneralApproverBtn from "../../components/Misc/GeneralApproverBtn";

const statusOptions = [
  {
    title: "Pending",
    color: "text-primary",
  },
  {
    title: "Seen by accounts",
    color: "text-secondary",
  },
  {
    title: "In progress",
    color: "text-info",
  },
  {
    title: "Completed",
    color: "text-success",
  },
];

const PayrollNotes = () => {
  const [template, setTemplate] = useState(salaryPayrollNotesFormJson);
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

  const fetchPayrollNotes = () => {
    axiosInstance
      .get("/api/notes")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchPayrollNotes();
  }, []);

  useEffect(() => {
    createEmployee().then((res) => {
      const { employees } = res.data.createEmployeeForm;

      const empOpts = employees?.map((e) => {
        return {
          label: `${e.first_name}  ${e.last_name}`,
          value: e._id,
        };
      });
      const finalForm = salaryPayrollNotesFormJson.Fields.map((field) => {
        if (field.name === "employeeId") {
          field.options = empOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: salaryPayrollNotesFormJson.title,
        Fields: finalForm,
      });
      if (!loadSelect) setloadSelect(true);
    });
  }, []);

  useEffect(() => {
    if (submitted === true) {
      axiosInstance
        .post("/api/notes", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchPayrollNotes();
          setData((prevData) => [...data, res.data.data]);

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
  }, [submitted, formValue]);

  const deletePayrollNotes = (row) => {
    axiosInstance
      .delete(`/api/notes/${row._id}`)
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

  const updatePayrollNotes = (row) => {
    axiosInstance
      .patch(`/api/notes/${row._id}`, row)
      .then((res) => {
        setData((prevData) => [...data, res.data.data]);
        fetchPayrollNotes();
        showAlert(true, res?.data?.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error?.response?.data?.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "employeeId",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <h2>
          {row?.employeeId?.first_name} {row?.employeeId?.last_name}
        </h2>
      ),
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={statusOptions}
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
            <h3 className="page-title">
              Payroll Addition and Subtraction Notes
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>

              <li className="breadcrumb-item active">Payroll Notes List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add Payroll Note
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
          title="Add Note"
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />
      )}
      <ConfirmModal
        title="Payroll Note"
        selectedRow={selectedRow}
        deleteFunction={deletePayrollNotes}
      />
    </>
  );
};

export default PayrollNotes;
