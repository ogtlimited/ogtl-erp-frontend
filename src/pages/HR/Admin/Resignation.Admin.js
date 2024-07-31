// *IN USE

import React, { useState } from "react";
import { useAppContext } from "../../../Context/AppContext";
import HrStaffResignationAdmin from "./HrStaffResignation.Admin";
import HrManagerResignationAdmin from "./HrManagerResignation.Admin";

const ResignationAdmin = () => {
  const { user } = useAppContext();
  const [viewingStage2, setViewingStage2] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;
  const authorizedSeniorRoles = ["hr_manager"];
  const authorizedJuniorRoles = ["hr_staff"];

  const AuthorizedHrManagerRoles = CurrentUserRoles.some((role) =>
    authorizedSeniorRoles.includes(role)
  );

  const AuthorizedHrStaffRoles = CurrentUserRoles.some((role) =>
    authorizedJuniorRoles.includes(role)
  );

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Resignations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item">Exit</li>
              <li className="breadcrumb-item active">Resignations</li>
            </ul>
          </div>
        </div>
      </div>

      {AuthorizedHrStaffRoles && AuthorizedHrManagerRoles ? (
        <div className="page-menu" style={{ marginBottom: "30px" }}>
          <div className="row">
            <div className="col-sm-12">
              <ul className="nav nav-tabs nav-tabs-bottom">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tab_stage_1"
                  >
                    Stage 1
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab_stage_2"
                    onClick={() => setViewingStage2(true)}
                  >
                    Stage 2
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {/* HR Staff Only  */}
      {AuthorizedHrStaffRoles && !AuthorizedHrManagerRoles ? (
        <div className="row tab-content">
          <div id="tab_stage_1" className="col-12 tab-pane show active">
            <HrStaffResignationAdmin />
          </div>
        </div>
      ) : null}

      {/* HR Manager Only */}
      {!AuthorizedHrStaffRoles && AuthorizedHrManagerRoles ? (
        <div className="row tab-content">
          <div id="tab_stage_2" className="col-12 tab-pane show active">
            <HrManagerResignationAdmin />
          </div>
        </div>
      ) : null}

      {/* Both HR Staff and HR Manager */}
      {AuthorizedHrStaffRoles && AuthorizedHrManagerRoles ? (
        <div className="row tab-content">
          <div id="tab_stage_1" className="col-12 tab-pane show active">
            <HrStaffResignationAdmin />
          </div>

          <div id="tab_stage_2" className="col-12 tab-pane">
            <HrManagerResignationAdmin viewingStage2={viewingStage2} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ResignationAdmin;
