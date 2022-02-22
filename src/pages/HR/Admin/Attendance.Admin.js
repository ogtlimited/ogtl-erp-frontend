import React, {useEffect, useState, useCallback} from "react";
import { Link } from "react-router-dom";import AttendanceTable from "../../../components/attendance/attendance-table";
import GeneralUpload from "../../../components/Modal/GeneralUpload";
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
  const [toggleModal, settoggleModal] = useState(false);
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
      dataField: "",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <Link to={`/admin/profile-dashboard/${row._id}`}>
            {row.first_name} {row.last_name}{" "}
            <span>{row?.designation?.designation}</span>
          </Link>
        </h2>
      )
    },

    {
      dataField: "attendance.daysWorked",
      text: "Total Days",
      sort: true,
      headerStyle: { width: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    {
      dataField: "attendance.total_hours",
      text: "Total Hours",
      sort: true,
      headerStyle: { width: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    {
      dataField: "attendance.total_minutes",
      text: "Total Minutes",
      sort: true,
      headerStyle: { width: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "100px" },
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
     const att = e.data.data
     setallAttendance(att)
   })
  }, [])

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Attendance</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Attendance</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#uploadAttendance"
              onClick={() => settoggleModal(true)}
            >
              Upload Attendance
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <AdminAttendanceTable data={allAttendance} defaultSorted={defaultSorted}
        selectedOption={selectedOption} columns={columns} designation={designation} departments={departments} />
          </div>
      </div>
      
      {toggleModal && (
        <GeneralUpload settoggleModal={settoggleModal}
        title="Upload Attendance"
        url="/api/attendance/bulk"
        />
      )}
    </>
  );
};

export default AttendanceAdmin;
