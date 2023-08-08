// *IN USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useEffect, useState } from "react";
import JobApplicantsTable from "../Admin/JobApplicantsTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import helper from "../../../services/helper";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";
import { JobApplicationSieveModal } from "../../../components/Modal/JobApplicationSieveModal";
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

const JobApplicants = () => {
  const [data, setData] = useState([]);
  const { showAlert, user, ErrorHandler } = useAppContext();
  const [statusRow, setStatusRow] = useState(null);
  const [processingStageRow, setProcessingStageRow] = useState(null);
  const [interview_status, setInterviewStatus] = useState("");
  const [process_status, setProcessingStage] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const [modalType, setModalType] = useState("schedule-interview");
  const [loading, setLoading] = useState(false);
  const [isInterviewSelected, setIsInterviewSelected] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [interviewStatusFilter, setInterviewStatusFilter] = useState("");
  const [processingStageFilter, setProcessingStageFilter] = useState("Open");
  const [searchTerm, setSearchTerm] = useState("");

  let firstDay = moment().startOf("month").format("YYYY-MM-DD");
  let lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);

  // Job Applicants
  const fetchAllJobApplicants = useCallback(async () => {
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
        interview_scheduled_date: emp?.interview_date
          ? moment(emp?.interview_date).format("Do MMMM, YYYY")
          : null,
      }));

      setData(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Job Applicants Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, page, processingStageFilter, sizePerPage, toDate]);

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

  // Interview Status
  useEffect(() => {
    if (interview_status.length) {
      const update = {
        interview_status,
        // id: statusRow?.id,
      };
      handleUpdate(statusRow.id, update);
    }
  }, [interview_status, statusRow, handleUpdate]);

  // Process Status
  useEffect(() => {
    if (process_status.length) {
      if (process_status === "Interview scheduled") {
        setModalType("schedule-interview");
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

  const getInterviewStatusColorClass = (value) => {
    const colorMap = {
      Open: "text-primary",
      "Scheduled for interview": "text-success",
      "Not interested": "text-secondary",
      "Not a graduate": "text-dark",
      "Not in job location": "text-muted",
      "Failed screening": "text-danger",
      "Missed call": "text-info",
    };

    return colorMap[value] || "text-warning";
  };

  const getProcessStatusColorClass = (value) => {
    const colorMap = {
      Open: "text-primary",
      Sieving: "text-warning",
      "Phone screening": "text-info",
      "Interview scheduled": "text-success",
    };

    return colorMap[value] || "text-secondary";
  };

  const columns = [
    {
      dataField: "full_name",
      text: "Job Applicant",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => <h2>{row?.full_name}</h2>,
    },
    {
      dataField: "job_title",
      text: "Job Opening",
      sort: true,
      headerStyle: { width: "15%" },
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
      headerStyle: { width: "15%" },
      formatter: (value, row) => <h2>{row.application_date}</h2>,
    },
    {
      dataField: "interview_scheduled_date",
      text: "Interview Date",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => <h2>{row.interview_scheduled_date || "Not Scheduled"}</h2>,
    },
    {
      dataField: "interview_status",
      text: "Interview Status",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          <a
            className={`btn btn-gray btn-sm btn-rounded`}
            data-toggle="modal"
            data-target="#JobApplicationSieveModal"
            onClick={() => {
              setModalType("update-status");
              setViewRow(row);
            }}
          >
            <i
              className={`fa fa-dot-circle-o ${getInterviewStatusColorClass(
                value
              )}`}
            ></i>{" "}
            {value}
          </a>
        </>
      ),
    },
    {
      dataField: "process_status",
      text: "Process Stage",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          <a
            className={`btn btn-gray btn-sm btn-rounded`}
            data-toggle="modal"
            data-target="#JobApplicationSieveModal"
            onClick={() => {
              setModalType("update-status");
              setViewRow(row);
            }}
          >
            <i
              className={`fa fa-dot-circle-o ${getProcessStatusColorClass(
                value
              )}`}
            ></i>{" "}
            {value}
          </a>
        </>
      ),
    },
    {
      dataField: "resume_attachment",
      text: "Resume Attachment",
      sort: true,
      headerStyle: { width: "15%" },
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
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#JobApplicationSieveModal"
                onClick={() => {
                  setModalType("update-status");
                  setViewRow(row);
                }}
              >
                <i className="fa fa-pencil-square-o m-r-5"></i> Update Status
              </a>

              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#generalModal"
                onClick={() => {
                  setModalType("view-details");
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
                  setModalType("schedule-interview");
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
              setModalType={setModalType}
            />
          }
        />
      )}

      {modalType === "update-status" && (
        <JobApplicationSieveModal
          row={viewRow}
          fetchAllJobApplicants={fetchAllJobApplicants}
          setModalType={setModalType}
          setIsInterviewSelected={setIsInterviewSelected}
          setSelectedRow={setSelectedRow}
        />
      )}
    </>
  );
};

export default JobApplicants;
