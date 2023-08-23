//* IN USE

import React, { useState, useEffect, useCallback } from "react";
import UniversalTable from "./../../../components/Tables/UniversalTable";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";
import axiosInstance from "../../../services/api";

const EmployeeAttendance = () => {
  const { ErrorHandler } = useAppContext();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState([]);

  const [fromDate, setFromDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

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
          : records.map((e, index) => {
              return {
                ...e,
                idx: index + 1,
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

  useEffect(() => {
    fetchEmployeeAttendance();
  }, [fetchEmployeeAttendance]);

  const columns = [
    {
      dataField: "idx",
      text: "S/N",
      sort: true,
      headerStyle: { width: "5%" },
    },
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
    },
    {
      dataField: "clock_out",
      text: "Clock Out",
      sort: true,
      headerStyle: { width: "15%" },
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

      <div className="hr-filter-select col-12" style={{ marginLeft: "-30px" }}>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="fromDate">From</label>
            <input
              type="date"
              name="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-control "
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="toDate">To</label>
            <input
              type="date"
              name="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-control "
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12" />
        <UniversalTable
          data={attendance}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          emptyDataMessage="No Attendance Record Found"
        />
      </div>
    </>
  );
};
export default EmployeeAttendance;
