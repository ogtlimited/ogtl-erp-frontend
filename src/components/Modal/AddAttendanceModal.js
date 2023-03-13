/** @format */

import React, { useState, useEffect, useRef } from "react";
import { ADD_ATTENDANCE } from "../FormJSON/AddAttendance";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import EmployeeHelperService from "../../pages/HR/Admin/employee.helper";

export const AddAttendanceModal = ({fetchAllAttendance}) => {
  const selectInputRef = useRef();
  const { createEmployee, showAlert, status } = useAppContext();
  const [employee, setEmployee] = useState(ADD_ATTENDANCE);
  const [loading, setLoading] = useState(false);

  const [isAllValid, setIsAllValid] = useState(false);
  const [isEmployeeIdValid, setIsEmployeeIdValid] = useState(false);
  const [isShiftValid, setIsShiftValid] = useState(false);

  const [services, setServices] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [projectId, setProjectId] = useState("");
  const [validShift, setValidShift] = useState("");
  const [validDesignation, setValidDesignation] = useState("");
  const [officeType, setOfficeType] = useState("");
  const [officeId, setOfficeId] = useState("");
  const [deptError, setDeptError] = useState("");
  const [desError, setDesError] = useState("");

  useEffect(() => {
    setIsEmployeeIdValid(employee.employeeId ? true : false);
    setIsShiftValid(employee.shiftTypeId ? true : false);
    setIsAllValid(
      employee.employeeId && employee.shiftTypeId  ? true : false
    );
  }, [employee]);

  const handleDepartmentClick = (e) => {
    setEmployee({ ...employee, department: e?.value });
    setOfficeType("Department ");
    setOfficeId(e.value);

    selectInputRef.current.select.clearValue();
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

    selectInputRef.current.select.clearValue();
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
      setEmployeeId(reports_to);

      const department = service.deptopts;
      setDepartment(department);

      const projectId = service.campaingOpts;
      setProjectId(projectId);
    });
  }, [createEmployee, officeId, status]);

  const cancelEvent = () => {
    setEmployee(ADD_ATTENDANCE);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    // console.log("Submit this employee attendance:", {
    //   employeeId: employee.employeeId,
    //   shiftTypeId: employee.shiftTypeId,
    //   clockInTime: employee.clockInTime,
    //   clockOutTime: employee.clockOutTime,
    // });

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/attendance", {
        employeeId: employee.employeeId,
        shiftTypeId: employee.shiftTypeId,
        clockInTime: employee.clockInTime,
        clockOutTime: employee.clockOutTime,
      });
      // eslint-disable-next-line no-unused-vars
      const resData = res?.data?.data;
      console.log("Add Employee Record Response:", resData)

      showAlert(
        true,
        "Employee Attendance Added successfully",
        "alert alert-success"
      );
      $("#AddAttendanceFormModal").modal("toggle");
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      console.log("Add Attendance Record Error:", errorMsg);
      setEmployee(ADD_ATTENDANCE);
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#AddAttendanceFormModal").modal("toggle");
      fetchAllAttendance();
      setLoading(false);
    }
    setEmployee(ADD_ATTENDANCE);
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddAttendanceFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add New Attendance
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
                <form onSubmit={handleAddEmployee}>
                  <div className="row">

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="employeeId">
                          Employee {!isEmployeeIdValid && <span>*</span>}
                        </label>
                        <Select
                          options={employeeId}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({ ...employee, employeeId: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Department</label>
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
                        <label>Campaign</label>
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
                    
                    <div className="col-md-6" style={{display: "none"}}>
                      <div className="form-group">
                        {!validDesignation.length ? (
                          <label>Designation</label>
                        ) : (
                          <label>
                            {officeType} Designation
                          </label>
                        )}
                        <Select
                          options={!validDesignation.length ? validDesignation : validDesignation}
                          isSearchable={true}
                          isClearable={true}
                          ref={selectInputRef}
                          onChange={(e) =>
                            setEmployee({ ...employee, designation: e?.value })
                          }
                          style={{ display: 'inline-block' }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        {!validShift.length ? (
                          <label htmlFor="shiftTypeId">Shift {!isShiftValid && <span>*</span>}</label>
                        ) : (
                          <label htmlFor="shiftTypeId">
                            {officeType} Shift {!isShiftValid && <span>*</span>}
                          </label>
                        )}
                        <Select
                          options={!validShift.length ? validShift : validShift}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({
                              ...employee,
                              shiftTypeId: e?.value,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div> 
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="clockInTime">Clock In Time</label>
                        <input
                          className="form-control"
                          name="clockInTime"
                          type="time"
                          value={employee.clockInTime}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="clockOutTime">Clock Out time</label>
                        <input
                          className="form-control"
                          name="clockOutTime"
                          type="time"
                          value={employee.clockOutTime}
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
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ zIndex: 0 }}
                      disabled={!isAllValid}
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
    </>
  );
};
