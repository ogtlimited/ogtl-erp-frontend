//* IN USE

import React, { useState, useEffect, useCallback } from "react";
import EmployeeAttendanceRecordTable from "../../../components/Tables/EmployeeTables/EmployeeAttendanceRecordTable";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";
import axiosInstance from "../../../services/api";
import AttendanceChart from "../../../components/charts/attendance-tardiness";

const EmployeeAttendance = () => {
  const { ErrorHandler, user } = useAppContext();
  const [attendance, setAttendance] = useState([]);
  const [employeeTardiness, setEmployeeTardiness] = useState([]);
  const [loading, setLoading] = useState([]);

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

  const id = user?.employee_info?.ogid;

  // Get Employee Attendance:
  const fetchEmployeeAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/v1/staff_attendances.json?start_date=${fromDate}&end_date=${toDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const records = response?.data?.data?.attendances;

      const resData =
        typeof records === "string"
          ? []
          : records.map((e) => {
              return {
                ...e,
                date: moment(e?.date).format("ddd. MMMM Do, YYYY"),
              };
            });

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

      setAttendance(resData);
      setLoading(false);
    } catch (error) {
      ErrorHandler(error, "Attendance Error:");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

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
      console.log("Attendance tardiness:", formattedData);

      setLoading(false);
    } catch (error) {
      const component = "Weekly Attendance Tardiness:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchEmployeeAttendance();
    fetchEmployeeAttendanceTardiness();
  }, [fetchEmployeeAttendance, fetchEmployeeAttendanceTardiness]);

  const columns = [
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { width: "40%" },
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
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Attendance Record</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Employee</li>
              <li className="breadcrumb-item active">Attendance</li>
            </ul>
          </div>
        </div>
      </div>

      <AttendanceChart data={employeeTardiness} />

      <div className="custom-table-div">
        <EmployeeAttendanceRecordTable
          data={attendance}
          setData={setAttendance}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          fromDate={fromDate}
          toDate={toDate}
          today={today}
          setFromDate={setFromDate}
          setToDate={setToDate}
          emptyDataMessage="No Attendance Record Found"
        />
      </div>
    </>
  );
};
export default EmployeeAttendance;
