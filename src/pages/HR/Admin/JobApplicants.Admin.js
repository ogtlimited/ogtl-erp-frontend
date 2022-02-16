/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import Select from "react-select";
import helper from "../../../services/helper";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";
import {
  InterviewProcessStageOptions,
  InterviewStatusOptions,
} from "../../../constants";
import ViewModal from "../../../components/Modal/ViewModal";
import JobApplicationContent from "../../../components/ModalContents/JobApplicationContent";
import ScheduleInterview from "../../../components/ModalContents/ScheduleInterview";

const jobOpts = [
  {
    label: "Rejected",
    value: "Rejected",
  },
  {
    label: "Accepted",
    value: "Accepted",
  },
  {
    label: "Open",
    value: "Open",
  },
];

const JobApplicants = () => {
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();
  const [statusRow, setstatusRow] = useState(null);
  const [processingStageRow, setprocessingStageRow] = useState(null);
  const [interview_status, setInterviewStatus] = useState("");
  const [process_stage, setprocessingStage] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [modalType, setmodalType] = useState("schedule-interview");
  const fetchJobApplicants = () => {
    axiosInstance
      .get("/api/jobApplicant")
      .then((res) => {
        setData(res.data.data);
        setunfiltered(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJobApplicants();
  }, []);
  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setData(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.status));

      setData(filt);
    }
  };
  //delete job opening
  const deleteJobApplicant = (row) => {
    axiosInstance
      .delete(`/api/jobApplicant/${row._id}`)
      .then((res) => {
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };
  //update jobOpening
  const handleUpdate = useCallback((id, update) => {
    axiosInstance
      .patch("/api/jobApplicant/" + id, update)
      .then((res) => {
        fetchJobApplicants();
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  }, []);
  useEffect(() => {
    if (interview_status.length) {
      const update = {
        interview_status,
        _id: statusRow?._id,
      };
      handleUpdate(statusRow._id, update);
    }
  }, [interview_status, statusRow, handleUpdate]);

  useEffect(() => {
    if (process_stage.length) {
      const update = {
        process_stage,
        _id: processingStageRow?._id,
      };
      handleUpdate(processingStageRow._id, update);
    }
  }, [process_stage, processingStageRow, handleUpdate]);

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
                  setSelectedRow(helper.handleEdit(row));
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
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Job Applicants List</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="col-3 mb-2">
            <Select
              defaultValue={[]}
              onChange={handleClick}
              options={jobOpts}
              placeholder="Filter Job Applicants"
              isClearable={true}
              style={{ display: "inline-block" }}
              // formatGroupLabel={formatGroupLabel}
            />
          </div>
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      <ConfirmModal
        title="Job Applicant"
        selectedRow={selectedRow}
        deleteFunction={deleteJobApplicant}
      />
      {modalType === "view-details" ? (
        <ViewModal
          title="Applicant Details"
          content={<JobApplicationContent jobApplication={selectedRow} />}
        />
      ) : (
        <ViewModal
          title="Schedule Interview"
          content={
            <ScheduleInterview
              handleUpdate={handleUpdate}
              jobApplication={selectedRow}
            />
          }
        />
      )}
    </>
  );
};

export default JobApplicants;
