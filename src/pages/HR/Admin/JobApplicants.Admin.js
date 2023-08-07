// *IN USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useEffect, useState } from "react";
import JobApplicantsTable from "./JobApplicantsTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import helper from "../../../services/helper";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";
import {
  InterviewStatusOptions,
  InterviewProcessStageOptions,
} from "../../../constants";
import ViewModal from "../../../components/Modal/ViewModal";
import JobApplicationContent from "../../../components/ModalContents/JobApplicationContent";
import ScheduleInterview from "../../../components/ModalContents/ScheduleInterview";
import moment from "moment";
import secureLocalStorage from "react-secure-storage";
import $ from "jquery";

const JobApplicantsAdmin = () => {
  const [data, setData] = useState([]);
  const { showAlert, user, ErrorHandler } = useAppContext();
  const [statusRow, setStatusRow] = useState(null);
  const [processingStageRow, setProcessingStageRow] = useState(null);
  const [interview_status, setInterviewStatus] = useState("");
  const [process_status, setProcessingStage] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const [modalType, setmodalType] = useState("schedule-interview");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [interviewStatusFilter, setInterviewStatusFilter] = useState("");
  const [processingStageFilter, setProcessingStageFilter] = useState("Open");
  const [searchTerm, setSearchTerm] = useState("");

  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);

  const CurrentUserRoles = user?.employee_info?.roles;
  const userDept =
    user?.office?.office_type === "department" ? user?.office?.title : null;

  // Job Applicants
  const fetchAllJobApplicants = useCallback(async () => {
    if (CurrentUserRoles.includes("rep_siever")) {
      const persistedFromDate = secureLocalStorage.getItem("fromDate");
      const persistedToDate = secureLocalStorage.getItem("toDate");

      setLoading(true);
      try {
        const response = await axiosInstance.get(
          "/api/v1/rep_siever_job_applications.json",
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            params: {
              page: page,
              limit: sizePerPage,
              name: searchTerm.length ? searchTerm : null,
              process_status: processingStageFilter,
              start_date: persistedFromDate,
              end_date: persistedToDate,
            },
          }
        );

        const resData = response?.data?.data?.job_applicants;
        const totalPages = response?.data?.data?.total_pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formatted = resData.map((emp) => ({
          ...emp,
          full_name: `${emp?.first_name} ${emp?.last_name}`,
          job_title: emp?.job_opening?.job_title,
          application_date: moment(emp?.created_at).format("Do MMMM, YYYY"),
          interview_date: emp?.interview_date
            ? moment(emp?.interview_date).format("Do MMMM, YYYY")
            : "Not Scheduled",
        }));

        setData(formatted);
        setLoading(false);
      } catch (error) {
        const component = "Job Applicants Error:";
        ErrorHandler(error, component);
        setLoading(false);
      }
      return;
    } else {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          "/api/v1/job_applicants.json",
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            params: {
              page: page,
              limit: sizePerPage,
              process_status: processingStageFilter,
              start_date: fromDate,
              end_date: toDate,
            },
          }
        );

        const resData = response?.data?.data?.job_applicants;
        const totalPages = response?.data?.data?.total_pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formatted = resData.map((emp) => ({
          ...emp,
          full_name: `${emp?.first_name} ${emp?.last_name}`,
          job_title: emp?.job_opening?.job_title,
          application_date: moment(emp?.created_at).format("Do MMMM, YYYY"),
          interview_date: emp?.interview_date
            ? moment(emp?.interview_date).format("Do MMMM, YYYY")
            : "Not Scheduled",
        }));

        setData(formatted);
        setLoading(false);
      } catch (error) {
        const component = "Job Applicants Error:";
        ErrorHandler(error, component);
        setLoading(false);
      }
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    CurrentUserRoles,
    fromDate,
    page,
    processingStageFilter,
    sizePerPage,
    toDate,
  ]);

  useEffect(() => {
    fetchAllJobApplicants();
  }, [fetchAllJobApplicants]);

  //update jobOpening
  const handleUpdate = useCallback(
    (id, update) => {
      if (!CurrentUserRoles.includes("rep_siever")) {
        return showAlert(
          true,
          "You are not a rep siever",
          "alert alert-warning"
        );
      }

      axiosInstance
        .patch(`/api/v1/job_applicants/${id}.json`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: update,
        })
        .then((res) => {
          showAlert(
            true,
            "Job application updated successfully",
            "alert alert-success"
          );
          setProcessingStageFilter("Open");
          fetchAllJobApplicants();
        })
        .catch((error) => {
          const errorMsg = error?.response?.data?.errors;
          if (errorMsg) {
            return showAlert(true, errorMsg, "alert alert-danger");
          } else {
            return showAlert(
              true,
              "Error updating job applicant information",
              "alert alert-danger"
            );
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [CurrentUserRoles]
  );

  // update interview status
  useEffect(() => {
    if (interview_status.length) {
      const update = {
        interview_status,
        // id: statusRow?.id,
      };
      handleUpdate(statusRow.id, update);
    }
  }, [interview_status, statusRow, handleUpdate]);

  // update process status
  useEffect(() => {
    if (process_status.length) {
      if (process_status === "Interview scheduled") {
        setmodalType("schedule-interview");
        setSelectedRow(processingStageRow);
        $("#generalModal").modal("show");
        return;
      }

      const update = {
        process_status,
        interview_date: null,
        // id: processingStageRow?.id,
      };
      handleUpdate(processingStageRow.id, update);
    }
  }, [process_status, processingStageRow, handleUpdate]);

  const columns = [
    {
      dataField: "full_name",
      text: "Job Applicant",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => <h2>{row?.full_name}</h2>,
    },
    {
      dataField: "job_title",
      text: "Job Opening",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <>
          <h2>{row?.job_title}</h2>
        </>
      ),
    },
    {
      dataField: "application_date",
      text: "Application Date",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => <h2>{row.application_date}</h2>,
    },
    {
      dataField: "interview_date",
      text: "Interview Date",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => <h2>{row.interview_date}</h2>,
    },
    {
      dataField: "interview_status",
      text: "Interview Status",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <>
          {value === "Open" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-primary"}></i> {value}
            </a>
          ) : value === "Scheduled for interview" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-success"}></i> {value}
            </a>
          ) : value === "Not interested" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-secondary"}></i> {value}
            </a>
          ) : value === "Not a graduate" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-dark"}></i> {value}
            </a>
          ) : value === "Not in job location" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-muted"}></i> {value}
            </a>
          ) : value === "Failed screening" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-danger"}></i> {value}
            </a>
          ) : value === "Missed call" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-info"}></i> {value}
            </a>
          ) : (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-warning"}></i> {value}
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "process_status",
      text: "Process Stage",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <>
          {value === "Open" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-primary"}></i> {value}
            </a>
          ) : value === "Sieving" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-warning"}></i> {value}
            </a>
          ) : value === "Phone screening" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-info"}></i> {value}
            </a>
          ) : value === "Interview scheduled" ? (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-success"}></i> {value}
            </a>
          ) : (
            <a className="btn btn-gray btn-sm btn-rounded">
              <i className={"fa fa-dot-circle-o text-secondary"}></i> {value}
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "resume_attachment",
      text: "Resume Attachment",
      sort: true,
      headerStyle: { width: "20%" },
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
      headerStyle: { width: "10%", textAlign: "left" },
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
              {/* {user?.role?.hr?.delete && (
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
              )} */}

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

              {CurrentUserRoles?.includes("rep_siever") && userDept === "hr" ? (
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
              ) : null}
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
            <h3 className="page-title">Job Applications</h3>
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
            columns={columns}
            data={data}
            setData={setData}
            loading={loading}
            setLoading={setLoading}
            interviewStatus={InterviewStatusOptions}
            processingStage={InterviewProcessStageOptions}
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            fetchAllJobApplicants={fetchAllJobApplicants}
            interviewStatusFilter={interviewStatusFilter}
            setInterviewStatusFilter={setInterviewStatusFilter}
            processingStageFilter={processingStageFilter}
            setProcessingStageFilter={setProcessingStageFilter}
          />
        </div>
      </div>

      {modalType === "view-details" && (
        <ViewModal
          title="Applicant Details"
          content={
            <JobApplicationContent
              jobApplication={viewRow}
              handleRefresh={fetchAllJobApplicants}
            />
          }
        />
      )}
      {modalType === "schedule-interview" && (
        <ViewModal
          title="Schedule Interview"
          content={
            <ScheduleInterview
              jobApplication={selectedRow}
              handleUpdate={handleUpdate}
              handleRefresh={fetchAllJobApplicants}
              setModalType={setmodalType}
            />
          }
        />
      )}
    </>
  );
};

export default JobApplicantsAdmin;
