import React from "react";
import { useNavigate } from "react-router-dom";

const AcademyCard = ({ data }) => {
  const navigate = useNavigate();
  
  
  return (
    <div className="row">
      <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div className="card dash-widget">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="fa fa-users"></i>
            </span>
            <div className="dash-widget-info">
              <h3>0</h3>
              <span>Accepted Offers</span>
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
              <h3>0</h3>
              <span>Members</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div className="card dash-widget">
          <div className="card-body card-body-application" onClick={() => navigate("/dashboard/recruitment/academy-applicants")}>
            <span className="dash-widget-icon">
              <i className="fa fa-clipboard"></i>
            </span>
            <div className="dash-widget-info">
              <h3>0</h3>
              <span>Applications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;
