
import React, { useState, useEffect, useRef } from "react";
import "../../In-Apps/virtualID.css";
import VirtualID from "../../In-Apps/VirtualID";

import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  PROFILE, 
  genderOptions, 
  employmentTypesOptions, 
  categoryOptions 
} from "../../../components/FormJSON/AddEmployee";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import Select from "react-select";
import EmployeeHelperService from "./employee.helper";

const EditEmployeesAdmin = () => { 
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { fetchEmployee, createEmployee, showAlert, status } = useAppContext();
  const [employee, setEmployee] = useState(PROFILE);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const selectDesignationRef = useRef();

  const [services, setServices] = useState([]);
  const [reportsTo, setReportsTo] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [projectId, setProjectId] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [validDesignation, setValidDesignation] = useState("");
  const [officeType, setOfficeType] = useState("");
  const [officeId, setOfficeId] = useState("");
  const [deptError, setDeptError] = useState("");
  const [desError, setDesError] = useState("");

  const fetchUserInfo = async () => {
    try {
      const user = await axiosInstance.get(`/profile-dashboard/${id}`)
      const employee = user.data.getEmployeeFullData.employee;
      setEmployeeDetails(employee);
      setEmployee({
          first_name: employee?.first_name,
          middle_name: employee?.middle_name,
          last_name: employee?.last_name,
          ogid: employee?.ogid,
          company_email: employee?.company_email,
          gender: employee?.gender,
          date_of_joining: employee?.date_of_joining,
          reports_to: employee?.reports_to?._id,
          designation: employee?.designation?._id,
          branch: employee?.branch?.id,
          employeeType: employee?.employeeType,
          status: employee?.status,
          isAdmin: employee?.isAdmin,
          isExpatriate: employee?.isExpatriate,
          department: employee?.department?._id,
          projectId: employee?.projectId?._id,
          leaveCount: employee?.leaveCount,
      });
      console.log("employees record:", employee)
    } catch (error) {
        console.log(error);
    }
  };

  
  useEffect(() => {
    fetchUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDepartmentClick = (e) => {
    setEmployee({ ...employee, department: e?.value });
    setOfficeType("Department");
    setOfficeId(e.value);
    
    selectDesignationRef.current.select.clearValue();

    axiosInstance.get(`/designation/office?department_id=${e.value}`).then((e) => {
      const response = e?.data?.data;
      const designationOpts = response?.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      setValidDesignation(designationOpts);
    }).catch((e) => {
      setValidDesignation([]);
      setDeptError(e?.response?.data?.message);
      setDesError("");
    });
  };

  const handleCampaignClick = (e) => {
    setEmployee({ ...employee, projectId: e?.value });
    setOfficeType("Campaign");
    setOfficeId(e.value);
    
    selectDesignationRef.current.select.clearValue();

    // axiosInstance.get(`/designation/office?campaign_id=${e.value}`).then((e) => {
    axiosInstance.get('/designation').then((e) => {
      const response = e?.data?.data;
      const designationOpts = response?.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      setValidDesignation(designationOpts);
    }).catch((e) => {
      setValidDesignation([]);
      setDesError(e?.response?.data?.message);
      setDeptError("");
    });
  };

  useEffect(() => {
    createEmployee().then((res) => {
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
      setServices([service]);

      const reports_to = service.reportstoOpts;
      setReportsTo(reports_to);

      const department = service.deptopts;
      setDepartment(department);

      const projectId = service.campaingOpts;
      setProjectId(projectId);

      const branch = service.branchOpts;
      setBranch(branch);

      const emp_status = service.employeestatusOpts;
      setEmployeeStatus(emp_status);

      const designation = service.designationOpts;
      setValidDesignation(designation);
    });
  }, [createEmployee, officeId, status]);

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleEditEmployee = async (e) => {
    e.preventDefault();
    
    const employeeForm = employee;
    delete employeeForm.designationName;
    delete employeeForm.signature;

    setLoading(true);
    try {
      const res = await axiosInstance.put(`/employees/${id}`, {
      ...employeeForm,
      department: officeType === "Department" ? officeId : employeeForm.department,
      projectId: officeType === "Campaign" ? officeId : employeeForm.projectId,
      leaveCount: +employeeForm?.leaveCount,
    });
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;
      goToTop();

      showAlert(
        true,
        "Employee details updated successfully",
        "alert alert-success"
      );

      fetchEmployee();
      fetchUserInfo();
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  const VirtualIDCard = () => {
    return (
      <>
        <VirtualID
          image={employee.image}
          fullName={employee.first_name + " " + employee.middle_name + " " + employee.last_name}
          admin={employee.isAdmin}
          gender={employee.gender}
          designation={employee?.designationName ? employee?.designationName : employee?.designation?.designation}
          signature={employee.signature}
          ogid={employee.ogid}
          edit={true}
        />
      </>
    );
  };
  
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Edit Employee Details</h3>
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
        <div className="col-xl-8 d-flex add-employee-form-container">
          <div className="flex-fill">
            <div className="card-body">
              {!services.length ? (
                <div className="add-employee-form-loader-div">
                  <p style={{ textAlign: "left" }}>Loading details, please wait...</p>
                  <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                </div>
              ) : (
                <form onSubmit={handleEditEmployee}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        className="form-control"
                        name="first_name"
                        type="text"
                        value={employee.first_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="middle_name">Middle Name</label>
                      <input
                        className="form-control"
                        name="middle_name"
                        type="text"
                        value={employee.middle_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        className="form-control"
                        name="last_name"
                        type="text"
                        value={employee.last_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ogid">OGID</label>
                        <input
                          className="form-control"
                          name="ogid"
                          type="text"
                          value={employee.ogid}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="company_email">Email</label>
                      <input
                        className="form-control"
                        name="company_email"
                        type="email"
                        value={employee.company_email}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="gender"> Gender</label>
                      <Select
                        options={genderOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={{label: employee?.gender ? employee?.gender : ''}}
                        onChange={(e) =>
                          setEmployee({ ...employee, gender: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="isAdmin">Is this Employee an Admin?</label>
                      <Select
                        options={categoryOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={{label: employee?.isAdmin ? 'Yes' : 'No'}}
                        onChange={(e) =>
                          setEmployee({ ...employee, isAdmin: e?.value === 'yes' ? true : false })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="isExpatriate">Is this Employee an Expatriate?</label>
                      <Select
                        options={categoryOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={{label: employee?.isExpatriate ? 'Yes' : 'No'}}
                        onChange={(e) =>
                          setEmployee({ ...employee, isExpatriate: e?.value === 'yes' ? true : false })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="date_of_joining">Date of Joining</label>
                      <input
                        className="form-control"
                        name="date_of_joining"
                        type="date"
                        value={employee.date_of_joining.split("T")[0]}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="reports_to">Reports To</label>
                      <Select
                        options={reportsTo}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={{label: employeeDetails?.reports_to ? employeeDetails?.reports_to?.first_name + " " + employeeDetails?.reports_to?.middle_name + " " + employeeDetails?.reports_to?.last_name : ''}}
                        onChange={(e) =>
                          setEmployee({ ...employee, reports_to: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      {officeType === "Campaign " ? (
                        <Select
                          options={department}
                          isSearchable={true}
                          value={employee.department === null}
                          onChange={(e) => handleDepartmentClick(e)}
                          style={{ display: "inline-block" }}
                        />
                      ) : (
                        <Select
                          options={department}
                          isSearchable={true}
                          defaultValue={{label: employeeDetails?.department ? employeeDetails?.department?.department : ''}}
                          onChange={(e) => handleDepartmentClick(e)}
                          style={{ display: "inline-block" }}
                        />
                      )}
                      <span style={{color: "red"}}>{deptError}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="projectId">Campaign</label>
                      {officeType === "Department " ? (
                        <Select
                          options={projectId}
                          isSearchable={true}
                          value={employee.projectId === null}
                          onChange={(e) => handleCampaignClick(e)}
                          style={{ display: "inline-block" }}
                        />
                      ) : (
                        <Select
                          options={projectId}
                          isSearchable={true}
                          defaultValue={{label: employeeDetails?.projectId ? employeeDetails?.projectId?.project_name : ''}}
                          onChange={(e) => handleCampaignClick(e)}
                          style={{ display: "inline-block" }}
                        />
                      )}
                      <span style={{color: "red"}}>{desError}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      {!validDesignation.length ? (
                        <label htmlFor="designation">Designation</label>
                      ) : (
                        <label htmlFor="designation">
                          {officeType} Designation 
                        </label>
                      )}
                      <Select
                        options={!validDesignation.length ? validDesignation : validDesignation}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectDesignationRef}
                        defaultValue={{label: employeeDetails?.designation ? employeeDetails?.designation?.designation : ''}}
                        onChange={(e) =>
                          setEmployee({ ...employee, designation: e?.value, designationName: e?.label })
                        }
                        style={{ display: 'inline-block' }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="employeeType">Employment Type</label>
                      <Select
                        options={employmentTypesOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={{label: employee?.employeeType ? employee?.employeeType : ''}}
                        onChange={(e) =>
                          setEmployee({ ...employee, employeeType: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="branch">Branch</label>
                      <Select
                        options={branch}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={{label: employeeDetails?.branch ? employeeDetails?.branch?.branch : ''}}
                        onChange={(e) =>
                          setEmployee({ ...employee, branch: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <Select
                        options={employeeStatus}
                        isSearchable={true}
                        isClearable={true} defaultValue={{label: employee?.status ? employee?.status : '', value: employee?.status ? employee?.status : ''}}
                        onChange={(e) =>
                          setEmployee({ ...employee, status: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leaveCount">Leave Count</label>
                      <input
                        className="form-control"
                        name="leaveCount"
                        type="number"
                        value={employee.leaveCount}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => navigate('/dashboard/hr/all-employees')}
                  >
                    Cancel
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
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-4 d-flex">
          <div className="gfuSqG flex-fill add-employee-container-card">
          {!services.length ? null : <div className="add-employee-card">{VirtualIDCard()}</div>}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default EditEmployeesAdmin;
