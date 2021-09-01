import React, { useMemo, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import departments from "../../../db/designationList.json";
import {designation} from "../../../components/FormJSON/HR/Employee/designation";
import FormModal from '../../../components/Modal/Modal'



import GeneralTable from "../../../components/Tables/Table";
import { Link } from "react-router-dom";

let qualityFilter;

const Designations = withRouter(({ history }) => {
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
  const [formValue, setformValue] = useState({});

  const breadcrumb = "Departments";

  useEffect(() => {
    //   if(loggedUser != null){
    //     if(!HRpeople.includes(loggedUser?.designation?.toLowerCase())){
    //       history.push('/forbidden')
    //     }
    //   }

    setallDepartments(departments);
  }, [departments]);
  const columns = [
    {
      dataField: "department_name",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "450px" },
    },
    {
      dataField: "designations",
      text: "Designation",
      sort: true,
      headerStyle: { minWidth: "350px" },
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
  ];
  return (
    <>
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Designations</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Designations</li>
            </ul>
          </div>
          <div class="col-auto float-right ml-auto">
            <a
              href="#"
              class="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i class="fa fa-plus"></i> Add Designation
            </a>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <GeneralTable
          data={departments}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      <FormModal setformValue={setformValue} template={designation} />
    </>
  );
});

export default Designations;
