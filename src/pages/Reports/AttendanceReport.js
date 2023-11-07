/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { textFilter, selectFilter } from "react-bootstrap-table2-filter";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from "../../db/attendace-report.json";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import moment from "moment";
const AttendanceReport = () => {
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [depts, setdepts] = useState([]);
  const [attendance, setattendance] = useState([]);
  const [campaign, setcampaign] = useState([]);
  const [query, setquery] = useState(null);
  const [queryType, setqueryType] = useState("departmentId");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {}, [attendance]);
  const empOpts = Object.assign(
    {},
    data.map((e) => e.employee_name)
  );
  const monthOptions = Object.assign({}, monthNames);
  const getHour = (e) => {
    let hour = e.split(":")[0];
    return parseInt(hour);
  };
  const d = new Date();
  const columns = [
    {
      dataField: "first_name",
      text: "Employee name",
      headerStyle: { width: "450px" },
      // filter:  selectFilter({
      //   options: empOpts
      // }),
      formatter: (value, row) => (
        <span>
          {row.first_name} {row.last_name}
        </span>
      ),
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "attendance.total_hours",
      text: "Total Hours",
      sort: true,
      headerStyle: { minWidth: "100px" },
      //   formatter: (value, row) =>(
      //     <span>{getHour(row.clock_out) - getHour(row.clock_in) }</span>
      // )
    },
    {
      dataField: "attendance.month",
      text: "Month",
      sort: true,
      headerStyle: { minWidth: "200px" },
      filter: selectFilter({
        options: monthOptions,
      }),
    },
    {
      dataField: "attendance.year",
      text: "Year",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
  ];
  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <h3 className="page-title">Attendance Reports</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Attendance Reports</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={attendance} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default AttendanceReport;
