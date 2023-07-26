/* eslint-disable jsx-a11y/anchor-is-valid */
/** @format */

import React, { useCallback, useEffect, useState } from "react";
import JobApplicantsTable from "./JobApplicantsTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import helper from "../../../services/helper";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";
import {
  InterviewProcessStageOptions,
  InterviewStatusOptions,
} from "../../../constants";
import ViewModal from "../../../components/Modal/ViewModal";
import JobApplicationContent from "../../../components/ModalContents/JobApplicationContent";
import ScheduleInterview from "../../../components/ModalContents/ScheduleInterview";

const JobApplicants = () => {
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();
  const [statusRow, setstatusRow] = useState(null);
  const [processingStageRow, setprocessingStageRow] = useState(null);
  const [interview_status, setInterviewStatus] = useState("");
  const [process_stage, setprocessingStage] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [unfiltered, setunfiltered] = useState([]);
  const [modalType, setmodalType] = useState("schedule-interview");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [intervieStatusFilter, setIntervieStatusFilter] = useState("");
  const [processingStageFilter, setprocessingStageFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Job Applicants
  const fetchAllJobApplicants = useCallback(async () => {

    try {
      const response = await axiosInstance.get('/api/v1/job_applicants.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.job_applicants;
      console.log("Job applicants:", resData);
 
      setData(resData);
      setLoading(false);
    } catch (error) {
      showAlert(
        true,
        "Error retrieving information from server",
        "alert alert-warning"
      );
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    fetchAllJobApplicants();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [fetchAllJobApplicants]);
  

  const columns = [
    {
      dataField: "full_name",
      text: "Job Applicant",
      sort: true,
      formatter: (value, row) => <h2>{row?.full_name}</h2>,
    },
    {
      dataField: "job_opening_id",
      text: "Job Opening",
      sort: true,
      formatter: (value, row) => (
        <>
          <h2>{row?.job_opening_id}</h2>
        </>
      ),
    },
    {
      dataField: "application_date",
      text: "Application Date",
      sort: true,
      formatter: (value, row) => <h2>{row.application_date}</h2>,
    },
    {
      dataField: "interview_date",
      text: "Interview Date",
      sort: true,
      formatter: (value, row) => <h2>{row.interview_date}</h2>,
    },
    {
      dataField: "interview_status",
      text: "Interview Status",
      sort: true,
      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={InterviewStatusOptions}
            setStatus={setInterviewStatus}
            value={value}
            row={row}
            setstatusRow={setstatusRow}
          />
        </>
      ),
    },
    {
      dataField: "process_stage",
      text: "Processing Stage",
      sort: true,

      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={InterviewProcessStageOptions}
            setStatus={setprocessingStage}
            value={value}
            row={row}
            setstatusRow={setprocessingStageRow}
          />
        </>
      ),
    },
    {
      dataField: "resume_attachment",
      text: "Resume Attachment",
      sort: true,
      formatter: (value, row) => (
        <a href={value} className="btn btn-sm btn-primary" download>
          <i className="fa fa-download"></i> Download
        </a>
      ),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      csvExport: false,
      headerStyle: { minWidth: "70px", textAlign: "left" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <>
            <a
              href="#"
              className="action-icon dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              {user?.role?.hr?.delete && (
                <a
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    setmodalType();
                    setSelectedRow(helper.handleEdit(row));
                  }}
                >
                  <i className="fa fa-trash m-r-5"></i> Delete
                </a>
              )}
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#generalModal"
                onClick={() => {
                  setmodalType("view-details");
                  setViewRow(row);
                }}
              >
                <i className="fa fa-eye m-r-5"></i> View
              </a>
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#generalModal"
                onClick={() => {
                  setmodalType("schedule-interview");
                  setSelectedRow(helper.handleEdit(row));
                }}
              >
                <i className="fa fa-clock m-r-5"></i> Schedule Interview
              </a>
            </div>
          </>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Job Applicants List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item">Recruitment</li>
              <li className="breadcrumb-item active">Job Applicants</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">

          <JobApplicantsTable
            data={data}
            setData={setData}
            loading={loading}
            setLoading={setLoading}
            columns={columns}

            statusInterview={InterviewStatusOptions}
            processingStage={InterviewProcessStageOptions}
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            intervieStatusFilter={intervieStatusFilter}
            setIntervieStatusFilter={setIntervieStatusFilter}
            processingStageFilter={processingStageFilter}
            setprocessingStageFilter={setprocessingStageFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>

      {modalType === "view-details" ? (
        <ViewModal
          title="Applicant Details"
          content={<JobApplicationContent jobApplication={viewRow} />}
        />
      ) : (
        <ViewModal
          title="Schedule Interview"
          content={
            <ScheduleInterview
              jobApplication={selectedRow}
            />
          }
        />
      )}
    </>
  );
};

export default JobApplicants;
