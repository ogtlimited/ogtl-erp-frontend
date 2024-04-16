// *IN USE

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import TeamAttendanceTable from "../../../components/Tables/EmployeeTables/TeamAttendanceTable";
import MonthlyTeamAttendanceTable from "../../../components/Tables/MonthlyTeamAttendanceTable";

const TeamAttendanceRecord = () => {
  const { ErrorHandler, getAvatarColor } = useAppContext();
  const [loadingOfficeType, setLoadingOfficeType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dailyAttendance, setDailyAttendance] = useState([]);
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);

  const [officeType, setOfficeType] = useState("");
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState({
    id: "",
    title: "",
    office_type: "",
  });

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // Daily Attendance:
  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");
  const [date, setDate] = useState(today_date);

  // Monthly Attendance:
  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
  const [dateColumns, setDateColumns] = useState([]);
  const [loadingMonthlyRecord, setLoadingMonthlyRecord] = useState(false);

  useEffect(() => {
    const allDates = Array.from(
      new Set(
        monthlyAttendance.reduce((acc, entry) => {
          entry.attendance.forEach((record) => {
            acc.push(record.date);
          });
          return acc;
        }, [])
      )
    );

    const dateColumns = allDates.map((date) => ({
      dataField: `attendance_${date}`,
      text: moment(date).format("DD-MMM-YYYY"),
      headerStyle: { width: "100%" },
      formatter: (cell, row) => {
        const attendanceRecord = row.attendance.find(
          (entry) => entry.date === date
        );

        return (
          <div>
            {attendanceRecord.status === "Present" ? (
              <>
                <span className="btn btn-gray btn-sm btn-rounded">
                  <i
                    className="fa fa-dot-circle-o text-info"
                    style={{ marginRight: "10px" }}
                  ></i>{" "}
                  {moment(attendanceRecord.clock_in, "HH:mm:ss").format(
                    "hh:mma"
                  )}
                </span>
                <span className="btn btn-gray btn-sm btn-rounded">
                  <i
                    className="fa fa-dot-circle-o text-success"
                    style={{ marginRight: "10px" }}
                  ></i>{" "}
                  {attendanceRecord.clock_out
                    ? moment(attendanceRecord.clock_out, "HH:mm:ss").format(
                        "hh:mma"
                      )
                    : "-"}
                </span>
              </>
            ) : (
              <span className="btn btn-gray btn-sm btn-rounded">
                <i
                  className={`fa fa-dot-circle-o ${
                    attendanceRecord.status === "Leave"
                      ? "text-success"
                      : attendanceRecord.status === "Day off"
                      ? "text-secondary"
                      : attendanceRecord.status === "---"
                      ? "text-muted"
                      : "text-danger"
                  }`}
                  style={{ marginRight: "10px" }}
                ></i>{" "}
                {attendanceRecord.status}
              </span>
            )}
          </div>
        );
      },
    }));

    setDateColumns(dateColumns);
  }, [monthlyAttendance]);

  // Fetch logged in user offices:
  const fetchLoggedInUserOffices = useCallback(async () => {
    setLoadingOfficeType(true);
    try {
      const response = await axiosInstance.get("/api/v1/leaders_offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.office_details;

      if (resData?.office_type === "campaign") {
        setOfficeType(resData?.office_type);

        const formattedOffice = resData?.offices.map((office) => ({
          label: office?.title?.toUpperCase(),
          value: office?.id,
        }));

        setOffices(formattedOffice);
      } else if (resData?.office_type === "department") {
        setOfficeType(resData?.office_type);
        setSelectedOffice({
          id: resData?.office?.id,
          title: resData?.office?.title,
          office_type: resData?.office_type,
        });
      } else {
        return null;
      }

      setLoadingOfficeType(false);
    } catch (error) {
      const component = "Staff Offices Error | ";
      ErrorHandler(error, component);
      setLoadingOfficeType(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchLoggedInUserOffices();
  }, [fetchLoggedInUserOffices]);

  // Team Attendance :
  const fetchEmployeeByOffice = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/api/v1/office_attendances.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            date: date,
            office_type: selectedOffice?.office_type
              ? selectedOffice?.office_type
              : null,
            office: selectedOffice?.id ? selectedOffice?.id : null,
            limit: 1000,
          },
        }
      );

      const resData =
        response?.data?.data?.result === "no record for date"
          ? []
          : response?.data?.data?.result.map((e) => ({
              ...e,
              date: moment(e?.date).format("ddd, Do MMM. YYYY"),
              formattedClockIn:
                e?.clock_in === "No Clock in"
                  ? e?.clock_in
                  : moment(e?.clock_in, "HH:mm:ss").format("hh:mma"),
              formattedClockOut:
                e?.clock_out === "No Clock out"
                  ? e?.clock_out
                  : moment(e?.clock_out, "HH:mm:ss").format("hh:mma"),
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
  }, [date, selectedOffice?.id, selectedOffice?.office_type]);

  useEffect(() => {
    fetchEmployeeByOffice();
  }, [fetchEmployeeByOffice]);

  // Monthly Attendance:
  const fetchMonthlyAttendance = useCallback(async () => {
    setLoadingMonthlyRecord(true);
    try {
      const response = await axiosInstance.get(
        "/api/v1/office_employees_attendances.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            office_type: officeType,
            office_id: selectedOffice?.id ? selectedOffice?.id : null,
            start_date: fromDate,
            end_date: toDate,
            page: page,
            limit: sizePerPage,
          },
        }
      );

      const attendanceRecords =
        typeof response?.data?.data === "string"
          ? []
          : response?.data?.data?.records;

      const recordPages =
        typeof response?.data?.data === "string"
          ? []
          : response?.data?.data?.pages;

      const dataArray = Object.keys(attendanceRecords).map((key) => ({
        days: attendanceRecords[key].days,
        user: attendanceRecords[key].user,
        total_hours: attendanceRecords[key].total_hours,
        lateness_and_absence: attendanceRecords[key].lateness_and_absence,
      }));

      // console.log("dataArray", dataArray);

      const formattedData = dataArray.map((data) => ({
        staffName: data?.user?.full_name,
        ogid: data?.user?.staff_unique_Id,
        email: data?.user?.email,
        total_hours: data?.total_hours,
        lateness:
          data?.lateness_and_absence?.lateness !== undefined
            ? data.lateness_and_absence.lateness
            : 0,
        NCNS:
          data?.lateness_and_absence?.NCNS !== undefined
            ? data.lateness_and_absence.NCNS
            : 0,
        absent:
          data?.lateness_and_absence?.NCNS !== undefined
            ? data?.lateness_and_absence?.["NCNS(did not clock out)"]
            : 0,

        attendance: Object.keys(data?.days).map((key) => ({
          date: key,
          clock_in: data?.days[key]?.clock_in
            ? data?.days[key]?.clock_in
            : null,
          clock_out: data?.days[key]?.clock_out
            ? data?.days[key]?.clock_out
            : null,
          status:
            data?.days[key] === "absent"
              ? "Absent"
              : data?.days[key] === "leave"
              ? "Leave"
              : data?.days[key] === "off"
              ? "Day off"
              : data?.days[key] === "---"
              ? "---"
              : "Present",
        })),
      }));

      // console.log("formatted", formattedData);

      setSizePerPage(sizePerPage);
      setTotalPages(recordPages);

      setMonthlyAttendance(formattedData);
      setLoadingMonthlyRecord(false);
    } catch (error) {
      const component = "Monthly Attendance | ";
      ErrorHandler(error, component);
      setLoadingMonthlyRecord(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, officeType, page, selectedOffice?.id, sizePerPage, toDate]);

  useEffect(() => {
    fetchMonthlyAttendance();
  }, [fetchMonthlyAttendance]);

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
      dataField: "formattedClockIn",
      text: "Clock In",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value) => {
        return value === "No Clock in" ? (
          <span className="text-danger">{value}</span>
        ) : (
          value
        );
      },
    },
    {
      dataField: "formattedClockOut",
      text: "Clock Out",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value) => {
        return value === "No Clock out" ? (
          <span className="text-danger">{value}</span>
        ) : (
          value
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

  const monthlyAttendanceColumns = [
    {
      dataField: "staffName",
      text: "Employee",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          {value?.toUpperCase()}
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "total_hours",
      text: "Total Hours",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "lateness",
      text: "Lateness",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "NCNS",
      text: "Absent",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "absent",
      text: "Absent(did not clock out)",
      sort: true,
      headerStyle: { width: "100%" },
    },
    ...dateColumns,
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Team Attendance Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Leadership</li>
              <li className="breadcrumb-item active">Team Attendance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_dailyAttendance"
                >
                  Daily Attendance
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_monthlyAttendance"
                >
                  Monthly Attendance
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_dailyAttendance" className="col-12 tab-pane show active">
            <TeamAttendanceTable
              columns={columns}
              data={dailyAttendance}
              loadingOfficeType={loadingOfficeType}
              loading={loading}
              setLoading={setLoading}
              date={date}
              setDate={setDate}
              officeType={officeType}
              offices={offices}
              selectedOffice={selectedOffice}
              setSelectedOffice={setSelectedOffice}
            />
          </div>

          <div id="tab_monthlyAttendance" className="col-12 tab-pane">
            <MonthlyTeamAttendanceTable
              columns={monthlyAttendanceColumns}
              data={monthlyAttendance}
              loadingOfficeType={loadingOfficeType}
              loading={loadingMonthlyRecord}
              setLoading={setLoadingMonthlyRecord}
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
              officeType={officeType}
              offices={offices}
              selectedOffice={selectedOffice}
              setSelectedOffice={setSelectedOffice}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamAttendanceRecord;
