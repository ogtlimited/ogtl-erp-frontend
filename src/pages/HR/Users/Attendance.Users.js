import React from "react";
import Activity from "../../../components/attendance/activity";
import AttendanceTable from "../../../components/attendance/attendance-table";
import Stats from "../../../components/attendance/stats";
import Timesheet from "../../../components/attendance/timesheet";
import PageHeader from "../../../components/Misc/PageHeader";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import GeneralTable from "../../../components/Tables/Table";
import { useAppContext } from "../../../Context/AppContext";
import attendance from "../../../db/attendance.json";

const EmployeeAttendance = () => {
  const { employeeAttendance } = useAppContext();
  console.log(employeeAttendance);
  const columns = [
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
      headerStyle: { minWidth: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
      formatter: (val, row) => <p>{new Date(val).toLocaleDateString()}</p>,
    },
    {
      dataField: "clockInTime",
      text: "Punch In",
      sort: true,
      headerStyle: { minWidth: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
      formatter: (val, row) => <p>{new Date(val).toLocaleTimeString()}</p>,
    },
    {
      dataField: "clockOutTime",
      text: "Punch Out",
      sort: true,
      headerStyle: { width: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
      formatter: (val, row) => (
        <p>{val && new Date(val).toLocaleTimeString()}</p>
      ),
    },
    {
      dataField: "hoursWorked",
      text: "Total Hours",
      sort: true,
      headerStyle: { width: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    {
      dataField: "break",
      text: "Break",
      sort: true,
      headerStyle: { minWidth: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "16px",
      },
    },
    // {
    //   dataField: "over_time",
    //   text: "Overtime",
    //   headerStyle: { minWidth: "100px" },
    //   sort: true,
    //   style: {
    //     fontSize: "12px",
    //     lineHeight: "16px",
    //   },
    //},
  ];
  const breadcrumb = "Attendance";
  return (
    <>
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Employee</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Employees</li>
            </ul>
          </div>
          </div>
      </div>
      <div class="row">
        <Timesheet />
        <Stats />
        <Activity />
      </div>
      <div class="row">
        <div className="col-lg-12" />
        <LeavesTable data={employeeAttendance} columns={columns} />
      </div>
    </>
  );
};
export default EmployeeAttendance;
