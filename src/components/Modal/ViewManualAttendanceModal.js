// *IN USE

import React, { useState, useEffect } from "react";

export const ViewManualAttendanceModal = ({
  employeeOgid,
  today,
  setToday,
  employeeAttendance,
  userData,
  fetchEmployeeAttendance,
}) => {
  const [employee, setEmployee] = useState({
    ogid: "",
    date: "",
    clock_in: "",
    clock_out: "",
  });

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

  const handleDateChange = (e) => {
    e.preventDefault();
    const date = e?.target?.value;
    setToday(date);
    fetchEmployeeAttendance(date);
  };

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <div className="col" style={{ marginBottom: "30px" }}>
            <h4>Clock In/Out Time</h4>
          </div>

          <div className="modal-body">
            <div>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      className="form-control"
                      name="date"
                      type="date"
                      value={employee.date}
                      onChange={handleDateChange}
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
                      readOnly
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
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
