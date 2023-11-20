/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { orientationFormJson } from "../../../components/FormJSON/HR/recruitment/orientationAndTraining";
import FormModal2 from "../../../components/Modal/FormModal2";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import moment from "moment";
import HelperService from "../../../services/helper";
import helper from "../../../services/helper";

const OrientationAndTraining = () => {
  const [template, setTemplate] = useState(orientationFormJson);
  const { createEmployee, showAlert, setformUpdate } = useAppContext();
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const [clickedRow, setclickedRow] = useState(null);
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");

  const [mode, setmode] = useState("add");
  const editRow = (row) => {
    setmode("edit");
    seteditData(row);
    let formatted = helper.handleEdit(row);
    setformUpdate(formatted);
    setclickedRow(formatted);
  };

  const create = () => {
    let initialValues = {};
    let temp = HelperService.formArrayToObject(template.Fields);
    for (let i in temp) {
      initialValues[i] = "";
    }
    setmode("add");

    setFormValue(initialValues);
    seteditData(initialValues);
  };

  const fetchOrientation = () => {
    axiosInstance
      .get("/api/orientation-and-training")
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
      const { departments, employees } = res.data.createEmployeeForm;
      const newDepartments = departments.filter(
        (e) =>
          e.department === "HR" ||
          e.department === "IT" ||
          e.department === "FACILITY" ||
          e.department === "OPERATIONS" ||
          e.department === "Accounting"
      );

      const deptOpts = newDepartments?.map((e) => {
        return {
          label: `${e.department}`,
          value: e._id,
        };
      });

      const EmpOpts = employees?.map((e) => {
        return {
          label: `${e.first_name}  ${e.last_name}`,
          value: e._id,
        };
      });
      const finalForm = orientationFormJson.Fields.map((field) => {
        if (field.name === "department_id") {
          field.options = deptOpts;
          return field;
        }

        if (field.name === "employee_id") {
          field.options = EmpOpts;
          return field;
        }
        return field;
      });
      // console.log(finalForm)
      // setTemplate({
      //   title: orientationFormJson.title,
      //   Fields: HelperService.formArrayToObject(finalForm),
      // });
      if (!loadSelect) setloadSelect(true);
    });
  }, []);

  useEffect(() => {
    if (submitted === true) {
      if (mode === "add") {
        axiosInstance
          .post("/api/orientation-and-training", formValue)
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
      } else {
        const editInfo = {
          ...editData,
          department_id: editData.department_id?._id,
        }
        delete editInfo.createdAt;
        delete editInfo.updatedAt;
        delete editInfo.__v;
        updateOrientation(editInfo);
      }
    }
  }, [submitted, formValue]);

  //delete score card
  const deleteOrientation = (row) => {
    
    axiosInstance
      .delete(`/api/orientation-and-training/${row._id}`)
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
      .patch(`/api/orientation-and-training/${row._id}`, row)
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
      dataField: "department_id",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row.department_id.department}</h2>,
    },
    {
      dataField: "start_date",
      text: "Date",
      sort: true,
      formatter: (value, row) => (
        <h2>{moment(row.start_date).format("Do MMM, YYYY")}</h2>
      ),
    },
    {
      dataField: "end_date",
      text: "Time",
      sort: true,
      formatter: (value, row) => <h2>{row.end_date}</h2>,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "attendance",
      text: "Attendance",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },

    {
      dataField: "employee_id",
      text: "Candidates",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <div className="dropdown">
      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Candidates
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {row.employee_id.map(employee =>(
             <a key= {employee._id} className="dropdown-item" href="#">{employee.first_name.toUpperCase()} {employee.last_name.toUpperCase()}</a>
        ))}
       
      </div>
    </div>

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
              data-target="#FormModal"
              onClick={() => editRow(row)}
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>

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
              Orientation and Customer Service Training
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>

              <li className="breadcrumb-item active">
                Orientation and Customer Service Training Schedule
              </li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => create()}
            >
              <i className="fa fa-plus"></i> Schedule
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
          title="Create Orientation and Training"
          editData={editData}
          setformValue={setFormValue}
          template={helper.formArrayToObject(template.Fields)}
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

export default OrientationAndTraining;
