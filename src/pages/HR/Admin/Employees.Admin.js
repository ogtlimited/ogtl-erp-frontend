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
import Papa from "papaparse";
import helper from "../../../services/helper";
import UploadModal from "../../../components/Modal/uploadModal";
const AllEmployeesAdmin = () => {
  const breadcrumb = "All Employees";
  const { setallEmployees, fetchEmployee, allEmployees, combineRequest } =
    useAppContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [template, settemplate] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [toggleModal, settoggleModal] = useState(false)
  const [uploading, setuploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  // console.log(allEmployees);
  useEffect(() => {
    fetchEmployee();
    const obj = helper.formArrayToObject(employeeFormJson.Fields);
    settemplate(obj);
  }, []);
  useEffect(() => {
    console.log(editData);
  }, [editData]);
  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const {
        shifts,
        designations,
        employeeTypes,
        departments,
        projects,
        acceptedJobOffers,
        employees,
      } = res.data.createEmployeeFormSelection;
      const appOpts = acceptedJobOffers?.map((e) => {
        return {
          label:
            e.job_applicant_id.first_name +
            " " +
            e.job_applicant_id.last_name +
            " " +
            e.job_applicant_id.middle_name,
          value:
            e.job_applicant_id.first_name +
            "-" +
            e.job_applicant_id.last_name +
            "-" +
            e?.job_applicant_id.middle_name,
        };
      });
      const reportstoOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
          value: e._id,
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
      setDepartments(deptopts);
      const finalForm = employeeFormJson.Fields.map((field) => {
        if (field.name === "designation") {
          field.options = designationOpts;
          return field;
        } else if (field.name === "default_shift") {
          field.options = shiftsopts;
          return field;
        } else if (field.name === "applicant") {
          console.log("APPLICANT");
          field.options = appOpts;
          return field;
        } else if (field.name === "department") {
          field.options = deptopts;
          return field;
        } else if (field.name === "employment_type") {
          field.options = empTypeopts;
          return field;
        } else if (field.name === "projectId") {
          field.options = campaingOpts;
          return field;
        } else if (field.name === "reports_to") {
          field.options = reportstoOpts;
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
      let initialValues = {};
      for (let i in obj) {
        initialValues[i] = "";
        // console.log(i);
      }
      seteditData(initialValues);
      // console.log(initialValues);
      settemplate(obj);
      console.log(obj);
    });
  }, []);

  useEffect(() => {
    console.log(submitted);
    if (formValue && Object.keys(formValue).length > 0) {
      formValue.image = "";
      const fullName = formValue.applicant?.split("-");
      formValue.first_name = fullName[0];
      formValue.last_name = fullName[1];
      formValue.middle_name = fullName[2];
      delete formValue.applicant;
      console.log(formValue)
      axiosInstance.post("/employees", formValue).then((res) => {
        fetchEmployee();
        setsubmitted(false);
        console.log(res);
      });
    }
    console.log(formValue);
  }, [submitted, formValue]);

  const onFileUpload = (e) =>{
    const files = e.target.files;
    console.log(files);
    if (files) {
      console.log(files[0]);
      Papa.parse(files[0], {
        complete: function(results) {
          const jsonData = helper.arrayToJSONObject(results.data)
          console.log(jsonData)
          axiosInstance.post("/employees/bulk", jsonData).then(res =>{
            console.log(res)
            fetchEmployee()
          }).catch(err => console.log(err))
          console.log("Finished:", results.data);
        }}
      )
    }
  }
  
  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];
  return (
    <>

    {/* { uploading && <div class="progress mb-3">
    <div class="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div> } */}
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
              className="btn add-btn "
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Employee
            </a>
            <button onClick={()=> settoggleModal(true)} type="button" class="btn add-btn mx-3" data-toggle="modal" data-target="#uploadModal">
            <i className="fa fa-cloud-upload"></i>
              Bulk Upload
            </button>



            
            {/* <label className="btn add-btn mx-2">
      <input
        type="file"
        style={{display: 'none'}}
        accept=".csv,.xlsx,.xls"
        onChange={(e) => onFileUpload(e)}
      />
      <i className="fa fa-cloud-upload"></i>
      Bulk Upload
    </label> */}
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
        seteditData={seteditData}
        departments={departments}
        defaultSorted={defaultSorted}
        selectedOption={selectedOption}
      />
      {toggleModal && 
      <UploadModal setUploadSuccess={setUploadSuccess} setuploading={setuploading} settoggleModal={settoggleModal} fetchEmployee={fetchEmployee} />
      
      }

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
