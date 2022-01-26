import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { employeeFormJson } from "../../../components/FormJSON/HR/Employee/employee";

import FormModal2 from "../../../components/Modal/FormModal2";
import EmployeesTable from "../../../components/Tables/EmployeeTables/employeeTable";

import { useAppContext } from "../../../Context/AppContext";

import axiosInstance from "../../../services/api";
import Papa from "papaparse";
import helper from "../../../services/helper";
import UploadModal from "../../../components/Modal/uploadModal";
import EmployeeHelperService from "./employee.helper";
const AllEmployeesAdmin = () => {
  const breadcrumb = "All Employees";
  const {
    setallEmployees,
    fetchEmployee,
    allEmployees,
    createEmployee,
    showAlert,
  } = useAppContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [template, settemplate] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [filters, setfilters] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [combinedData, setcombinedData] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loadForm, setloadForm] = useState(false);
  const [mode, setmode] = useState("add");
  const { user } = useAppContext();
  // console.log(allEmployees);
  useEffect(() => {
    // fetchEmployee();
    const obj = helper.formArrayToObject(employeeFormJson.Fields);
    settemplate(obj);
  }, []);

  useEffect(() => {}, [editData, mode]);
  useEffect(() => {
    createEmployee().then((res) => {
      // console.log(res);
      setcombinedData(res);
      const {
        shifts,
        designations,
        branches,
        departments,
        projects,
        acceptedJobOffers,
        employees,
      } = res.data.createEmployeeForm;
      const empHelper = new EmployeeHelperService(
        shifts,
        designations,
        branches,
        departments,
        projects,
        acceptedJobOffers,
        employees
      );
      const service = empHelper.mapRecords();
      // console.log(service);
      setfilters([
        {
          name: "projectId",
          placeholder: "Filter by campaign",
          options: service.campaingOpts,
        },
        {
          name: "department",
          placeholder: "Filter by department",
          options: service.deptopts,
        },
        {
          name: "designation",
          placeholder: "Filter by designation",
          options: service.designationOpts,
        },
      ]);
      const finalForm = empHelper.finalForm(employeeFormJson, service, mode);
      // settemplate(
      //   {
      //     title: employeeFormJson.title,
      //     Fields: finalForm
      //   }
      // )
      const obj = helper.formArrayToObject(finalForm);
      let initialValues = {
        leaveCount: 0,
      };
      for (let i in obj) {
        initialValues[i] = "";
        // console.log(i);
      }
      console.log(mode);
      if (mode == "add") {
        // seteditData(initialValues);
        settemplate(obj);
      } else {
        // settemplate(obj);
      }
      // console.log(template);
      if (!loadForm) setloadForm(true);
      // console.log(obj);
    });
  }, [mode]);
  const create = () => {
    let initialValues = {};
    for (let i in template) {
      console.log(i);
      if (i == "isAdmin") {
        initialValues[i] = false;
      } else if (i == "date_of_joining") {
        initialValues[i] = new Date().toISOString().slice(0, 10);
      } else {
        initialValues[i] = "";
      }
      console.log(initialValues);
    }
    setformValue(initialValues);
    seteditData(initialValues);
  };
  // Submit
  useEffect(() => {
    // console.log(formValue, mode, editData);
    if (submitted) {
      formValue.image = "";
      const fullName = formValue.applicant?.split("-");
      if (mode === "add") {
        formValue["first_name"] = fullName[0];
        formValue["last_name"] = fullName[1];
        formValue["middle_name"] = fullName[2];
        delete formValue.applicant;
      }
      console.log(formValue, mode, "MODE EDIT");
      if (mode === "add") {
        axiosInstance.post("/employees", formValue).then((res) => {
          fetchEmployee();
          setsubmitted(false);
          showAlert(
            true,
            "New Employee created successfully",
            "alert alert-success"
          );
          console.log(res);
        });
      } else {
        let id = editData._id;
        console.log(id);
        let values = {};
        for (let i in template) {
          values[i] = formValue[i];
          // console.log(i);
        }
        axiosInstance.put("/employees/" + id, values).then((res) => {
          fetchEmployee();
          setsubmitted(false);
          seteditData({});
          console.log(res);
          showAlert(
            true,
            "Employee Details successfully updated",
            "alert alert-success"
          );
        });
      }
    }
    // console.log(formValue);
  }, [submitted, formValue]);

  // File upload
  const onFileUpload = (e) => {
    const files = e.target.files;
    console.log(files);
    if (files) {
      console.log(files[0]);
      Papa.parse(files[0], {
        complete: function (results) {
          const jsonData = helper.arrayToJSONObject(results.data);
          console.log(jsonData);
          axiosInstance
            .post("/employees/bulk", jsonData)
            .then((res) => {
              console.log(res);
              showAlert(
                true,
                "Data uploaded successfully",
                "alert alert-success"
              );
              fetchEmployee();
            })
            .catch((err) => {
              console.log(err);
              showAlert(true, err?.message, "alert alert-danger");
            });
          console.log("Finished:", results.data);
        },
      });
    }
  };

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
            {user?.role?.hr?.create && (
              <>
                <a
                  href="#"
                  className="btn add-btn "
                  data-toggle="modal"
                  data-target="#FormModal"
                  onClick={() => create()}
                >
                  <i className="fa fa-plus"></i> Add Employee
                </a>
                <button
                  onClick={() => settoggleModal(true)}
                  type="button"
                  class="btn add-btn mx-3"
                  data-toggle="modal"
                  data-target="#uploadModal"
                >
                  <i className="fa fa-cloud-upload"></i>
                  Bulk Upload
                </button>
              </>
            )}
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
        setmode={setmode}
        filters={filters}
        loadForm={loadForm}
        defaultSorted={defaultSorted}
        selectedOption={selectedOption}
      />
      {toggleModal && (
        <UploadModal
          setUploadSuccess={setUploadSuccess}
          setuploading={setuploading}
          settoggleModal={settoggleModal}
          fetchEmployee={fetchEmployee}
        />
      )}

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
