import React from "react";
import { Link, useLocation } from "react-router-dom";

const RecruitmentPageHeader = () => {
  const { pathname } = useLocation();
  const showIf = "/recruitment/joblist";

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-10">
            <h3 className="page-title">Jobs</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Recruitment</li>
              <li className="breadcrumb-item active">Jobs</li>
            </ul>
          </div>
          {showIf === pathname && (
            <div className="col-sm-2">
              <Link
                to="/recruitment/apply/general"
                className="btn job-type-info"
              >
                <span className="job-types">Apply</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecruitmentPageHeader;
