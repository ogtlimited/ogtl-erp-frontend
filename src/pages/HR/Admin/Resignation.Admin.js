// *IN USE

import React from "react";
import { useAppContext } from "../../../Context/AppContext";
import HrStaffResignationAdmin from "./HrStaffResignation.Admin";

const ResignationAdmin = () => {
  const { user } = useAppContext();

  const CurrentUserRoles = user?.employee_info?.roles;
  const authorizedRoles = ["hr_manager", "senior_hr_associate"];

  const AuthorizedHrRoles = CurrentUserRoles.some((role) =>
    authorizedRoles.includes(role)
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

      {AuthorizedHrRoles ? (
        <div className="page-menu">
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
                  <a className="nav-link" data-toggle="tab" href="#tab_stage_2">
                    Stage 2
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      <div className="row tab-content">
        <div id="tab_stage_1" className="col-12 tab-pane show active">
          <HrStaffResignationAdmin />
        </div>

        <div id="tab_stage_2" className="col-12 tab-pane">
          {/* <ReversedDeductions /> */}
        </div>
      </div>
    </>
  );
};

export default ResignationAdmin;
