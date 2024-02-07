// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobApplicantsAdminRolesTable from "./JobApplicantsAdminRolesTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { JobApplicationSieveModalAdmin } from "../../../components/Modal/JobApplicationSieveModalAdmin";
import helper from "../../../services/helper";
import ViewModal from "../../../components/Modal/ViewModal";
import JobApplicationContent from "../../../components/ModalContents/JobApplicationContent";
import ScheduleInterview from "../../../components/ModalContents/ScheduleInterview";
import moment from "moment";
import secureLocalStorage from "react-secure-storage";
import UniversalPaginatedTable from "./../../../components/Tables/UniversalPaginatedTable";
import JobSieversViewAdmin from "./JobSieversView.Admin";

const JobApplicantsAdmin = () => {
  const {
    showAlert,
    user,
    ErrorHandler,
    goToTop,
    selectJobOpenings,
    getAvatarColor,
    fetchAllJobApplicationISandIPS,
  } = useAppContext();
  const [allInactiveRepSievers, setAllInactiveRepSievers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const [modalType, setModalType] = useState("schedule-interview");
  const [loading, setLoading] = useState(false);
  const [loadingRep, setLoadingRep] = useState(false);
  const [loadingActivate, setLoadingActivate] = useState(false);

  const [isJobSieverActivated, setIsJobSieverActivated] = useState(false);
  const [isJobSieverDeactivated, setIsJobSieverDeactivated] = useState(false);

  const [repPage, setRepPage] = useState(1);
  const [repSizePerPage, setRepSizePerPage] = useState(10);
  const [repTotalPages, setRepTotalPages] = useState("");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [jobOpeningFilter, setJobOpeningFilter] = useState("");
  const [processingStageFilter, setProcessingStageFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);

  const canEdit = ["hr_manager", "senior_hr_associate"];
  const CurrentUserRoles = user?.employee_info?.roles;

  const CurrentUserCanEdit = CurrentUserRoles.some((role) =>
    canEdit.includes(role)
  );

  useEffect(() => {
    fetchAllJobApplicationISandIPS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inactive Rep Sievers:
  const fetchAllInactiveRepSievers = useCallback(async () => {
    setLoadingRep(true);
    try {
      const response = await axiosInstance.get(
        "/api/v1/job_applications_sievers.json?active=false",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: repPage,
            limit: repSizePerPage,
          },
        }
      );

      const resData = response?.data?.data?.job_application_sievers;
      const totalPages = response?.data?.data?.total_pages;

      setRepSizePerPage(repSizePerPage);
      setRepTotalPages(totalPages);

      setAllInactiveRepSievers(resData);
      setLoadingRep(false);
    } catch (error) {
      const component = "All Inactive Rep Sievers:";
      ErrorHandler(error, component);
      setLoadingRep(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repPage, repSizePerPage]);

  useEffect(() => {
    if (isJobSieverDeactivated) {
      fetchAllInactiveRepSievers();
    }

    setIsJobSieverDeactivated(false);
  }, [fetchAllInactiveRepSievers, isJobSieverDeactivated]);

  useEffect(() => {
    fetchAllInactiveRepSievers();
  }, [fetchAllInactiveRepSievers]);

  // Job Applications:
  const fetchAllJobApplicants = useCallback(async () => {
    const persistedFromDate = secureLocalStorage.getItem("fromDate");
    const persistedToDate = secureLocalStorage.getItem("toDate");

    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/job_applicants.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
          name: searchTerm.length ? searchTerm : null,
          job_opening_id: jobOpeningFilter.length ? jobOpeningFilter : null,
          process_status: processingStageFilter ? processingStageFilter : null,
          start_date: persistedFromDate,
          end_date: persistedToDate,
        },
      });

      const resData = response?.data?.data?.job_applicants;
      const totalPages = response?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formatted = resData.map((emp) => ({
        ...emp,
        full_name: `${emp?.first_name} ${emp?.middle_name ?? ""} ${
          emp?.last_name
        }`,
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
      const component = "Job Applicants Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fromDate,
    toDate,
    page,
    sizePerPage,
    searchTerm,
    jobOpeningFilter,
    processingStageFilter,
  ]);

  useEffect(() => {
    fetchAllJobApplicants();
  }, [fetchAllJobApplicants]);

  //update jobOpening
  const handleUpdate = useCallback(
    (id, update) => {
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

  //Reactivate Job Siever
  const handleReactivateJobSiever = async (row) => {
    const fullName = row?.full_name;
    const userId = row?.ogid;

    setLoadingActivate(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/reactivate_rep_sievers/${userId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        fullName + ` has been reactivated as a job siever`,
        "alert alert-success"
      );

      fetchAllInactiveRepSievers();
      setIsJobSieverActivated(true);
      setLoadingActivate(false);
      goToTop();
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoadingActivate(false);
      goToTop();
    }
  };

  // Interview Status Function:
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

  // Process Status Function:
  const getProcessStatusColorClass = (value) => {
    const colorMap = {
      Open: "text-primary",
      Sieving: "text-warning",
      "Phone screening": "text-info",
      "Interview scheduled": "text-success",
    };

    return colorMap[value] || "text-secondary";
  };

  const repColumns = [
    {
      dataField: "full_name",
      text: "Employee",
      sort: true,
      headerStyle: { width: "60%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link
            to={`/dashboard/recruitment/rep-siever/${row.full_name}/${row.ogid}`}
          >
            {value} <span>{row?.ogid}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "assigned_records",
      text: "Assigned Records",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (val, row) => <span>{val}</span>,
    },
    CurrentUserCanEdit && {
      dataField: "",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <div className="leave-user-action-btns">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  handleReactivateJobSiever(row);
                }}
              >
                {loadingActivate ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Reactivate"
                )}
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Job Application Column:
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
      dataField: "rep_siever",
      text: "Job Siever",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <div>{value?.toUpperCase()}</div>
        </h2>
      ),
    },
    {
      dataField: "resume",
      text: "Resume Attachment",
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
              <li className="breadcrumb-item active">Job Applications</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-menu" style={{ marginBottom: "20px" }}>
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_job-applications"
                >
                  Job Applications
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_rep-sievers"
                >
                  Active Job Sievers
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_inactive-rep-sievers"
                >
                  Deactivated Job Sievers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row tab-content">
        <div id="tab_job-applications" className="col-12 tab-pane show active">
          <JobApplicantsAdminRolesTable
            columns={columns}
            data={data}
            setData={setData}
            loading={loading}
            setLoading={setLoading}
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
            jobOpenings={selectJobOpenings}
            jobOpeningFilter={jobOpeningFilter}
            setJobOpeningFilter={setJobOpeningFilter}
            processingStageFilter={processingStageFilter}
            setProcessingStageFilter={setProcessingStageFilter}
          />
        </div>

        <div id="tab_rep-sievers" className="col-12 tab-pane">
          <JobSieversViewAdmin
            isJobSieverDeactivated={isJobSieverDeactivated}
            setIsJobSieverDeactivated={setIsJobSieverDeactivated}
            isJobSieverActivated={isJobSieverActivated}
            setIsJobSieverActivated={setIsJobSieverActivated}
          />
        </div>

        <div id="tab_inactive-rep-sievers" className="col-12 tab-pane">
          <UniversalPaginatedTable
            columns={repColumns}
            data={allInactiveRepSievers}
            setData={setAllInactiveRepSievers}
            loading={loadingRep}
            setLoading={setLoadingRep}
            page={repPage}
            setPage={setRepPage}
            sizePerPage={repSizePerPage}
            setSizePerPage={setRepSizePerPage}
            totalPages={repTotalPages}
            setTotalPages={setRepTotalPages}
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
        <JobApplicationSieveModalAdmin
          row={viewRow}
          fetchAllJobApplicants={fetchAllJobApplicants}
        />
      )}
    </>
  );
};

export default JobApplicantsAdmin;
