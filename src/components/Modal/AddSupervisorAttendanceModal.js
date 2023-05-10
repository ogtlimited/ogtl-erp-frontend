/** @format */

import React, { useState, useEffect } from "react";
import { ADD_SUPERVISOR_ATTENDANCE } from "../FormJSON/AddAttendance";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const AddSupervisorAttendanceModal = ({fetchAllAttendance, allSubordinates, today}) => {
  const { showAlert } = useAppContext();
  const [employee, setEmployee] = useState(ADD_SUPERVISOR_ATTENDANCE);
  const [loading, setLoading] = useState(false);

  const [isAllValid, setIsAllValid] = useState(false);
  const [isEmployeeIdValid, setIsEmployeeIdValid] = useState(false);

  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    setEmployeeId(allSubordinates);
    
    setIsEmployeeIdValid(employee.ogid ? true : false);
    setIsAllValid(
      employee.ogid ? true : false
    );
  }, [allSubordinates, employee]);

  const cancelEvent = () => {
    setEmployee(ADD_SUPERVISOR_ATTENDANCE);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleAddSubordinateAttendance = async (e) => {
    e.preventDefault();

    const employeeRecord = {
      ogid: employee.ogid,
      Date: employee.Date,
      ClockIn: employee.ClockIn,
      ClockOut: employee.ClockOut,
      reason: employee.reason,
    };

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/attendance/manual-attendance", employeeRecord);
      // eslint-disable-next-line no-unused-vars
      const resData = res;

      showAlert(
        true,
        `${employee.employeeName} Attendance for ${today} Successfully Added!`,
        "alert alert-success"
      );
      $("#AddAttendanceFormModal").modal("toggle");
      // fetchAllAttendance();
      setEmployee(ADD_SUPERVISOR_ATTENDANCE);
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      console.log("Add Attendance Record Error:", errorMsg);
      showAlert(true, `${errorMsg}`, "alert alert-danger");
      $("#AddAttendanceFormModal").modal("toggle");
      setEmployee(ADD_SUPERVISOR_ATTENDANCE);
      setLoading(false);
    }
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
                Manual Clock In/Out
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
              {!employeeId.length ? (
                <>
                  <p style={{ textAlign: "center" }}>Loading Form...</p>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                <form onSubmit={handleAddSubordinateAttendance}>
                  <div className="row">

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ogid">
                          Subordinates {!isEmployeeIdValid && <span>*</span>}
                        </label>
                        <Select
                          options={employeeId}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({ 
                              ...employee, 
                              ogid: e?.value,
                              employeeName: e?.label, 
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="Date">Date</label>
                        <input
                          className="form-control"
                          name="Date"
                          type="date"
                          value={employee.Date = today}
                          readOnly
                          style={{cursor: "not-allowed"}}
                        />
                      </div>
                    </div> 
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ClockIn">Clock In Time</label>
                        <input
                          className="form-control"
                          name="ClockIn"
                          type="time"
                          value={employee.ClockIn}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ClockOut">Clock Out time</label>
                        <input
                          className="form-control"
                          name="ClockOut"
                          type="time"
                          value={employee.ClockOut}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="reason">
                        Reason 
                      </label>
                      <textarea
                        name="reason"
                        className="form-control "
                        value={employee.reason}
                        onChange={handleFormChange}
                        required
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
