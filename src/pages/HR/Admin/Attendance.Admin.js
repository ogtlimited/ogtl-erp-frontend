import React, {useEffect, useState, useCallback} from "react";
import { Link } from "react-router-dom";import AttendanceTable from "../../../components/attendance/attendance-table";
import AdminAttendanceTable from "../../../components/Tables/EmployeeTables/AttendanceTable";

import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";

const AttendanceAdmin = () => {
  const [allAttendance, setallAttendance] = useState([])
  const {combineRequest} = useAppContext()
  const [selectedOption, setSelectedOption] = useState([]);
  const [departments, setdepartments] = useState([])
  const [designation, setdesignation] = useState([])
  const [projects, setprojects] = useState([])
  
  const fetchedCombineRequest = useCallback(() => {
    combineRequest().then((res) => {
      console.log(res);
    setdepartments(res.data.createEmployeeFormSelection.departments)
    setdesignation(res.data.createEmployeeFormSelection.designations)
    setprojects(res.data.createEmployeeFormSelection.projects)
    });
  }, [departments, designation, , combineRequest]);

  useEffect(() => {
    fetchedCombineRequest();
  }, []);

  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];
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
  useEffect(() => {
   axiosInstance.get('/api/attendance?startOfMonth=2021-09-01&endOfMonth=2021-09-31&departmentId=613a7d5b8f7b0734ccfa1f50').then(e =>{
     console.log(e)
   })
  }, [])

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Attendance</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Attendance</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <AdminAttendanceTable data={departments} defaultSorted={defaultSorted}
        selectedOption={selectedOption} columns={columns} designation={designation} departments={departments} />
          </div>
      </div>
    </>
  );
};

export default AttendanceAdmin;
