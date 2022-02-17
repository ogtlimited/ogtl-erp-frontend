import React, { useState, useEffect } from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";

import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";

const Interviewees = () => {
  const [allLeaves, setallLeaves] = useState([]);
  const { showAlert, allEmployees, combineRequest } = useAppContext();

  const [status, setStatus] = useState("");
  const [editData, seteditData] = useState({});
  const [formMode, setformMode] = useState("add");
  const [fetched, setfetched] = useState(false);
  const [statusRow, setstatusRow] = useState({});
  const fetchIntervieews = () => {
    axiosInstance.get("/leave-application").then((e) => {
      const leaves = e.data.data;
      setallLeaves(e.data.data);

      const approved = leaves.filter((e) => e.status === "approved").length;
      const open = leaves.filter((l) => l.status === "open").length;

      setfetched(true);
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
        <h2>{row.interview_date ? row.interview_date : "Not Set"}</h2>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Interviewees</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Interviewees</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto"></div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-3">
          <div className="stats-info">
            <h6>Today Presents</h6>
            <h4>
             0
            </h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-info">
            <h6>Opened Leaves</h6>
            <h4>0 &nbsp;</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-info">
            <h6>Approved Leaves</h6>
            <h4>0</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-info">
            <h6>Pending Requests</h6>
            <h4> 0</h4>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="col-12">
          <LeavesTable columns={columns} data={allLeaves} />
        </div>
      </div>
    </>
  );
};

export default Interviewees;
