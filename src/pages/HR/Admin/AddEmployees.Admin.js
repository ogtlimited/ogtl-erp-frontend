import "../../In-Apps/virtualID.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import VirtualID from "../../In-Apps/VirtualID";
import moment from "moment";

import { Link, } from 'react-router-dom';
import { 
  PROFILE, 
  officeOptions, 
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
  const selectBranchRef = useRef();
  const selectOfficeRef = useRef();
  const selectDesignationRef = useRef();
  const selectGenderRef = useRef();
  const selectMaritalStatusRef = useRef();
  const selectBloodGroupRef = useRef();
  const selectMeansOfIdentificationRef = useRef();
  
  const { showAlert } = useAppContext();
  const [step, setStep] = useState(1);
  const [loadedSelect, setLoadedSelect] = useState(0);
  const [employee, setEmployee] = useState(PROFILE);
  const [loading, setLoading] = useState(false);

  const [allBranches, setAllBranches] = useState([]);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [allOffices, setAllOffices] = useState([]);
  const [allDesignations, setAllDesignations] = useState([]);

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  };

  const clearEvent = () => {
    goToTop();
    // selectBranchRef.current.select.clearValue();
    // selectOfficeRef.current.select.clearValue();
    // selectDesignationRef.current.select.clearValue();
    selectGenderRef.current.select.clearValue();
    selectMaritalStatusRef.current.select.clearValue();
    selectBloodGroupRef.current.select.clearValue();
    selectMeansOfIdentificationRef.current.select.clearValue();
    setEmployee(PROFILE);
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

  const handleOfficeChange = (e) => {
    fetchAllOffices(e?.value)
    setIsOfficeSelected(true);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Added Employee:", employee);  
    showAlert(
      true,
      "New Employee added successfully",
      "alert alert-success"
    );
    clearEvent();
    setLoading(false);
  };

  const VirtualIDCard = () => {
    return (
      <>
        <VirtualID
          fullName={employee.personal_details.first_name + " " + employee.personal_details.middle_name + " " + employee.personal_details.last_name}
          gender={employee.personal_details.gender}
          // designation={employee.designationName}
          ogid={employee.Employee_info.ogid}
          edit={false}
        />
      </>
    );
  };
  
  // All Branches:
  const fetchAllBranches = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/v1/branches.json', {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.branches;

      const formatted = resData.map((branch) => ({
        label: branch.title,
        value: branch.id,
      }));

      setAllBranches(formatted);
      setLoadedSelect(loadedSelect + 1);
    } catch (error) {
      console.log("All Branches error:", error);
    }
  }, [loadedSelect]);

  // All Offices:
  const fetchAllOffices = async (office) => {
    try {
      const response = await axiosInstance.get('/api/v1/offices.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.offices;

      const allDepartments = resData.filter((e) => e?.office_type === "department");
      const allCampaigns = resData.filter((e) => e?.office_type === "campaign");

      const formattedDepartments = allDepartments.map((e) => ({
        label: e?.title.toUpperCase(),
        value: e.id,
      })).sort((a, b) => a.label.localeCompare(b.label));

      const formattedCampaigns = allCampaigns.map((e) => ({
        label: e?.title.toUpperCase(),
        value: e.id,
      })).sort((a, b) => a.label.localeCompare(b.label));

      if(office === "department") setAllOffices(formattedDepartments);
      if(office === "campaign") setAllOffices(formattedCampaigns);

    } catch (error) {
      console.log("Get All Offices error:", error);
    }
  };
  
  // All Designations:
  const fetchDesignation = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/v1/designations.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.designations;

      const formattedDesignation = resData.map((e) => ({
        label: e?.title.toUpperCase(),
        value: e.id,
      })).sort((a, b) => a.label.localeCompare(b.label));

      setAllDesignations(formattedDesignation);
      setLoadedSelect(loadedSelect + 1);
    } catch (error) {
      console.log("Get All Designations error:", error);
    }
  }, [loadedSelect]);

  useEffect(() => {
    fetchAllBranches();
    fetchDesignation();
  }, [fetchAllBranches, fetchDesignation]);
  
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
    console.log("Next Step:", employee);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    console.log("Prev Step:", employee);
  };

  const renderForm = () => {
    switch (step) {
      case 1: 
      return(
        <>
          <div className="col-xl-8 d-flex add-employee-form-container">
              <div className="flex-fill">
                <div className="card-body">
                  <h4>Step 1 - Employee Info</h4>
                  <hr />
                    <form>
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
    
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Employee_info.ogid">OGID</label>
                            <input
                              className="form-control"
                              name="Employee_info.ogid"
                              type="text"
                              value={employee.Employee_info.ogid}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>
    
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Employee_info.date_of_joining">Date of Joining</label>
                            <input
                              className="form-control"
                              name="Employee_info.date_of_joining"
                              type="date"
                              value={employee.Employee_info.date_of_joining}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>
    
                        {/* Select Branch */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Employee_info.operation_branch_id">Branch{' '}
                              <span style={{ color: '#999', fontSize: '12px' }}>(optional)</span>
                            </label>
                            <Select
                              options={allBranches}
                              isSearchable={true}
                              isClearable={true}
                              ref={selectBranchRef}
                              defaultValue={{ label: employee?.Employee_info?.operation_branch_id ? employee?.Employee_info?.operation_branch_id : "" }}
                              onChange={(e) =>
                                setEmployee({ ...employee, Employee_info: { ...employee.Employee_info, operation_branch_id: e?.value } })
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
                              options={officeOptions}
                              isClearable={true}
                              style={{ display: "inline-block" }}
                              onChange={(e) => handleOfficeChange(e)}
                            />
                          </div>
                        </div>
    
                        {/* Select Office */}
                        {isOfficeSelected && <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Employee_info.operation_office_id">Office</label>
                            <Select
                              options={allOffices}
                              isSearchable={true}
                              isClearable={true}
                              ref={selectOfficeRef}
                              defaultValue={{ label: employee?.Employee_info?.operation_office_id ? employee?.Employee_info?.operation_office_id : "" }}
                              onChange={(e) =>
                                setEmployee({ ...employee, Employee_info: { ...employee.Employee_info, operation_office_id: e?.value } })
                              }
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </div>}
    
                        {/* Select Designation */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Employee_info.hr_designation_id">Designations</label>
                            <Select
                              options={allDesignations}
                              isSearchable={true}
                              isClearable={true}
                              ref={selectDesignationRef}
                              defaultValue={employee.Employee_info.hr_designation_id}
                              onChange={(e) =>
                                setEmployee({ ...employee, Employee_info: { ...employee.Employee_info, hr_designation_id: e?.value } })
                              }
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </div>
    
                        {/* Select Remote Category */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="remote">Is this Employee a Remote Staff?</label>
                            <Select
                              options={categoryOptions}
                              isSearchable={true}
                              isClearable={true}
                              defaultValue={employee.Employee_info.remote}
                              onChange={(e) =>
                                setEmployee({ ...employee, Employee_info: { ...employee.Employee_info, remote: e?.value } })
                              }
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </div>
    
                      </div>
                      
    
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={clearEvent}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-dark"
                          style={{ zIndex: 0 }}
                          onClick={nextStep}
                        > 
                          Next
                        </button>
                      </div>
                    </form>
                </div>
              </div>
          </div>
        </>
      )
      case 2:
        return(
          <>
            <div className="col-xl-8 d-flex add-employee-form-container">
                <div className="flex-fill">
                  <div className="card-body">
                    <h4>Step 2 - Personal Details</h4>
                    <hr />
                      <form onSubmit={handleAddEmployee}>
                        <div className="row">
      
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="personal_details.first_name">First Name</label>
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
                              <label htmlFor="personal_details.middle_name">Middle Name</label>
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
                              <label htmlFor="personal_details.last_name">Last Name</label>
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
                              <label htmlFor="personal_details.gender">Gender</label>
                              <Select
                                options={genderOptions}
                                isSearchable={true}
                                isClearable={true}
                                ref={selectGenderRef}
                                defaultValue={{ label: employee.personal_details.gender.length ? employee.personal_details.gender : ""}}
                                onChange={(e) =>
                                  setEmployee({ ...employee, personal_details: { ...employee.personal_details, gender: e?.value } })
                                }
                                style={{ display: "inline-block" }}
                              />
                            </div>
                          </div>
                          
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="personal_details.DOB">Date of Birth</label>
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
                              <label htmlFor="personal_details.marital_status">Marital Status</label>
                              <Select
                                options={maritalStatusOptions}
                                isSearchable={true}
                                isClearable={true}
                                ref={selectMaritalStatusRef}
                                defaultValue={employee.personal_details.marital_status}
                                onChange={(e) =>
                                  setEmployee({ ...employee, personal_details: { ...employee.personal_details, marital_status: e?.value } })
                                }
                                style={{ display: "inline-block" }}
                              />
                            </div>
                          </div>

                          {/* Select Blood Group */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="personal_details.blood_group">Blood Group</label>
                              <Select
                                options={bloodGroupOptions}
                                isSearchable={true}
                                isClearable={true}
                                ref={selectBloodGroupRef}
                                defaultValue={employee.personal_details.blood_group}
                                onChange={(e) =>
                                  setEmployee({ ...employee, personal_details: { ...employee.personal_details, blood_group: e?.value } })
                                }
                                style={{ display: "inline-block" }}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="personal_details.id_issue_date">ID Issue Date</label>
                              <input
                                className="form-control"
                                name="personal_details.id_issue_date"
                                type="date"
                                value={employee.personal_details.id_issue_date}
                                onChange={handleFormChange}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="personal_details.id_number">ID Number</label>
                              <input
                                className="form-control"
                                name="personal_details.id_number"
                                type="text"
                                value={employee.personal_details.id_number}
                                onChange={handleFormChange}
                              />
                            </div>
                          </div>

                          {/* Select Means of Identification */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="personal_details.means_of_identification">Means of Identification</label>
                              <Select
                                options={meansOfIdentificationOptions}
                                isSearchable={true}
                                isClearable={true}
                                ref={selectMeansOfIdentificationRef}
                                defaultValue={employee.personal_details.means_of_identification}
                                onChange={(e) =>
                                  setEmployee({ ...employee, personal_details: { ...employee.personal_details, means_of_identification: e?.value } })
                                }
                                style={{ display: "inline-block" }}
                              />
                            </div>
                          </div>
      
                        </div>
                        
      
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
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
                            onClick={() =>  goToTop()}
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
        )
      default: 
            return null;
    }
  }
  
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Add Employee</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Employees</li>
            </ul>
          </div>
        </div>
      </div>
            
      <div className="row add-employee-form">
        {loadedSelect >= 0 ? renderForm() : 
          <div className="add-employee-form-loader-div">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p>Loading form...</p>
          </div>
        }

        <div className="col-xl-4 d-flex" style={{padding: "40px 0"}}>
          <div className="gfuSqG flex-fill add-employee-container-card">
          {<div className="add-employee-card">{VirtualIDCard()}</div>}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default AddEmployeesAdmin;
