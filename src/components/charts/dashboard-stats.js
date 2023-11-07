import React from "react";

const DashboardStats = () => {

  return (
    <div className="col-md-12">
      <div className="card-group m-b-30">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <span className="d-block">New Employees</span>
              </div>
              <div>
                <span className="text-success">+10%</span>
              </div>
            </div>
            <h3 className="mb-3">10</h3>
            <div className="progress mb-2" style={{ height: "5px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "70%" }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p className="mb-0">Overall Employees 218</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <span className="d-block">Earnings</span>
              </div>
              <div>
                <span className="text-success">+12.5%</span>
              </div>
            </div>
            <h3 className="mb-3">$1,42,300</h3>
            <div className="progress mb-2" style={{ height: "5px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "70%" }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p className="mb-0">
              Previous Month <span className="text-muted">$1,15,852</span>
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <span className="d-block">Expenses</span>
              </div>
              <div>
                <span className="text-danger">-2.8%</span>
              </div>
            </div>
            <h3 className="mb-3">$8,500</h3>
            <div className="progress mb-2" style={{ height: "5px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "70%" }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p className="mb-0">
              Previous Month <span className="text-muted">$7,500</span>
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <span className="d-block">Profit</span>
              </div>
              <div>
                <span className="text-danger">-75%</span>
              </div>
            </div>
            <h3 className="mb-3">$1,12,000</h3>
            <div className="progress mb-2" style={{ height: "5px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "70%" }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p className="mb-0">
              Previous Month <span className="text-muted">$1,42,000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
