/** @format */

import React, { useState, useEffect, useRef } from "react";
import { 
  PROFILE, 
  genderOptions, 
  employmentTypesOptions, 
  categoryOptions 
} from "../FormJSON/AddEmployee";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import EmployeeHelperService from "../../pages/HR/Admin/employee.helper";
import { EditEmployeeShiftModal } from "./EditEmployeeShiftModal";
import moment from "moment";

export const EditEmployeeModal = ({editData, fetchAllEmployee}) => {
  const selectDesignationRef = useRef();

  const { createEmployee, showAlert, status } = useAppContext();
  const [employee, setEmployee] = useState(PROFILE);
  const [loading, setLoading] = useState(false);

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
    setEmployee(editData);
    console.log('Edit this data:', editData)
  }, [editData])

  const handleDepartmentClick = (e) => {
    setEmployee({ ...employee, department: e?.value });
    setOfficeType("Department ");
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
    setOfficeType("Campaign ");
    setOfficeId(e.value);

    selectDesignationRef.current.select.clearValue();

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
    });
  }, [createEmployee, status]);
  
  // const goToTop = () => {
  //   window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //   });
  // };

  const goBack = () => {
    $("#EditEmployeeFormModal").modal("toggle");
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };


  // useEffect(() => {
  //   if (employee.reports_to) {
  //     const selectedReportTo = reportsTo.filter((report) => report.value === editData.reports_to);
  //     console.log("selectedReportTo", selectedReportTo[0]);
  //   }
   
  // }, [editData.reports_to, employee.reports_to, reportsTo]);

  const handleEditEmployee = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("edited employee record:", employee);
    
    // let id = employee._id;
    // try {
    //   const res = await axiosInstance.put(`/employees/${id}`, {
    //     first_name: employee.first_name,
    //     middle_name: employee.middle_name,
    //     last_name: employee.last_name,
    //     company_email: employee.company_email,
    //     gender: employee.gender,
    //     date_of_joining: employee.date_of_joining,
    //     reports_to: employee.reports_to,
    //     designation: employee.designation,
    //     default_shift: employee.default_shift,
    //     branch: employee.branch,
    //     employeeType: employee.employeeType,
    //     status: employee.status,
    //     isAdmin: employee.isAdmin === 'yes' ? true : false,
    //     isExpatriate: employee.isExpatriate === 'yes' ? true : false,
    //     department: officeType === "Department " ? officeId : employee.department,
    //     projectId: officeType === "Campaign " ? officeId : employee.projectId,
    //     leaveCount: +employee.leaveCount,
    //   });
    //   // eslint-disable-next-line no-unused-vars
    //   const resData = res.data.data;
    //   goToTop();

    //   showAlert(
    //     true,
    //     "Employee details successfully updated",
    //     "alert alert-success"
    //   );

    //   $("#EditEmployeeFormModal").modal("toggle");
    //   fetchAllEmployee();
    //   setLoading(false);
    // } catch (error) {
    //   const errorMsg = error.response?.data?.message;
    //   showAlert(true, `${errorMsg}`, "alert alert-warning");
    //   $("#EditEmployeeFormModal").modal("toggle");
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div
        className="modal fade"
        id="EditEmployeeFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit Employee Details
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              {!services.length ? (
                <>
                  <p style={{ textAlign: "center" }}>Loading Form...</p>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
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
                        <label htmlFor="gender">
                          Gender
                        </label>
                        <Select
                          options={genderOptions}
                          isSearchable={true}
                          isClearable={true}
                          value={employee.gender}
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
                          onChange={(e) =>
                            setEmployee({ ...employee, isAdmin: e?.value })
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
                          // value={moment(employee.date_of_joining).format()}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="reports_to">
                          Reports To
                        </label>
                        <Select
                          options={reportsTo}
                          isSearchable={true}
                          isClearable={true}
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
                            value={employee.department}
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
                            value={employee.projectId}
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
                          value={employee.designation}
                          ref={selectDesignationRef}
                          onChange={(e) =>
                            setEmployee({ ...employee, designation: e?.value })
                          }
                          style={{ display: 'inline-block' }}
                        />
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="shifts">Shifts</label>
                        <input
                          className="form-control"
                          name="shifts"
                          type="text"
                          placeholder="Click to edit Shifts..."
                          // value={employee.shifts.length ? employee.shifts.map((shift) => shift.day).join(' | ').toUpperCase() : ''}
                          data-toggle="modal"
                          data-target="#EditEmployeeShiftFormModal"
                          readOnly
                          autocomplete="off"
                          style={{ cursor: 'pointer' }}
                        />
                        </div>
                      </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="employeeType">
                          Employment Type
                        </label>
                        <Select
                          options={employmentTypesOptions}
                          isSearchable={true}
                          isClearable={true}
                          value={employee.employeeType}
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
                          value={employee.branch}
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
                          isClearable={true}
                          value={employee.status}
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
                      onClick={goBack}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ zIndex: 0 }}
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
      </div>

      <EditEmployeeShiftModal employee={employee} setEmployee={setEmployee} />
    </>
  );
};
