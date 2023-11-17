import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeAttendanceRecordTable from "../../../components/Tables/EmployeeTables/EmployeeAttendanceRecordTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";
import AttendanceChart from "../../../components/charts/attendance-tardiness";

const EmployeeAttendanceRecordAdmin = () => {
  const { ErrorHandler } = useAppContext();
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [employeeTardiness, setEmployeeTardiness] = useState([]);
  const [loading, setLoading] = useState(false);
  const { employee } = useParams();
  const { id } = useParams();

  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
  const [today, setToday] = useState(null);

  useEffect(() => {
    const time = new Date().toDateString();
    const today_date = moment(time).format("yyyy-MM-DD");
    setToday(today_date);
  }, []);

  // Fetch Employee Attendance Records:
  const fetchEmployeeAttendanceRecords = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/v1/employee_attendances/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            start_date: fromDate,
            end_date: toDate,
            limit: 400,
          },
        }
      );

      const resData =
        response?.data?.data?.result === "no record for date range"
          ? []
          : response?.data?.data?.result.map((e) => ({
              ...e,
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

      setEmployeeAttendance(resData);
      setLoading(false);
    } catch (error) {
      const component = "Employee Attendance:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, id, toDate]);

  // Fetch Employee Weekly Attendance Tardiness:
  const fetchEmployeeAttendanceTardiness = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        // `/api/v1/attendance_tardiness/${id}.json`,
        `/api/v1/attendance_tardiness/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.result;

      function formatDataKeys(data) {
        const formattedData = {};
        for (const day in data) {
          const formattedDay = {};
          for (const key in data[day]) {
            const formattedKey = key.replace(/_/g, " ");
            formattedDay[
              formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)
            ] = data[day][key];
          }
          formattedData[day] = formattedDay;
        }
        return formattedData;
      }

      const formattedData = formatDataKeys(resData);

      setEmployeeTardiness(formattedData);

      setLoading(false);
    } catch (error) {
      const component = "Weekly Attendance Record | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchEmployeeAttendanceRecords();
    fetchEmployeeAttendanceTardiness();
  }, [fetchEmployeeAttendanceRecords, fetchEmployeeAttendanceTardiness]);

  const columns = [
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "clock_in",
      text: "Clock In",
      sort: true,
      headerStyle: { minWidth: "150px" },
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
      headerStyle: { minWidth: "100px" },
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
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{employee}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={`/dashboard/user/profile/${id}`}>Employee</Link>
              </li>
              <li className="breadcrumb-item active">Attendance Record</li>
            </ul>
          </div>
        </div>
      </div>

      <AttendanceChart data={employeeTardiness} />

      <div className="custom-table-div">
        <EmployeeAttendanceRecordTable
          data={employeeAttendance}
          setData={setEmployeeAttendance}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          fromDate={fromDate}
          toDate={toDate}
          today={today}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </div>
    </>
  );
};

export default EmployeeAttendanceRecordAdmin;
