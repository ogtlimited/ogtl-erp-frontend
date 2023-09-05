// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import UniversalTable from "../../../components/Tables/UniversalTable";
import moment from "moment";
import ViewModal from "../../../components/Modal/ViewModal";
import JobOpeningContent from "../../../components/ModalContents/JobOpeningContent";
import { JobOpeningForm } from "./../../../components/FormJSON/CreateJobOpening";
import { JobOpeningFormModal } from "../../../components/Modal/JobOpeningFormModal";

const JobOpeningContainer = () => {
  const { ErrorHandler, user } = useAppContext();
  const [jobOpenings, setJobOpenings] = useState([]);
  const [form, setForm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [mode, setMode] = useState("Create");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const fetchJobOpening = () => {
    axiosInstance
      .get(`/api/v1/job_openings.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        const data = res?.data?.data?.job_openings.map((e) => {
          return {
            ...e,
            branch: e?.operation_branch?.title,
            office_type: e?.operation_office?.office_type,
            office: e?.operation_office?.title,
            created_at: moment(e?.created_at).format("ddd. MMMM Do, YYYY"),
            start__date: moment(e?.start_date).format("ddd. MMMM Do, YYYY"),
            dead__line: moment(e?.dead_line).format("ddd. MMMM Do, YYYY"),
          };
        });

        setJobOpenings(data);
        console.log("Job opening:", data);
      })
      .catch((err) => {
        const component = "Job Openings:";
        ErrorHandler(err, component);
      });
  };

  useEffect(() => {
    fetchJobOpening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = () => {
    setMode("Create");
    setForm(JobOpeningForm);
  };

  const handleEdit = (row) => {
    setMode("Edit");
    setForm(row);
  };

  const columns = [
    {
      dataField: "job_title",
      text: "Job Title",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "branch",
      text: "Branch",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "office_type",
      text: "Office Type",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "start__date",
      text: "Start Date",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "dead__line",
      text: "Deadline",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "vacancy",
      text: "Vacancy",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "status_action",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
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
              href="#"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setModalType("view-details");
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {CurrentUserCanCreateAndEdit && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#JobOpeningFormModal"
                onClick={() => handleEdit(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Job Opening</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item">Recruitment</li>
              <li className="breadcrumb-item active">Job Openings</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#JobOpeningFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Add Job Opening
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalTable
          data={jobOpenings}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      {modalType === "view-details" ? (
        <ViewModal
          title="Job Opening Details"
          content={<JobOpeningContent Content={viewRow} />}
        />
      ) : (
        ""
      )}

      <JobOpeningFormModal
        mode={mode}
        data={form}
        fetchJobOpening={fetchJobOpening}
      />
    </>
  );
};

export default JobOpeningContainer;
