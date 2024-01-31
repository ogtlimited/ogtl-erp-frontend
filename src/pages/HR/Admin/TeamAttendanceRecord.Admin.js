// *IN USE

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import DailyAttendanceTable from "../../../components/Tables/EmployeeTables/DailyAttendanceTable";
import MonthlyAttendanceTable from "../../../components/Tables/MonthlyAttendanceTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";

const TeamAttendanceRecord = () => {
  const { ErrorHandler, getAvatarColor } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [dailyAttendance, setDailyAttendance] = useState([]);

  const [officeType, setOfficeType] = useState("");
  const [offices, setOffices] = useState([]);
  const [officeId, setOfficeId] = useState({
    id: "",
    title: "",
  });

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // Daily Attendance Summary:
  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");
  const [date, setDate] = useState(today_date);

  // Fetch logged in user offices:
  const fetchLoggedInUserOffices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/v1/leaders_offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.office_details;
      setOfficeType(
        resData?.office_type.replace(/\b\w/g, (char) => char.toUpperCase())
      );

      const formattedOffice = resData?.offices.map((office) => ({
        label: office?.title?.toUpperCase(),
        value: office?.id,
      }));

      setOffices(formattedOffice);
      setLoading(false);
    } catch (error) {
      const component = "Staff Offices Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // Team Attendance :
  const fetchTeamAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/v1/daily_attendance.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            date: date,
            limit: 400,
          },
        }
      );
      const resData =
        response?.data?.data?.info === "no record for date"
          ? []
          : response?.data?.data?.info.map((e, index) => ({
              ...e,
              idx: index + 1,
              date: moment(e?.date).format("ddd, Do MMM. YYYY"),
            }));

      resData.forEach((attendance) => {
        const clockIn = new Date(`2000-01-01 ${attendance.clock_in}`);
        if (attendance.clock_out !== "No Clock out") {
          const clockOut = new Date(`2000-01-01 ${attendance.clock_out}`);
          const workHours = (clockOut - clockIn) / 1000 / 3600;

          const hours = Math.floor(workHours);
          const minutes = Math.round((workHours - hours) * 60);

          attendance.work_hours = `${hours}h ${minutes}m`;

          if (workHours < 0) {
            attendance.work_hours = `-`;
          }
        } else {
          attendance.work_hours = "No Clock out";
        }
      });

      setDailyAttendance(resData);
      setLoading(false);
    } catch (error) {
      const component = "Team Attendance | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    fetchLoggedInUserOffices();
  }, [fetchLoggedInUserOffices]);

  const columns = [
    {
      dataField: "full_name",
      text: "Employee",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link
            to={`/dashboard/hr/office/employee-attendance/${row?.full_name}/${row?.ogid}`}
          >
            {value?.toUpperCase()}
          </Link>
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "10%" },
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "clock_in",
      text: "Clock In",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value) => {
        return value === "No Clock in" ? (
          <span className="text-danger">{value}</span>
        ) : (
          moment(value, "HH:mm:ss").format("hh:mma")
        );
      },
    },
    {
      dataField: "clock_out",
      text: "Clock Out",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value) => {
        return value === "No Clock out" ? (
          <span className="text-danger">{value}</span>
        ) : (
          moment(value, "HH:mm:ss").format("hh:mma")
        );
      },
    },
    {
      dataField: "work_hours",
      text: "Work Hours",
      sort: true,
      headerStyle: { width: "15%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Team Attendance Record</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Leadership</li>
              <li className="breadcrumb-item active">Team Attendance</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div className="col-12">
            <DailyAttendanceTable
              columns={columns}
              data={dailyAttendance}
              loading={loading}
              setLoading={setLoading}
              date={date}
              setDate={setDate}
              officeType={officeType}
              offices={offices}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamAttendanceRecord;
