/** @format */

import React, { useState, useEffect } from "react";
import { ADD_ATTENDANCE } from "../FormJSON/AddAttendance";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import EmployeeHelperService from "../../pages/HR/Admin/employee.helper";

export const AddAttendanceModal = ({fetchAllAttendance}) => {
  const { createEmployee, showAlert, status } = useAppContext();
  const [employee, setEmployee] = useState(ADD_ATTENDANCE);
  const [loading, setLoading] = useState(false);

  const [isAllValid, setIsAllValid] = useState(false);
  const [isEmployeeIdValid, setIsEmployeeIdValid] = useState(false);

  const [services, setServices] = useState([]);
  const [employeeId, setEmployeeId] = useState("");


  useEffect(() => {
    setIsEmployeeIdValid(employee.employeeId ? true : false);
    setIsAllValid(
      employee.employeeId ? true : false
    );
  }, [employee]);

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
      console.log("I need all his info:", reports_to);
      setEmployeeId(reports_to);

    });
  }, [createEmployee, status]);

  const cancelEvent = () => {
    setEmployee(ADD_ATTENDANCE);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

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
        `${employee.employeeName} Attendance Added Successfully`,
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
                            setEmployee({ 
                              ...employee, 
                              employeeId: e?.value, 
                              shiftTypeId: e?.shiftTypeId, 
                              shiftTypeName: e?.shiftTypeName, 
                              employeeName: e?.label
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="shiftTypeId">Shift</label>
                        <input
                          className="form-control"
                          name="shiftTypeId"
                          type="text"
                          value={employee.shiftTypeName}
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
