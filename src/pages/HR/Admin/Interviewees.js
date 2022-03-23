import React, { useState, useEffect } from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";

import axiosInstance from "../../../services/api";

const Interviewees = () => {
  const [allInterviewees, setallInterviewees] = useState([]);

  const fetchIntervieews = () => {
    axiosInstance
      .get("/api/jobApplicant", {
        params: { interview_status: "Scheduled for interview" },
      })
      .then((e) => {
        setallInterviewees(e.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchIntervieews();
  }, []);

  const columns = [
    {
      dataField: "",
      text: "Job Applicant",
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.first_name} {row?.middle_name} {row?.last_name}
        </h2>
      ),
    },
    {
      dataField: "email_address",
      text: "Email Address",
      sort: true,
    },
    {
      dataField: "job_opening_id",
      text: "Job Opening",
      sort: true,
      formatter: (value, row) => (
        <>
          {row?.job_opening_id?.job_title ? (
            <h2>{row?.job_opening_id?.job_title}</h2>
          ) : (
            <h2>{row?.default_job_opening_id?.job_title}</h2>
          )}
        </>
      ),
    },
    {
      dataField: "interview_date",
      text: "Interview Date",
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row.interview_date
            ? new Date(row.interview_date).toUTCString()
            : "Not Set"}
        </h2>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Interview Scheduled Lists</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">
                Interview Scheduled Lists
              </li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto"></div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <LeavesTable columns={columns} data={allInterviewees} />
        </div>
      </div>
    </>
  );
};

export default Interviewees;
