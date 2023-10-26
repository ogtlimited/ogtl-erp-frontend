/** @format */

import React from "react";
import LeaveVerticalBar from "./leaveVerticalBar";

const EmployeeTardinessStats = ({
  leaveStatusLabel,
  leaveStatusData,
  leaveTypeLabel,
  leaveTypeData,
  formattedLeaveType,
  formattedLeaveStatus,

  fromDate,
  toDate,
  setFromDate,
  setToDate,
  fromDate2,
  toDate2,
  setFromDate2,
  setToDate2,
}) => {
  const attendanceStatus = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 159, 64)",
          "rgba(205, 19, 84)",
          "rgba(55, 159, 64)",
          "rgba(153, 102, 255)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(205, 19, 84, 1)",
          "rgba(55, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill hr-dashboard-charts">
          <div className="leave-card-body">
            <h3 className="card-title">Leave Status</h3>

            {/* <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="from_date">From</label>
                  <input
                    type="date"
                    name="from_date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="form-control "
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="to_date">To</label>
                  <input
                    type="date"
                    name="to_date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="form-control "
                    required
                  />
                </div>
              </div>
            </div> */}

            <LeaveVerticalBar data={attendanceStatus} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTardinessStats;
