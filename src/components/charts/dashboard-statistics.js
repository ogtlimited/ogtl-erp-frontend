/** @format */

import React from 'react';
// import { Doughnut } from "react-chartjs-2";
import VerticalBar from './verticalBar';

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
}) => {
  
  
  const leaveType = {
    labels: ["Annual","Casual","Sick","Without Pay","Maternity"],
    datasets: [
      {
        data: [2, 1, 0, 3, 1],
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

  const leaveStatus = {
    labels:  ['pending','rejected','cancelled', 'approved'],
    datasets: [
      {
        data:  [8, 4, 0, 11],
        backgroundColor: [
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(205, 19, 84)',
          'rgba(55, 159, 64)',
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(205, 19, 84, 1)',
          'rgba(55, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <div className="col-md-12 col-lg-12 col-xl-4 d-flex">
        <div className="card flex-fill dash-statistics">
          <div className="card-body">
            <h5 className="card-title">Statistics</h5>
            <div className="stats-list">
              {/* <div className="stats-info">
                <p>
                  Today Leave{' '}
                  <strong>
                    - <small>/ -</small>
                  </strong>
                </p>
                <div className="progress">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: '0%' }}
                    aria-valuenow="31"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div> */}
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
                    style={{ width: `${pendingInvoice * (100 / totalInvoice)}%` }}
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
                    style={{ width: `${completedProjects * (100 / totalProjects)}%` }}
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
                    style={{ width: `${closedTickets * (100 / totalTickets)}%` }}
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
      <div className="col-md-12">
    </div>
    </>
  );
};

export default DashboardStatistics;
