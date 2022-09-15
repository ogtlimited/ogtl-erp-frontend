/** @format */

import AcademyCard from "../../components/JobDashboard/AcademyCard";
import AcademyOverview from "../../components/JobDashboard/AcademyOverview";
import AcademyRecruitmentSupervision from "../../components/JobDashboard/AcademyRecruitmentSupervision";
import AcademyRatio from "../Dashboard/AcademyRatio";

const AcademyReport = () => {
  return (
    <>
    <div className="page-header">
      <div className="row">
        <div className="col">
          <h3 className="page-title">Academy Report</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Academy Report</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
      <AcademyCard />
      <AcademyOverview />
      <AcademyRatio />
      <AcademyRecruitmentSupervision />
      </div>
    </div>
  </>
  );
};

export default AcademyReport;
