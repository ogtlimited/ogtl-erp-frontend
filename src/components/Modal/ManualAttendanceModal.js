/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const ManualAttendanceModal = ({
  employeeOgid,
  today,
  employeeAttendance,
  userData,
  fetchEmployeeAttendance,
}) => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({
    ogid: "",
    date: "",
    clock_in: "",
    clock_out: "",
  });

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (employeeAttendance.length) {
      setEmployee({
        ogid: employeeOgid,
        date: today,
        clock_in: employeeAttendance[0].clock_in,
        clock_out: employeeAttendance[0].clock_out,
      });
    } else {
      setEmployee({
        ogid: employeeOgid,
        date: today,
        clock_in: "",
        clock_out: "",
      });
    }
  }, [employeeAttendance, employeeOgid, today]);

  const handleFormChange = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmitAttendance = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.put(
        `/api/v1/manual_clock_in/${employee.ogid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            clock_in: employee.clock_in,
            clock_out: employee.clock_out,
            date: employee.date,
          },
        }
      );
      // eslint-disable-next-line no-unused-vars
      const resData = res;

      showAlert(
        true,
        `${userData?.employee?.full_name} Attendance for ${today} Successfully Added!`,
        "alert alert-success"
      );
      goToTop();
      fetchEmployeeAttendance();
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, "alert alert-danger");
      setLoading(false);
      goToTop();
    }
  };

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <div className="col" style={{ marginBottom: "30px" }}>
            <h4>Manual Clock In/Out</h4>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmitAttendance}>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      className="form-control"
                      name="date"
                      type="date"
                      value={employee.date}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="clock_in">Clock In Time</label>
                    <input
                      className="form-control"
                      name="clock_in"
                      type="time"
                      value={employee.clock_in}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="clock_out">Clock Out time</label>
                    <input
                      className="form-control"
                      name="clock_out"
                      type="time"
                      value={employee.clock_out}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
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
          </div>
        </div>
      </div>
    </>
  );
};
