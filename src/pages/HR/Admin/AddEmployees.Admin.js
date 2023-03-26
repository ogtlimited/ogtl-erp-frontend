
import React, { useState, useEffect, useCallback, useRef } from "react";
import "../../In-Apps/virtualID.css";
import VirtualID from "../../In-Apps/VirtualID";
import moment from "moment";

import { Link, } from 'react-router-dom';
import { 
  CREATE_PROFILE, 
  genderOptions, 
  employmentTypesOptions, 
  categoryOptions 
} from "../../../components/FormJSON/AddEmployee";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import Select from "react-select";
import EmployeeHelperService from "./employee.helper";

const AddEmployeesAdmin = () => { 
  const selectGenderRef = useRef();
  const selectReportToRef = useRef();
  const selectDesignationRef = useRef();
  const selectShiftRef = useRef();
  const selectEmploymentTypeRef = useRef();
  const selectBranchRef = useRef();
  const selectStatusRef = useRef();
  const selectAdminRef = useRef();
  const selectExpatriateRef = useRef();
  
  const { fetchEmployee, createEmployee, showAlert, status } = useAppContext();
  const [employee, setEmployee] = useState(CREATE_PROFILE);
  const [loading, setLoading] = useState(false);

  const [isAllValid, setIsAllValid] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isReportToValid, setIsReportToValid] = useState(false);
  const [isAdminValid, setIsAdminValid] = useState(null);
  const [isDesignationValid, setIsDesignationValid] = useState(false);
  const [isShiftValid, setIsShiftValid] = useState(false);
  const [isEmploymentTypeValid, setIsEmploymentTypeValid] = useState(false);

  const [services, setServices] = useState([]);
  // const [DesignationServices, setDesignationServices] = useState([]);
  const [reportsTo, setReportsTo] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [projectId, setProjectId] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [validShift, setValidShift] = useState("");
  const [validDesignation, setValidDesignation] = useState("");
  const [officeType, setOfficeType] = useState("");
  const [officeId, setOfficeId] = useState("");
  const [deptError, setDeptError] = useState("");
  const [desError, setDesError] = useState("");

  useEffect(() => {
    setIsGenderValid(employee.gender ? true : false);
    setIsReportToValid(employee.reports_to ? true : false);
    setIsAdminValid(employee.isAdmin ? true : false);
    setIsDesignationValid(employee.designation ? true : false);
    setIsShiftValid(employee.default_shift ? true : false);
    setIsEmploymentTypeValid(employee.employeeType ? true : false);
    setIsAllValid(
        employee.gender &&
        employee.reports_to &&
        employee.isAdmin &&
        employee.designation &&
        employee.default_shift &&
        employee.employeeType
        ? true
        : false
    );
  }, [employee]);

  const handleDepartmentClick = (e) => {
    setEmployee({ ...employee, department: e?.value });
    setOfficeType("Department ");
    setOfficeId(e.value);

    selectDesignationRef.current.select.clearValue();
    selectShiftRef.current.select.clearValue();
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

    axiosInstance.get(`/api/shiftType/office?departmentId=${e.value}`).then((e) => {
      const response = e?.data?.shiftData;
      const shiftOpts = response?.map((e) => {
        return {
          label: e.shift_name,
          value: e._id,
        };
      });
      setValidShift(shiftOpts);
    }).catch((e) => {
      setValidShift([]);
      console.log("shift error:", e);
    });
  };

  const handleCampaignClick = (e) => {
    setEmployee({ ...employee, projectId: e?.value });
    setOfficeType("Campaign ");
    setOfficeId(e.value);

    selectDesignationRef.current.select.clearValue();
    selectShiftRef.current.select.clearValue();
    axiosInstance.get(`/designation/office?campaign_id=${e.value}`).then((e) => {
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

    axiosInstance.get(`/api/shiftType/office?campaignId=${e.value}`).then((e) => {
      const response = e?.data?.shiftData;
      const shiftOpts = response?.map((e) => {
        return {
          label: e.shift_name,
          value: e._id,
        };
      });
      setValidShift(shiftOpts);
    }).catch((e) => {
      setValidShift([]);
      console.log("shift error:", e);
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
    });
  }, [createEmployee, officeId, status]);

const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

  const clearEvent = () => {
    goToTop();
    selectGenderRef.current.select.clearValue();
    selectReportToRef.current.select.clearValue();
    selectDesignationRef.current.select.clearValue();
    selectShiftRef.current.select.clearValue();
    selectEmploymentTypeRef.current.select.clearValue();
    selectBranchRef.current.select.clearValue();
    selectStatusRef.current.select.clearValue();
    selectAdminRef.current.select.clearValue();
    selectExpatriateRef.current.select.clearValue();
    setEmployee(CREATE_PROFILE);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const employeeForm = employee;
    delete employeeForm.designationName;
    delete employeeForm.signature;

    setLoading(true);
    try {
      const res = await axiosInstance.post("/employees", {
        ...employeeForm,
        isAdmin: employee.isAdmin === 'yes' ? true : false,
        isExpatriate: employee.isExpatriate === 'yes' ? true : false,
        department: officeType === "Department " ? officeId : '',
        projectId: officeType === "Campaign " ? officeId : '',
        leaveCount: +employeeForm.leaveCount,
      });
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;
      goToTop();

      showAlert(
        true,
        "New Employee added successfully",
        "alert alert-success"
      );

      clearEvent();
      fetchEmployee();
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      clearEvent();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
      AddEmployeesAdmin();
    }
  };

  const VirtualIDCard = () => {
    return (
      <>
        <VirtualID
          image={employee.image}
          fullName={employee.first_name + " " + employee.middle_name + " " + employee.last_name}
          gender={employee.gender}
          designation={employee.designationName}
          signature={employee.signature}
          ogid={employee.date_of_joining}
        />
        
        {employee.date_of_joining && 
          <span className="virtual-id-note">
            Note: OG{moment(employee.date_of_joining).format("YYMMDD")} is just a sample. 
            After adding the employee, the OGID will be generated automatically.
          </span>
        }
      </>
    );
  };
  
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
        <div className="col-xl-8 d-flex add-employee-form-container">
          <div className="flex-fill">
            <div className="card-body">
              {!services.length ? (
                <div className="add-employee-form-loader-div">
                  <p style={{ textAlign: "left" }}>Loading form, please wait...</p>
                  <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                </div>
              ) : (
                <form onSubmit={handleAddEmployee}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        className="form-control"
                        name="first_name"
                        type="text"
                        value={employee.first_name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="middle_name">Middle Name{' '} 
                        <span style={{ color: '#999', fontSize: '12px' }}>(optional)</span>
                      </label>
                      <input
                        className="form-control"
                        name="middle_name"
                        type="text"
                        value={employee.middle_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        className="form-control"
                        name="last_name"
                        type="text"
                        value={employee.last_name}
                        onChange={handleFormChange}
                        required
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
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="gender">
                        Gender {!isGenderValid && <span>*</span>}
                      </label>
                      <Select
                        options={genderOptions}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectGenderRef}
                        onChange={(e) =>
                          setEmployee({ ...employee, gender: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="isAdmin">Is this Employee an Admin? {!isAdminValid && <span>*</span>}</label>
                      <Select
                        options={categoryOptions}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectAdminRef}
                        onChange={(e) =>
                          setEmployee({ ...employee, isAdmin: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="isExpatriate">Is this Employee an Expatriate?{' '}
                        <span style={{ color: '#999', fontSize: '12px' }}>(optional)</span>
                      </label>
                      <Select
                        options={categoryOptions}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectExpatriateRef}
                        onChange={(e) =>
                          setEmployee({ ...employee, isExpatriate: e?.value })
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
                        value={employee.date_of_joining}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="reports_to">
                        Reports To {!isReportToValid && <span>*</span>}
                      </label>
                      <Select
                        options={reportsTo}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectReportToRef}
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
                          onChange={(e) => handleCampaignClick(e)}
                          style={{ display: "inline-block" }}
                        />
                      )}
                      <span style={{color: "red"}}>{desError}</span>
                    </div>
                  </div>

                  {/* <div className="col-md-6">
                    <div className="checkbox-group">
                      <label htmlFor="isAdmin">Admin</label>
                      <input
                        className="checkbox-control"
                        name="isAdmin"
                        type="checkbox"
                        value={employee.isAdmin}
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            isAdmin: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkbox-group">
                      <label htmlFor="isExpatriate">Expatriate</label>
                      <input
                        className="checkbox-control"
                        name="isExpatriate"
                        type="checkbox"
                        value={employee.isExpatriate}
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            isExpatriate: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </div> */}

                  <div className="col-md-6">
                    <div className="form-group">
                      {!validDesignation.length ? (
                        <label htmlFor="designation">Designation {!isDesignationValid && <span>*</span>}</label>
                      ) : (
                        <label htmlFor="designation">
                          {officeType} Designation {!isDesignationValid && <span>*</span>}
                        </label>
                      )}
                      <Select
                        options={!validDesignation.length ? validDesignation : validDesignation}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectDesignationRef}
                        onChange={(e) =>
                          setEmployee({ ...employee, designation: e?.value, designationName: e?.label })
                        }
                        style={{ display: 'inline-block' }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      {!validShift.length ? (
                        <label htmlFor="default_shift">Shift {!isShiftValid && <span>*</span>}</label>
                      ) : (
                        <label htmlFor="default_shift">
                          {officeType} Shift {!isShiftValid && <span>*</span>}
                        </label>
                      )}
                      <Select
                        options={!validShift.length ? validShift : validShift}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectShiftRef}
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            default_shift: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="employeeType">
                        Employment Type{" "}
                        {!isEmploymentTypeValid && <span>*</span>}
                      </label>
                      <Select
                        options={employmentTypesOptions}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectEmploymentTypeRef}
                        onChange={(e) =>
                          setEmployee({ ...employee, employeeType: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="branch">Branch{' '}
                        <span style={{ color: '#999', fontSize: '12px' }}>(optional)</span>
                      </label>
                      <Select
                        options={branch}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectBranchRef}
                        onChange={(e) =>
                          setEmployee({ ...employee, branch: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="status">Status{' '}
                        <span style={{ color: '#999', fontSize: '12px' }}>(optional)</span>
                      </label>
                      <Select
                        options={employeeStatus}
                        isSearchable={true}
                        isClearable={true}
                        ref={selectStatusRef}
                        onChange={(e) =>
                          setEmployee({ ...employee, status: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leaveCount">Leave Count{' '}
                        <span style={{ color: '#999', fontSize: '12px' }}>(optional)</span>
                      </label>
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
                    onClick={clearEvent}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ zIndex: 0 }}
                    disabled={!isAllValid}
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

export default AddEmployeesAdmin;
