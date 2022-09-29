import React from "react";
import { useNavigate } from "react-router-dom";

const AcademyCard = ({ cardData, acknowledgements }) => {
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
              <h3>{acknowledgements}</h3>
              <span>Acknowledgments Sent</span>
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
              <h3>{cardData}</h3>
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
              <h3>{cardData}</h3>
              <span>Applications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;
