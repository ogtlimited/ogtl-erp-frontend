import React from 'react'
import {
  Link,
  matchPath,
  useLocation
} from "react-router-dom";

const RecruitmentPageHeader = () => {
  const { pathname } = useLocation();
  const showIf = "/recruitment/joblist"
  console.log(pathname);
    return (
        <>
        <div class="page-header">
        <div class="row">
          <div class="col-sm-10">
            <h3 class="page-title">Jobs</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a>Recruitment</a>
              </li>
              <li class="breadcrumb-item active">Jobs</li>
            </ul>
          </div>
          {showIf === pathname  &&
            <div class="col-sm-2">
            <Link to="/recruitment/apply/general" class="btn job-type-info"><span class="job-types">Apply</span></Link>
              
            </div>
          
          }
        </div>
      </div>
            
        </>
    )
}

export default RecruitmentPageHeader
