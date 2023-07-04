import "../../In-Apps/virtualID.css";
import React, { useState } from "react";
import VirtualID from "../../In-Apps/VirtualID";
import moment from "moment";

import { Link } from "react-router-dom";
import {
  PROFILE,
  officeTypeOptions,
  genderOptions,
  categoryOptions,
  maritalStatusOptions,
  bloodGroupOptions,
  meansOfIdentificationOptions,
} from "../../../components/FormJSON/AddEmployee";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import Select from "react-select";

const AddEmployeesAdmin = () => {
  const { showAlert, selectBranches, selectDesignations, loadingSelect } =
    useAppContext();
  const [step, setStep] = useState(1);
  const [employee, setEmployee] = useState(PROFILE);
  const [loading, setLoading] = useState(false);

  const [officeType, setOfficeType] = useState("");
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [allOffices, setAllOffices] = useState([]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearEvent = () => {
    goToTop();
    setEmployee(PROFILE);
    setOfficeType("");
    setStep(1);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const section = name.split(".")[0];
    const field = name.split(".")[1];

    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [section]: {
        ...prevEmployee[section],
        [field]: value,
      },
    }));
  };

  const handleOfficeTypeChange = (e) => {
    setEmployee({
      ...employee,
      employee_info: {
        ...employee.employee_info,
        operation_office_id: "",
      },
      misc: {
        ...employee.misc,
        officeName: "",
      },
    });
    fetchAllOffices(e?.value);
    setOfficeType(e?.label);
    setIsOfficeSelected(true);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          user_info: employee.user_info,
          employee_info: employee.employee_info,
          personal_details: employee.personal_details,
        },
      });

      console.log("Added Employee:", response);
      showAlert(true, "New Employee added successfully", "alert alert-success");
      clearEvent();
      setLoading(false);
    } catch (error) {
      const errMsg = error?.response?.data?.errors;
      showAlert(true, errMsg, "alert alert-warning");
      setLoading(false);
    }
  };

  const VirtualIDCard = () => {
    return (
      <>
        <VirtualID
          fullName={
            employee.personal_details.first_name +
            " " +
            employee.personal_details.middle_name +
            " " +
            employee.personal_details.last_name
          }
          gender={employee.personal_details.gender}
          designation={employee.misc.designationName}
          ogid={employee.employee_info.ogid}
          edit={false}
        />
      </>
    );
  };

  // All Offices:
  const fetchAllOffices = async (office) => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: office,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const allDepartments = resData.filter(
        (e) => e?.office_type === "department"
      );
      const allCampaigns = resData.filter((e) => e?.office_type === "campaign");

      const formattedDepartments = allDepartments
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      const formattedCampaigns = allCampaigns
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      if (office === "department") setAllOffices(formattedDepartments);
      if (office === "campaign") setAllOffices(formattedCampaigns);
    } catch (error) {
      console.log("Get All Offices error:", error);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
    goToTop();
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    goToTop();
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="col-xl-8 d-flex add-employee-form-container">
              <div className="flex-fill">
                <div className="card-body">
                  <h4>Step 1 - Employee Info</h4>
                  <hr />
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="user_info.email">Email</label>
                          <input
                            className="form-control"
                            name="user_info.email"
                            type="email"
                            value={employee.user_info.email}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>

                      {/* REMOVE THIS! */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="employee_info.ogid">OGID</label>
                          <input
                            className="form-control"
                            name="employee_info.ogid"
                            type="text"
                            value={employee.employee_info.ogid}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="employee_info.date_of_joining">
                            Date of Joining
                          </label>
                          <input
                            className="form-control"
                            name="employee_info.date_of_joining"
                            type="date"
                            value={employee.employee_info.date_of_joining}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Select Branch */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="employee_info.operation_branch_id">
                            Branch
                          </label>
                          <Select
                            name="employee_info.operation_branch_id"
                            options={selectBranches}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              label: employee?.misc?.branchName,
                              value:
                                employee?.employee_info?.operation_branch_id,
                            }}
                            onChange={(e) =>
                              setEmployee({
                                ...employee,
                                employee_info: {
                                  ...employee.employee_info,
                                  operation_branch_id: e?.value,
                                },
                                misc: {
                                  ...employee.misc,
                                  branchName: e?.label,
                                },
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>

                      {/* Select Office Type */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Office Type</label>
                          <Select
                            options={officeTypeOptions}
                            isClearable={true}
                            value={{
                              label: officeType,
                              value: officeType,
                            }}
                            style={{ display: "inline-block" }}
                            onChange={(e) => handleOfficeTypeChange(e)}
                          />
                        </div>
                      </div>

                      {/* Select Office */}
                      {isOfficeSelected && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="employee_info.operation_office_id">
                              Office
                            </label>
                            <Select
                              options={allOffices}
                              isSearchable={true}
                              isClearable={true}
                              value={{
                                label: employee?.misc?.officeName,
                                value:
                                  employee?.employee_info?.operation_office_id,
                              }}
                              onChange={(e) =>
                                setEmployee({
                                  ...employee,
                                  employee_info: {
                                    ...employee.employee_info,
                                    operation_office_id: e?.value,
                                  },
                                  misc: {
                                    ...employee.misc,
                                    officeName: e?.label,
                                  },
                                })
                              }
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Select Designation */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="employee_info.hr_designation_id">
                            Designations
                          </label>
                          <Select
                            options={selectDesignations}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              label: employee?.misc?.designationName,
                              value: employee?.employee_info?.hr_designation_id,
                            }}
                            onChange={(e) =>
                              setEmployee({
                                ...employee,
                                employee_info: {
                                  ...employee.employee_info,
                                  hr_designation_id: e?.value,
                                },
                                misc: {
                                  ...employee.misc,
                                  designationName: e?.label,
                                },
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>

                      {/* Select Remote Category */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="remote">
                            Is this Employee a Remote Staff?
                          </label>
                          <Select
                            options={categoryOptions}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              label: employee?.misc?.remoteCategoryName,
                              value: employee?.employee_info?.remote,
                            }}
                            onChange={(e) =>
                              setEmployee({
                                ...employee,
                                employee_info: {
                                  ...employee.employee_info,
                                  remote: e?.value,
                                },
                                misc: {
                                  ...employee.misc,
                                  remoteCategoryName: e?.label,
                                },
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-dismiss="modal"
                        onClick={clearEvent}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-info"
                        style={{ zIndex: 0 }}
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="col-xl-8 d-flex add-employee-form-container">
              <div className="flex-fill">
                <div className="card-body">
                  <h4>Step 2 - Personal Details</h4>
                  <hr />
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.first_name">
                            First Name
                          </label>
                          <input
                            className="form-control"
                            name="personal_details.first_name"
                            type="text"
                            value={employee.personal_details.first_name}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.middle_name">
                            Middle Name{" "}
                            <span style={{ color: "#999", fontSize: "12px" }}>
                              (optional)
                            </span>
                          </label>
                          <input
                            className="form-control"
                            name="personal_details.middle_name"
                            type="text"
                            value={employee.personal_details.middle_name}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.last_name">
                            Last Name
                          </label>
                          <input
                            className="form-control"
                            name="personal_details.last_name"
                            type="text"
                            value={employee.personal_details.last_name}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>

                      {/* Select Gender */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.gender">
                            Gender
                          </label>
                          <Select
                            name="personal_details.gender"
                            options={genderOptions}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              label: employee?.misc?.staffGender,
                              value: employee?.personal_details?.gender,
                            }}
                            onChange={(e) =>
                              setEmployee({
                                ...employee,
                                personal_details: {
                                  ...employee.personal_details,
                                  gender: e?.value,
                                },
                                misc: {
                                  ...employee.misc,
                                  staffGender: e?.label,
                                },
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.DOB">
                            Date of Birth
                          </label>
                          <input
                            className="form-control"
                            name="personal_details.DOB"
                            type="date"
                            value={employee.personal_details.DOB}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Select Marital Status */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.marital_status">
                            Marital Status{" "}
                            <span style={{ color: "#999", fontSize: "12px" }}>
                              (optional)
                            </span>
                          </label>
                          <Select
                            options={maritalStatusOptions}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              label: employee?.misc?.maritalStatus,
                              value: employee?.personal_details?.marital_status,
                            }}
                            onChange={(e) =>
                              setEmployee({
                                ...employee,
                                personal_details: {
                                  ...employee.personal_details,
                                  marital_status: e?.value,
                                },
                                misc: {
                                  ...employee.misc,
                                  maritalStatus: e?.label,
                                },
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>

                      {/* Select Blood Group */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.blood_group">
                            Blood Group{" "}
                            <span style={{ color: "#999", fontSize: "12px" }}>
                              (optional)
                            </span>
                          </label>
                          <Select
                            options={bloodGroupOptions}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              label: employee?.personal_details?.blood_group,
                              value: employee?.personal_details?.blood_group,
                            }}
                            onChange={(e) =>
                              setEmployee({
                                ...employee,
                                personal_details: {
                                  ...employee.personal_details,
                                  blood_group: e?.value,
                                },
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>

                      {/* Select Means of Identification */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.means_of_identification">
                            Means of Identification{" "}
                            <span style={{ color: "#999", fontSize: "12px" }}>
                              (optional)
                            </span>
                          </label>
                          <Select
                            options={meansOfIdentificationOptions}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              label:
                                employee?.personal_details
                                  ?.means_of_identification,
                              value:
                                employee?.personal_details
                                  ?.means_of_identification,
                            }}
                            onChange={(e) =>
                              setEmployee({
                                ...employee,
                                personal_details: {
                                  ...employee.personal_details,
                                  means_of_identification: e?.value,
                                },
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.id_number">
                            ID Number{" "}
                            <span style={{ color: "#999", fontSize: "12px" }}>
                              (optional)
                            </span>
                          </label>
                          <input
                            className="form-control"
                            name="personal_details.id_number"
                            type="text"
                            value={employee.personal_details.id_number}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="personal_details.id_issue_date">
                            ID Issue Date{" "}
                            <span style={{ color: "#999", fontSize: "12px" }}>
                              (optional)
                            </span>
                          </label>
                          <input
                            className="form-control"
                            name="personal_details.id_issue_date"
                            type="date"
                            value={employee.personal_details.id_issue_date}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-dismiss="modal"
                        onClick={clearEvent}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-dark"
                        style={{ zIndex: 0 }}
                        onClick={prevStep}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-info"
                        style={{ zIndex: 0 }}
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="col-xl-8 d-flex add-employee-form-container">
              <div className="flex-fill">
                <div className="card-body">
                  <h4>Review your information</h4>
                  <hr />
                  <form onSubmit={handleAddEmployee}>
                    <div className="row">
                      <div className="col-md-12">
                        <ul className="personal-info">
                          <li>
                            <div className="title">Email:</div>
                            <div className="text">
                              {employee.user_info.email || "-"}
                            </div>
                          </li>

                          {/* REMOVE THIS! */}
                          <li>
                            <div className="title">OGID:</div>
                            <div className="text">
                              {employee.employee_info.ogid || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Date of Joining:</div>
                            <div className="text">
                              {employee.employee_info.date_of_joining
                                ? moment(
                                    employee.employee_info.date_of_joining
                                  ).format(" Do MMMM, YYYY")
                                : "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Branch:</div>
                            <div className="text">
                              {employee.misc.branchName || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Office Type:</div>
                            <div className="text">{officeType || "-"}</div>
                          </li>

                          <li>
                            <div className="title">Office:</div>
                            <div className="text">
                              {employee.misc.officeName || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Designation:</div>
                            <div className="text">
                              {employee.misc.designationName || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Remote Staff:</div>
                            <div className="text">
                              {employee.employee_info.remote
                                ? "Yes"
                                : "No" || "-"}
                            </div>
                          </li>

                          <hr />

                          <li>
                            <div className="title">First Name:</div>
                            <div className="text">
                              {employee.personal_details.first_name || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Middle Name:</div>
                            <div className="text">
                              {employee.personal_details.middle_name || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Last Name:</div>
                            <div className="text">
                              {employee.personal_details.last_name || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Gender:</div>
                            <div className="text">
                              {employee.personal_details.gender
                                ? employee.personal_details.gender
                                    .charAt(0)
                                    .toUpperCase() +
                                  employee?.personal_details?.gender.slice(1)
                                : "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Date of Birth:</div>
                            <div className="text">
                              {employee.personal_details.DOB
                                ? moment(employee.personal_details.DOB).format(
                                    " Do MMMM, YYYY"
                                  )
                                : "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Marital Status:</div>
                            <div className="text">
                              {employee.personal_details.marital_status
                                ? employee.personal_details.marital_status
                                    .charAt(0)
                                    .toUpperCase() +
                                  employee?.personal_details?.marital_status.slice(
                                    1
                                  )
                                : "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Blood Group:</div>
                            <div className="text">
                              {employee.personal_details.blood_group || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">
                              Means of Identification:
                            </div>
                            <div className="text">
                              {employee.personal_details
                                .means_of_identification || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">ID Number:</div>
                            <div className="text">
                              {employee.personal_details.id_number || "-"}
                            </div>
                          </li>

                          <li>
                            <div className="title">ID Issue Date:</div>
                            <div className="text">
                              {employee.personal_details.id_issue_date
                                ? moment(
                                    employee.personal_details.id_issue_date
                                  ).format(" Do MMMM, YYYY")
                                : "-"}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-dismiss="modal"
                        onClick={clearEvent}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-dark"
                        style={{ zIndex: 0 }}
                        onClick={prevStep}
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ zIndex: 0 }}
                        onClick={() => goToTop()}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Add Employee</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr/all-employees">All Employees</Link>
              </li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row add-employee-form">
        {!loadingSelect ? (
          renderForm()
        ) : (
          <div className="add-employee-form-loader-div">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p>Loading form...</p>
          </div>
        )}

        <div className="col-xl-4 d-flex" style={{ padding: "40px 0" }}>
          <div className="gfuSqG flex-fill add-employee-container-card">
            {<div className="add-employee-card">{VirtualIDCard()}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployeesAdmin;
