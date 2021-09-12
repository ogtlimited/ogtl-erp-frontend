import React from "react";

const Activity = () => {
  return (
    <div className="col-md-4">
      <div className="card recent-activity">
        <div className="card-body">
          <h5 className="card-title">Today Activity</h5>
          <ul className="res-activity-list">
            <li>
              <p className="mb-0">Punch In at</p>
              <p className="res-activity-time">
                <i className="fa fa-clock-o"></i>
                10.00 AM.
              </p>
            </li>
            <li>
              <p className="mb-0">Punch Out at</p>
              <p className="res-activity-time">
                <i className="fa fa-clock-o"></i>
                11.00 AM.
              </p>
            </li>
            <li>
              <p className="mb-0">Punch In at</p>
              <p className="res-activity-time">
                <i className="fa fa-clock-o"></i>
                11.15 AM.
              </p>
            </li>
            <li>
              <p className="mb-0">Punch Out at</p>
              <p className="res-activity-time">
                <i className="fa fa-clock-o"></i>
                1.30 PM.
              </p>
            </li>
            <li>
              <p className="mb-0">Punch In at</p>
              <p className="res-activity-time">
                <i className="fa fa-clock-o"></i>
                2.00 PM.
              </p>
            </li>
            <li>
              <p className="mb-0">Punch Out at</p>
              <p className="res-activity-time">
                <i className="fa fa-clock-o"></i>
                7.30 PM.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Activity;
