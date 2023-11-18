/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import GeneralUpload from "../../../components/Modal/GeneralUpload";
import { AddAttendanceModal } from "../../../components/Modal/AddAttendanceModal";
import AdminAttendanceTable from "../../../components/Tables/EmployeeTables/AttendanceTable";

import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";

const AttendanceAdmin = () => {
  const [allAttendance, setallAttendance] = useState([]);
  const { combineRequest } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);
  const [departments, setdepartments] = useState([]);
  const [designation, setdesignation] = useState([]);
  const [projects, setprojects] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const { user } = useAppContext();

  const fetchedCombineRequest = useCallback(() => {
    combineRequest().then((res) => {
      setdepartments(res.data.createEmployeeFormSelection.departments);
      setdesignation(res.data.createEmployeeFormSelection.designations);
      setprojects(res.data.createEmployeeFormSelection.projects);
    });
  }, [combineRequest]);

  useEffect(() => {
    fetchedCombineRequest();
  }, [fetchedCombineRequest]);

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
      ),
    },

    {
      dataField: "attendance.shiftTypeId",
      text: "Shift",
      sort: true,
      headerStyle: { width: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    {
      dataField: "attendance.clockInTime",
      text: "Clock In",
      sort: true,
      headerStyle: { width: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    {
      dataField: "attendance.clockOutTime",
      text: "Clock Out",
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
  ];

  // "/api/attendance?startOfMonth=2021-09-01&endOfMonth=2021-09-31&departmentId=613a7d5b8f7b0734ccfa1f50"
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(
        "/api/attendance"
      )
      .then((e) => {
        const att = e.data.data;
        console.log("This attendance:", att);
        setallAttendance(att);
      });
      setLoading(false);
  }, []);

  const fetchAllAttendance = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/attendance");
      setallAttendance(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllAttendance();
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
           
            
            {user?.role?.hr?.create && (
              <>
                <a
                  href="#"
                  className="btn add-btn "
                  data-toggle="modal"
                  data-target="#AddAttendanceFormModal"
                >
                  <i className="fa fa-plus"></i> Add Attendance
                </a>

                <a
                  className="btn add-btn mx-3"
                  data-toggle="modal"
                  data-target="#uploadAttendance"
                  onClick={() => settoggleModal(true)}
                >
                 <i className="fa fa-cloud-upload"></i>
                 Upload Attendance
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <AdminAttendanceTable
            data={allAttendance}
            defaultSorted={defaultSorted}
            selectedOption={selectedOption}
            columns={columns}
            designation={designation}
            departments={departments}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>

      {toggleModal && (
        <GeneralUpload
          settoggleModal={settoggleModal}
          title="Upload Attendance"
          url="/api/attendance/bulk"
          setUploadSuccess={setUploadSuccess}
        />
      )}

      <AddAttendanceModal fetchAllAttendance={fetchAllAttendance} />
    </>
  );
};

export default AttendanceAdmin;
