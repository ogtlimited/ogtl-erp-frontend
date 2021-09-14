import React, { useMemo, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import departments from "../../../db/departments.json";



import GeneralTable from "../../../components/Tables/Table";
import { Link } from "react-router-dom";
import FormModal from "../../../components/Modal/Modal";
import { departmentFormJson } from "../../../components/FormJSON/HR/Employee/department";
import FormModal2 from "../../../components/Modal/FormModal2";

let qualityFilter;

const Departments = withRouter(({ history }) => {
  const [template, settemplate] = useState([])
  const [submitted, setsubmitted] = useState(false)
  const [formValue, setformValue] = useState({})
  const [editData, seteditData] = useState({});
  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];
//   const { departments, user } = useContext(AppContext);
//   const loggedUser = user || JSON.parse(localStorage.getItem("user"));
  const HRpeople = [
    "ceo",
    "coo",
    "hr manager",
    "hr senior associate",
    "hr user",
    "team leader",
    "operations and training director",
    "supervisor",
    "operations manager/training manager/supervisor",
    "team lead",
    "team leader",
    "trainer",
  ];
  const [allDepartments, setallDepartments] = useState([]);

  const breadcrumb = "Departments";

  useEffect(() => {
  

    setallDepartments(departments);
  }, [departments]);
  useEffect(() => {
    console.log(formValue)
   
  }, [formValue, submitted]);
  const columns = [
    {
      dataField: "department_name",
      text: "Department",
      sort: true,
      headerStyle: { width: "580px" },
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { width: "236px" },
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
            >
              <i className="fa fa-plus"></i> Add Department
            </a>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <GeneralTable
          data={departments}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      <FormModal2 title="Create Department" editData={editData} setformValue={setformValue} template={departmentFormJson} setsubmitted={setsubmitted} />
    </>
  );
});

export default Departments;
