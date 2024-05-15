// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useParams } from "react-router-dom";
import CampaignTeams from "./CampaignTeams";
import CampaignSupervisor from "./CampaignSupervisors";
import CampaignEmployees from "./CampaignEmployees";
import CampaignHolidays from "./CampaignHolidays"

const CampaignUsers = () => {
  const { title } = useParams();

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">
              {title.toUpperCase()}
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Campaign</li>
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
                  href="#tab_campaign_teams"
                >
                  Teams
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_campaign_supervisors"
                >
                  Supervisors
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_campaign_employees"
                >
                  Employees
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_campaign_holidays"
                >
                Public Holidays
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_campaign_teams" className="col-12 tab-pane show active">
            <CampaignTeams />
          </div>

          <div id="tab_campaign_supervisors" className="col-12 tab-pane">
            <CampaignSupervisor />
          </div>

          <div id="tab_campaign_employees" className="col-12 tab-pane">
            <CampaignEmployees />
          </div>

          <div id="tab_campaign_holidays" className="col-12 tab-pane">
            <CampaignHolidays />
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignUsers;
