/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../../services/api";

const Shadowing = () => {
  const [data, setData] = useState([]);

  const fetchAllShadowing = () => {
    axiosInstance
      .get("/api/test", {
        params: { interview_status: "Qualify for Coaching/Shadowing" },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllShadowing();
  }, []);

  const columns = [
    {
      dataField: "job_applicant_id",
      text: "Applicant",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2>
          {row?.job_applicant_id?.first_name}{" "}
          {row?.job_applicant_id?.middle_name}{" "}
          {row?.job_applicant_id?.last_name}
        </h2>
      ),
    },

    {
      dataField: "interviewer",
      text: "Interviewer",
      sort: true,
    },

    {
      dataField: "interview_status",
      text: "Interview Status",
      sort: true,
    },
    {
      dataField: "job_opening_id",
      text: "Interview Status",
      sort: true,
      formatter: (value, row) => (
        <h2>{row?.job_applicant_id?.job_opening_id?.job_title}</h2>
      ),
    },
    {
      dataField: "createdAt",
      text: "Date created",
      sort: true,
      formatter: (value, row) => <h2>{moment(row?.createdAt).format("L")}</h2>,
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Shadowing List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Shadowing List</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LeavesTable data={data} columns={columns} context="interview" />
        </div>
      </div>
    </>
  );
};

export default Shadowing;
