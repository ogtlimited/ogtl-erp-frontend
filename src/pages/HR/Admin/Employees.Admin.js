/* eslint-disable jsx-a11y/anchor-is-valid */

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
    employeeStatus,
    status
  } = useAppContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    // fetchEmployee();
    const obj = helper.formArrayToObject(employeeFormJson.Fields);
    settemplate(obj);
  }, []);

  useEffect(() => {}, [editData, mode]);
  useEffect(() => {
    createEmployee().then((res) => {
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
        employees,
        status
      );
      const service = empHelper.mapRecords();

      // const status = []
      

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
        {
          name: "status",
          placeholder: "Filter by status",
          options: service.employeestatusOpts,
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
      }

      if (mode == "add") {
        // seteditData(initialValues);
        settemplate(obj);
      } else {
        // settemplate(obj);
      }

      if (!loadForm) setloadForm(true);
    });
  }, [mode]);
  const create = () => {
    let initialValues = {};
    for (let i in template) {
      if (i == "isAdmin") {
        initialValues[i] = false;
      } else if (i == "date_of_joining") {
        initialValues[i] = new Date().toISOString().slice(0, 10);
      } else {
        initialValues[i] = "";
      }
    }
    setformValue(initialValues);
    seteditData(initialValues);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  // Submit
  useEffect(() => {
    if (submitted) {
      formValue.image = "";
      const fullName = formValue.applicant?.split("-");
      if (mode === "add") {
        formValue["first_name"] = fullName[0];
        formValue["last_name"] = fullName[1];
        formValue["middle_name"] = fullName[2];
        delete formValue.applicant;
      }

      if (mode === "add") {
        axiosInstance.post("/employees", formValue).then((res) => {
          fetchEmployee();
          setsubmitted(false);
          showAlert(
            true,
            "New Employee created successfully",
            "alert alert-success"
          );
        });
      } else {
        let id = editData._id;

        let values = {};
        for (let i in template) {
          values[i] = formValue[i];
        }
        axiosInstance.put("/employees/" + id, values).then((res) => {
          fetchEmployee();
          setsubmitted(false);
          seteditData({});

          showAlert(
            true,
            "Employee Details successfully updated",
            "alert alert-success"
          );
        });
      }
    }
  }, [submitted, formValue]);

  // File upload
  const onFileUpload = (e) => {
    const files = e.target.files;

    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          const jsonData = helper.arrayToJSONObject(results.data);

          axiosInstance
            .post("/employees/bulk", jsonData)
            .then((res) => {
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
      {/* { uploading && <div className="progress mb-3">
    <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
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
                  className="btn add-btn mx-3"
                  data-toggle="modal"
                  data-target="#uploadModal"
                >
                  <i className="fa fa-cloud-upload"></i>
                  Bulk Upload
                </button>
              </>
            )}
            
          </div>
        </div>
      </div>
      <EmployeesTable
        loading={loading}
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
