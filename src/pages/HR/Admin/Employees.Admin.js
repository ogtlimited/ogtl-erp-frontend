import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { employeeFormJson } from "../../../components/FormJSON/HR/Employee/employee";
import PageHeader from "../../../components/Misc/PageHeader";
import FormModal2 from "../../../components/Modal/FormModal2";
import FormModal from "../../../components/Modal/Modal";
import EmployeesTable from "../../../components/Tables/EmployeeTables/employeeTable";
import GeneralTable from "../../../components/Tables/Table";
import { useAppContext } from "../../../Context/AppContext";

import designation from "../../../db/designation.json";
import { employeeList } from "../../../db/employee";
import axiosInstance from "../../../services/api";
import helper from "../../../services/helper";
const AllEmployeesAdmin = () => {
  const breadcrumb = "All Employees";
  const { setallEmployees, fetchEmployee, allEmployees, combineRequest } =
    useAppContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [template, settemplate] = useState({});
  const [submitted, setsubmitted] = useState(false);

  // console.log(allEmployees);
  useEffect(() => {
    fetchEmployee()
    const obj = helper.formArrayToObject(employeeFormJson.Fields);
        settemplate(obj);
        
  }, [])
  useEffect(() => {
    
    combineRequest().then((res) => {
      console.log(res);
      const { shifts, designations, employeeTypes, departments, projects, acceptedJobOffers } =
        res.data.createEmployeeFormSelection;
      const appOpts = acceptedJobOffers?.map((e) => {
        return {
          label: e.job_applicant_id.first_name + ' ' + e.job_applicant_id.last_name + ' ' + e.job_applicant_id.middle_name,
          value: e.job_applicant_id.first_name + '-' + e.job_applicant_id.last_name + '-' + e.job_applicant_id.middle_name,
        };
      });
      const shiftsopts = shifts?.map((e) => {
        return {
          label: e.shift_name,
          value: e._id,
        };
      });
      const campaingOpts = projects?.map((e) => {
        return {
          label: e.project_name,
          value: e._id,
        };
      });
      const empTypeopts = employeeTypes?.map((e) => {
        return {
          label: e.type,
          value: e._id,
        };
      });
      const deptopts = departments?.map((e) => {
        return {
          label: e.department,
          value: e._id,
        };
      });
      const designationOpts = designations?.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      const finalForm = employeeFormJson.Fields.map((field) => {
        if (field.name === "designation") {
          field.options = designationOpts;
          return field;
        } else if (field.name === "default_shift") {
          field.options = shiftsopts;
          return field;
        } 
        else if (field.name === "applicant") {
          console.log('APPLICANT')
          field.options = appOpts;
          return field;
        } 
        else if (field.name === "department") {
          field.options = deptopts;
          return field;
        } else if (field.name === "employment_type") {
          field.options = empTypeopts;
          return field;
        } else if (field.name === "projectId") {
          field.options = campaingOpts;
          return field;
        }
        return field;
      });
      // settemplate(
      //   {
      //     title: employeeFormJson.title,
      //     Fields: finalForm
      //   }
      // )
      const obj = helper.formArrayToObject(finalForm);
      settemplate(obj);
      console.log(obj);
    });
  }, []);

  useEffect(() => {
    console.log(submitted);
    if (formValue && Object.keys(formValue).length > 0) {
      formValue.image = "";
      const fullName = formValue.applicant.split('-')
      formValue.first_name = fullName[0]
      formValue.last_name = fullName[1]
      formValue.middle_name = fullName[2]
      delete formValue.applicant
      axiosInstance.post("/employees", formValue).then((res) => {
        fetchEmployee();
        setsubmitted(false);
        console.log(res);
      });
    }
    console.log(formValue);
  }, [submitted, formValue]);

  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employee</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Employee
            </a>
            <div className="view-icons">
              <a
                href="employees.html"
                className="grid-view btn btn-link active"
              >
                <i className="fa fa-th"></i>
              </a>
              <a href="employees-list.html" className="list-view btn btn-link">
                <i className="fa fa-bars"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <EmployeesTable
        data={allEmployees}
        departments={designation}
        defaultSorted={defaultSorted}
        selectedOption={selectedOption}
      />
    
      <FormModal2
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
    </>
  );
};

export default AllEmployeesAdmin;
