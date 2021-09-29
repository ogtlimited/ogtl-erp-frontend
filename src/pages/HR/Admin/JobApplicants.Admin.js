/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { ApproverBtn } from "../../../components/ApproverBtn";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

const JobApplicants = () => {
  const [data, setData] = useState([]);
  const { showAlert } = useAppContext();
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchJobApplicants = () => {
    axiosInstance
      .get("/api/jobApplicant")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJobApplicants();
  }, []);

  //delete job opening
  const deleteJobApplicant = (row) => {
    axiosInstance
      .delete(`/api/jobApplicant/${row._id}`)
      .then((res) => {
        console.log(res);
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
  useEffect(() => {
    if (status.length) {
      console.log(status);
      console.log(statusRow);
      const update = {
        ...statusRow,
        status: status,
        job_opening_id: statusRow.job_opening_id._id,
      };
      delete update.__v;
      axiosInstance
        .patch("/api/jobApplicant/" + statusRow._id, update)
        .then((res) => {
          console.log(res);
          fetchJobApplicants();
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
  }, [status, statusRow]);

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
      dataField: "status",
      text: "Status",
      sort: true,

      formatter: (value, row) => (
        <>
          <ApproverBtn
            setstatusRow={setstatusRow}
            setStatus={setStatus}
            value={value}
            row={row}
          />
        </>
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
      formatter: (value, row) => <h2>{row?.job_opening_id?.job_title}</h2>,
    },
    {
      dataField: "application_source",
      text: "Application Source",
      sort: true,
    },
    {
      dataField: "resume_attachment",
      text: "Resume Attachment",
      sort: true,
      formatter: (value, row) => (
        <a href="#" class="btn btn-sm btn-primary">
          <i class="fa fa-download"></i> Download
        </a>
      ),
    },
    {
      dataField: "cover_letter",
      text: "Cover Letter",
      sort: true,
      formatter: (value, row) => <span> {value.slice(0, 30)}...</span>,
    },
    {
      dataField: "video_attachment",
      text: "Video Attachment",
      sort: true,
      formatter: (value, row) =>
        value ? (
          <a href="#" class="btn btn-sm btn-primary">
            <i class="fa fa-download"></i> Download
          </a>
        ) : (
          ""
        ),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "70px", textAlign: "left" },
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
            <Link
              className="dropdown-item"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </Link>
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
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      <ConfirmModal
        title="Job Applicant"
        selectedRow={selectedRow}
        deleteFunction={deleteJobApplicant}
      />
    </>
  );
};

export default JobApplicants;
