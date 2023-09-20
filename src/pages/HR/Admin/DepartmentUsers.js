// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useParams } from "react-router-dom";
import DepartmentEmployees from "./DepartmentEmployees";
import DepartmentCampaigns from "./DepartmentCampaigns";
import DepartmentSupervisors from "./DepartmentSupervisors";

const DepartmentUsers = () => {
  const { title } = useParams();

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Department</li>
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
                  href="#tab_department_employees"
                >
                  Employees
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_department_campaigns"
                >
                  Campaigns
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_department_supervisors"
                >
                  Supervisors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div
            id="tab_department_employees"
            className="col-12 tab-pane show active"
          >
            <DepartmentEmployees />
          </div>

          <div id="tab_department_campaigns" className="col-12 tab-pane">
            <DepartmentCampaigns />
          </div>

          <div id="tab_department_supervisors" className="col-12 tab-pane">
            <DepartmentSupervisors />
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentUsers;
