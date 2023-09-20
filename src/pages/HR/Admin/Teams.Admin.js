/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import AllDepartments from "./AllDepartments";
import AllDepartmentCampaigns from "./AllDepartmentCampaigns";

const Teams = () => {
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Teams</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Teams</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_departments"
                >
                  Departments
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_campaigns">
                  Campaigns
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_departments" className="col-12 tab-pane show active">
            <AllDepartments />
          </div>

          <div id="tab_campaigns" className="col-12 tab-pane">
            <AllDepartmentCampaigns />
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
