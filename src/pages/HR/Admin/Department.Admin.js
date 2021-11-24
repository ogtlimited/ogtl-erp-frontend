import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import departments from "../../../db/departments.json";

import LeaveTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { Link } from "react-router-dom";
import { departmentFormJson } from "../../../components/FormJSON/HR/Employee/department";
import FormModal2 from "../../../components/Modal/FormModal2";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import Select from "react-select";
import helper from "../../../services/helper";
import { create } from "yup/lib/Reference";

const Departments = withRouter(({ history }) => {
  const [template, settemplate] = useState({});
  const { formUpdate, setformUpdate, showAlert } = useAppContext();
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [deleteData, setdeleteData] = useState(null);
  const [departMentOpts, setDepartmentOts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [mode, setmode] = useState('add')
  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];

  const [allDepartments, setallDepartments] = useState([]);

  const breadcrumb = "Departments";
  const fetchDept = () => {
    settemplate(departmentFormJson)
    axiosInstance.get("/department").then((e) => {
      // console.log(e.data.data);
      setallDepartments(e?.data?.data);
      setunfiltered(e?.data?.data);
      const departOpts = e.data.data.map((e) => {
        return {
          label: e.department,
          value: e._id,
        };
      });
      setDepartmentOts(departOpts);
    });
  };
  const editRow = (row) => {
    // setformUpdate(null)
    let formatted = helper.handleEdit(row)
    setmode('edit')
    setformUpdate(formatted);
    setclickedRow(formatted);
  };
  const create = () =>{
    let initialValues = {};
      for (let i in template) {
        initialValues[i] = "";
        // console.log(i);
      }
      setmode('add')
      setformValue(initialValues)
      seteditData(initialValues)
  }

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setallDepartments(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.department));

      setallDepartments(filt);
    }
  };
  useEffect(() => {
    fetchDept();
    setallDepartments(departments);
  }, [])

  useEffect(() => {
    console.log(formValue);
    console.log(editData);
    if (submitted) {
      if (mode == 'add') {
        axiosInstance
          .post("/department", formValue)
          .then((e) => {
            console.log(e);
            // setformValue({});
            fetchDept()
            showAlert(true, "New department created", "alert alert-success")
          })
          .catch((err) => {
            setformValue(null);
            console.log(err);
          });
      } else {
        console.log(editData);
        console.log(formValue);
        axiosInstance
          .put("/department/" + editData._id, formValue)
          .then((e) => {
            console.log(e);
            setformValue(null);
            showAlert(true, "Department successfully updated", "alert alert-success")
            fetchDept();
          })
          .catch((err) => {
            setformValue(null);
            console.log(err);
          });
      }
    }
  }, [formValue]);
  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted]);
  const columns = [
    {
      dataField: "",
      text: "#",
      headerStyle: { width: "5%" },
      formatter: (cell, row, rowIndex) => <span>{rowIndex + 1}</span>,
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      headerStyle: { width: "85%" },
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
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
              onClick={() => editRow(row)}
              href="#"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => setdeleteData(row)}
              href="#"
              data-toggle="modal"
              data-target="#FormModal"
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
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Department</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Department</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={()=> create()}
            >
              <i className="fa fa-plus"></i> Add Department
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={departMentOpts}
            placeholder="Filter Departments"
            isClearable={true}
            style={{ display: "inline-block" }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>
        <LeaveTable
          data={allDepartments}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      {/* departmentFormJson */}
      <FormModal2
        title="Create Department"
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
    </>
  );
});

export default Departments;
