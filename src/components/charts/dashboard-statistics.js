/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveVerticalBar from './leaveVerticalBar';

const DashboardStatistics = ({
  stats,
  chartData,
  chartTitle,
  totalInvoice,
  pendingInvoice,
  processingTickets,
  openTickets,
  closedTickets,
  totalTickets,
  completedProjects,
  totalProjects,
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
  const navigate = useNavigate();

  const handleLeaveStatusChartClick = (element, leaveStatusLabel) => {
    try {
      if (element.length > 0) {
        const dataIndex = element[0].index;
        const leaveStatus = formattedLeaveStatus;
        const status = leaveStatus[dataIndex];
        const id = leaveStatus[dataIndex];
        localStorage.setItem("leave status", status);
        localStorage.removeItem("leave type");
        navigate(`/dashboard/hr/leaves-admin/application/leave-status/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveTypeChartClick = (element, leaveTypeLabel) => {
    try {
      if (element.length > 0) {
        const dataIndex = element[0].index;
        const leaveType = leaveTypeLabel;
        const leave_type = leaveType[dataIndex];
        const id = leaveType[dataIndex];
        localStorage.setItem("leave type", leave_type);
        localStorage.removeItem("leave status");
        navigate(`/dashboard/hr/leaves-admin/application/leave-type/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const leaveStatus = {
    labels: leaveStatusLabel,
    datasets: [
      {
        data: leaveStatusData,
        backgroundColor: [
          'rgba(205, 19, 84)',
          'rgba(55, 159, 64)',
          'rgba(255, 159, 64)',
          'rgba(153, 102, 255)',
        ],
        borderColor: [
          'rgba(205, 19, 84, 1)',
          'rgba(55, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const leaveType = {
    labels: leaveTypeLabel,
    datasets: [
      {
        data: leaveTypeData,
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(205, 19, 84)',
          'rgba(55, 159, 64)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(205, 19, 84, 1)',
          'rgba(55, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="col-md-12 col-lg-12 col-xl-12 d-flex">
        <div className="card flex-fill dash-statistics">
          <div className="card-body">
            <h5 className="card-title">Statistics</h5>
            <div className="stats-list">
              <div className="stats-info">
                <p>
                  Pending Invoice{' '}
                  <strong>
                    {pendingInvoice} <small>/ {totalInvoice}</small>
                  </strong>
                </p>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{
                      width: `${pendingInvoice * (100 / totalInvoice)}%`,
                    }}
                    aria-valuenow="31"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="stats-info">
                <p>
                  Completed Projects{' '}
                  <strong>
                    {completedProjects} <small>/ {totalProjects}</small>
                  </strong>
                </p>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width: `${completedProjects * (100 / totalProjects)}%`,
                    }}
                    aria-valuenow="62"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="stats-info">
                <p>
                  Open Tickets{' '}
                  <strong>
                    {openTickets} <small>/ {totalTickets}</small>
                  </strong>
                </p>
                <div className="progress">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: `${openTickets * (100 / totalTickets)}%` }}
                    aria-valuenow="62"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="stats-info">
                <p>
                  Pending Tickets{' '}
                  <strong>
                    {processingTickets} <small>/ {totalTickets}</small>
                  </strong>
                </p>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${openTickets * (100 / totalTickets)}%` }}
                    aria-valuenow="62"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="stats-info">
                <p>
                  Closed Tickets{' '}
                  <strong>
                    {closedTickets} <small>/ {totalTickets}</small>
                  </strong>
                </p>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{
                      width: `${closedTickets * (100 / totalTickets)}%`,
                    }}
                    aria-valuenow="22"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12 col-lg-8 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="leave-card-body">
            <h3 className="card-title">Leave Status</h3>

            <div className="row">
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
            </div>

            <LeaveVerticalBar
              data={leaveStatus}
              handleChartClick={(element) =>
                handleLeaveStatusChartClick(element, leaveStatusLabel)
              }
            />
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-6 col-xl-5 d-flex">
        <div className="card flex-fill">
          <div className="leave-card-body">
            <h3 className="card-title">Leave Type</h3>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="from_date">From</label>
                  <input
                    type="date"
                    name="from_date"
                    value={fromDate2}
                    onChange={(e) => setFromDate2(e.target.value)}
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
                    value={toDate2}
                    onChange={(e) => setToDate2(e.target.value)}
                    className="form-control "
                    required
                  />
                </div>
              </div>
            </div>

            <LeaveVerticalBar
              data={leaveType}
              handleChartClick={(element) =>
                handleLeaveTypeChartClick(element, leaveTypeLabel)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStatistics;
