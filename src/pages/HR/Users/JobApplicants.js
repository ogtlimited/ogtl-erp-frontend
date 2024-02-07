/* eslint-disable jsx-a11y/anchor-is-valid */
// *IN USE

import React, { useCallback, useEffect, useState } from "react";
import JobApplicantsTable from "../Admin/JobApplicantsTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import helper from "../../../services/helper";
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

const JobApplicants = () => {
  const [data, setData] = useState([]);
  const {
    showAlert,
    user,
    ErrorHandler,
    getAvatarColor,
    fetchAllJobApplicationISandIPS,
  } = useAppContext();
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const [modalType, setModalType] = useState("schedule-interview");
  const [loading, setLoading] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [interviewStatusFilter, setInterviewStatusFilter] = useState("");
  const [processingStageFilter, setProcessingStageFilter] = useState("");
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
            process_status: processingStageFilter
              ? processingStageFilter
              : null,
            start_date: persistedFromDate,
            end_date: persistedToDate,
          },
        }
      );

      const resData = response?.data?.data?.job_applicants;
      const totalPages = response?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formatted = resData.map((emp) => ({
        ...emp,
        full_name: `${emp?.first_name} ${
          emp?.middle_name ? emp?.middle_name : ""
        } ${emp?.last_name}`,
        job_title: emp?.job_opening?.job_title,
        application_date: moment(emp?.created_at).format("ddd, Do MMM. YYYY"),
        interview_scheduled_date: emp?.interview_date
          ? moment(emp?.interview_date).format("ddd, Do MMM. YYYY")
          : null,
        resume: emp?.old_cv_url ? emp?.old_cv_url : emp?.resume,
      }));

      setData(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Job Applicants Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, page, processingStageFilter, sizePerPage, toDate, searchTerm]);

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

  const getInterviewStatusColorClass = (value) => {
    const colorMap = {
      Open: "text-primary",
      "Scheduled for interview": "text-success",
      "Uninterested in Job": "text-secondary",
      "Not a graduate": "text-dark",
      "Not in job location": "text-muted",
      "Failed screening": "text-danger",
      "Internal Applicants": "text-info",
      "Interested in other roles": "text-info",
      "Already Called": "text-info",
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
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <div>
            {value?.toUpperCase()} <span>{row?.email}</span>
          </div>
        </h2>
      ),
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
      formatter: (value, row) => (
        <h2>{row.interview_scheduled_date || "Not Scheduled"}</h2>
      ),
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
      dataField: "resume",
      text: "Resume",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-primary"
          download
        >
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
          content={<JobApplicationContent jobApplication={viewRow} />}
        />
      )}

      {modalType === "schedule-interview" && (
        <ViewModal
          title="Schedule Interview"
          content={
            <ScheduleInterview
              jobApplication={selectedRow}
              handleUpdate={handleUpdate}
              setModalType={setModalType}
            />
          }
        />
      )}

      {modalType === "update-status" && (
        <JobApplicationSieveModal
          row={viewRow}
          fetchAllJobApplicants={fetchAllJobApplicants}
        />
      )}
    </>
  );
};

export default JobApplicants;
