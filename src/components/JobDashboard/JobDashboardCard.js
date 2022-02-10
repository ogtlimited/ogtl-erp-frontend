import React from "react";

const JobDashboardCard = ({ data }) => {
  return (
    <div className="row">
      <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div className="card dash-widget">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="fa fa-briefcase"></i>
            </span>
            <div className="dash-widget-info">
              <h3>{data?.totalJobOpenings}</h3>
              <span>Jobs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div className="card dash-widget">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="fa fa-users"></i>
            </span>
            <div className="dash-widget-info">
              <h3>{data?.totalJobOffers}</h3>
              <span>Accepted Job Offers</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div className="card dash-widget">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="fa fa-user"></i>
            </span>
            <div className="dash-widget-info">
              <h3>{data?.totalEmployees}</h3>
              <span>Employees</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div className="card dash-widget">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="fa fa-clipboard"></i>
            </span>
            <div className="dash-widget-info">
              <h3>{data?.totalJobApplicants}</h3>
              <span>Applications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDashboardCard;
