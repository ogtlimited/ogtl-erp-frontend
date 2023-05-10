/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddSupervisorAttendanceModal } from "../../../components/Modal/AddSupervisorAttendanceModal";
import SupervisorAttendanceTable from "../../../components/Tables/EmployeeTables/SupervisorAttendanceTable";

import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import moment from "moment";

const SupervisorAttendanceAdmin = () => {
  const [allAttendance, setallAttendance] = useState([]);
  const [allSubordinates, setAllSubordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAppContext();
	const [today, setToday] = useState(null);

  useEffect(() => {
		const time = new Date().toDateString();
		const today_date = moment(time).format("yyyy-MM-DD");
		setToday(today_date);
	}, []);

  const fetchAllSubordinates = () => {
    axiosInstance
      .get('/leads/subordinates', {
        params: {
          limit: 1000,
        },
      })
      .then((e) => {
        let resData = e?.data?.data?.employees;

        const mapp = resData.map((emp) => {
          return {
            label:
              emp.first_name + ' ' + emp.middle_name+ ' ' + emp?.last_name,
            value: emp.ogid,
          };
        });

        setAllSubordinates(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchAllAttendance = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/attendance");
      console.log("This is the attendance", res.data.data);
      setallAttendance(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllSubordinates();
    fetchAllAttendance();
  }, [])
  
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
  ];

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Manual Clock In/Out for Subordinates</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leadership</li>
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
                  <i className="fa fa-plus"></i> Manual Clock In/Out
                </a>
              </>
            )}
          </div>
        </div>
      </div>
       
      <div className="row">
        <div className="col-lg-12">
          <SupervisorAttendanceTable
            data={allAttendance}
            columns={columns}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>

      <AddSupervisorAttendanceModal 
        fetchAllAttendance={fetchAllAttendance} 
        allSubordinates={allSubordinates} 
        today={today}
      />
    </>
  );
};

export default SupervisorAttendanceAdmin;
