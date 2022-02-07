import React from "react";

const JobDashboardCard = () => {
  return (
    <div class="row">
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
          <div class="card-body">
            <span class="dash-widget-icon">
              <i class="fa fa-briefcase"></i>
            </span>
            <div class="dash-widget-info">
              <h3>110</h3>
              <span>Jobs</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
          <div class="card-body">
            <span class="dash-widget-icon">
              <i class="fa fa-users"></i>
            </span>
            <div class="dash-widget-info">
              <h3>40</h3>
              <span>Job Seekers</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
          <div class="card-body">
            <span class="dash-widget-icon">
              <i class="fa fa-user"></i>
            </span>
            <div class="dash-widget-info">
              <h3>374</h3>
              <span>Employees</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
          <div class="card-body">
            <span class="dash-widget-icon">
              <i class="fa fa-clipboard"></i>
            </span>
            <div class="dash-widget-info">
              <h3>220</h3>
              <span>Applications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDashboardCard;
