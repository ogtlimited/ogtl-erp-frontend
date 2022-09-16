/** @format */
import React, { useState, useEffect } from 'react';
import AcademyCard from '../../components/JobDashboard/AcademyCard';
import AcademyRatio2 from '../Dashboard/AcademyRatio2';
import AcademyOverview from '../../components/JobDashboard/AcademyOverview';
import AcademyRecruitmentSupervision from '../../components/JobDashboard/AcademyRecruitmentSupervision';
import AcademyUpload from '../../components/Modal/AcademyUpload';

const AcademyReport = () => {
  const [toggleModal, settoggleModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (uploadSuccess) {
      console.log('Successfully uploaded!');
    }
  }, [uploadSuccess]);

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
          <button
            className="btn add-academy-btn m-r-5"
            data-toggle="modal"
            data-target="#uploadAttendance"
            onClick={() => settoggleModal(true)}
          >
            Import Records
          </button>
          <AcademyOverview />
          <AcademyRatio2 />
          <AcademyRecruitmentSupervision />
        </div>
      </div>

      {toggleModal && (
        <div id="academy-upload-button">
          <AcademyUpload
            settoggleModal={settoggleModal}
            title="Upload Records"
            url="/api/employees-salary"
            setUploadSuccess={setUploadSuccess}
          />
        </div>
      )}
    </>
  );
};

export default AcademyReport;
