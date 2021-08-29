import React from "react";

const Activity = () => {
  return (
    <div class="col-md-4">
      <div class="card recent-activity">
        <div class="card-body">
          <h5 class="card-title">Today Activity</h5>
          <ul class="res-activity-list">
            <li>
              <p class="mb-0">Punch In at</p>
              <p class="res-activity-time">
                <i class="fa fa-clock-o"></i>
                10.00 AM.
              </p>
            </li>
            <li>
              <p class="mb-0">Punch Out at</p>
              <p class="res-activity-time">
                <i class="fa fa-clock-o"></i>
                11.00 AM.
              </p>
            </li>
            <li>
              <p class="mb-0">Punch In at</p>
              <p class="res-activity-time">
                <i class="fa fa-clock-o"></i>
                11.15 AM.
              </p>
            </li>
            <li>
              <p class="mb-0">Punch Out at</p>
              <p class="res-activity-time">
                <i class="fa fa-clock-o"></i>
                1.30 PM.
              </p>
            </li>
            <li>
              <p class="mb-0">Punch In at</p>
              <p class="res-activity-time">
                <i class="fa fa-clock-o"></i>
                2.00 PM.
              </p>
            </li>
            <li>
              <p class="mb-0">Punch Out at</p>
              <p class="res-activity-time">
                <i class="fa fa-clock-o"></i>
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
