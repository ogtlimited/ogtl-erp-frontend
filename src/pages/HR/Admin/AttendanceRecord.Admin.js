// *IN USE

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import DailyAttendanceTable from "../../../components/Tables/EmployeeTables/DailyAttendanceTable";
import MonthlyAttendanceTable from "../../../components/Tables/MonthlyAttendanceTable";
import AttendanceAverageAdmin from "./AttendanceAverage.Admin";
import axiosInstance from "../../../services/api";
import moment from "moment";
import VictoryDougnutChart from "../../../components/charts/VictoryDougnutChart";

const AttendanceRecord = () => {
  const { ErrorHandler, getAvatarColor } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [loadingMonthlyRecord, setLoadingMonthlyRecord] = useState(false);
  const [dailyAttendanceSummary, setDailyAttendanceSummary] = useState([]);
  const [dailyAttendance, setDailyAttendance] = useState([]);
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [dateColumns, setDateColumns] = useState([]);

  const [page, setPage] = useState(1);
  const [clockin, setClockin] = useState(0);
  const [clockn, setClockn] = useState(0);

  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [CampaignPage, setCampaignPage] = useState(1);
  const [CampaignSizePerPage, setCampaignSizePerPage] = useState(10);
  const [totalCampaignPages, setTotalCampaignPages] = useState("");

  const [DepartmentPage, setDepartmentPage] = useState(1);
  const [DepartmentSizePerPage, setDepartmentSizePerPage] = useState(10);
  const [totalDepartmentPages, setTotalDepartmentPages] = useState("");

  // Daily Attendance Summary:
  const today_date = moment().utc().format("yyyy-MM-DD");
  const [date, setDate] = useState(today_date);

  // Monthly Attendance:
  const firstDay = moment().startOf("month").utc().format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").utc().format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
  const [officeType, setOfficeType] = useState("");
  const [selectedOffice, setSelectedOffice] = useState({
    id: null,
    title: "",
    office_type: ""
  });

  // Attendance Average:
  const firstweekDay = moment().utc().startOf("week").format("YYYY-MM-DD");
  const lastWeekDay = moment().local().endOf("week").format("YYYY-MM-DD");

  const [attendanceAverage, setAttendanceAverage] = useState([]);
  const [attendanceAv, setAttendanceAv] = useState([]);
  const [attendanceAvi, setAttendanceAvi] = useState([]);


  const [loadingAttendanceAverage, setLoadingAttendanceAverage] =
    useState(false);
  const [attendanceAverageFromDate, setAttendanceAverageFromDate] =
    useState(firstweekDay);
  const [attendanceAverageToDate, setAttendanceAverageToDate] =
    useState(lastWeekDay);

  const { FontAwesomeIcon, faSpinner } = useAppContext();
  





//Todays clockin percentage





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
                <span
                  className="btn btn-gray btn-sm btn-rounded"
                  style={{
                    backgroundColor: attendanceRecord.late ? "#FFBF00" : ""
                  }}
                >
                  <i
                    className="fa fa-dot-circle-o text-info"
                    style={{ marginRight: "10px" }}
                  ></i>{" "}
                  {moment(attendanceRecord.clock_in, "HH:mm:ss").format(
                    "hh:mma"
                  )}{" "}
                  {/* -<span>{attendanceRecord.late ? " Late" : ""}</span> */}
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
                  className={`fa fa-dot-circle-o ${attendanceRecord.status === "Leave"
                    ? "text-success"
                    : attendanceRecord.status === "Day off"
                      ? "text-secondary"
                      : attendanceRecord.status === "Sick"
                        ? "text-warning"
                        : attendanceRecord.status === "FAM/PER Emergency"
                          ? "text-info"
                          : attendanceRecord.status === "P/Holiday"
                            ? "text-dark"
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
      }
    }));

    setDateColumns(dateColumns);
  }, [monthlyAttendance]);

  // Daily Attendance - Cards:
  const fetchDailyAttendanceSummary = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "api/v1/daily_attendance_summary.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            date: date
          }
        }
      );
      const resData = response?.data?.data?.result;

      setDailyAttendanceSummary(resData);
      setLoading(false);
    } catch (error) {
      const component = "Daily Attendance - Cards:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // Daily Attendance - Table:
  const fetchDailyAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/v1/daily_attendance.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            date: date,
            limit: 400
          }
        }
      );
      const resData =
        response?.data?.data?.info === "no record for date"
          ? []
          : response?.data?.data?.info.map((e, index) => ({
            ...e,
            idx: index + 1,
            office: e?.office ? e?.office?.toUpperCase() : null,
            date: moment(e?.date).format("ddd, Do MMM. YYYY")
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
      const component = "Daily Attendance - Summary | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

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
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            office_type: officeType,
            office_id: selectedOffice?.id,
            start_date: fromDate,
            end_date: toDate,
            page: page,
            limit: sizePerPage
          }
        }
      );

      // console.log("response", response?.data?.data);

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
        lateness_and_absence: attendanceRecords[key].lateness_and_absence
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
        absence:
          data?.lateness_and_absence?.NCNS !== undefined
            ? data.lateness_and_absence.NCNS
            : 0,
        // absent:
        //   data?.lateness_and_absence?.NCNS !== undefined
        //     ? data?.lateness_and_absence?.["NCNS(did not clock out)"]
        //     : 0,

        attendance: Object.keys(data?.days).map((key) => ({
          date: key,
          clock_in: data?.days[key]?.clock_in
            ? data?.days[key]?.clock_in
            : null,
          clock_out: data?.days[key]?.clock_out
            ? data?.days[key]?.clock_out
            : null,
          late: data?.days[key]?.late ? data?.days[key]?.late : false,
          status:
            data?.days[key] === "absent"
              ? "Absent"
              : data?.days[key] === "leave"
                ? "Leave"
                : data?.days[key] === "off"
                  ? "Day off"
                  : data?.days[key] === "sick"
                    ? "Sick"
                    : data?.days[key] === "FAM/PER Emergency"
                      ? "FAM/PER Emergency"
                      : data?.days[key] === "p/holiday"
                        ? "P/Holiday"
                        : data?.days[key] === "---"
                          ? "---"
                          : "Present"
        }))
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
  }, [fromDate, selectedOffice?.id, officeType, page, sizePerPage, toDate]);

  // Attendance Average:
  const fetchAttendanceAverage = useCallback(async () => {
    setLoadingAttendanceAverage(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/hr_dashboard/attendance_average_calculations.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            from: moment(attendanceAverageFromDate).format("DD-MM-YYYY"),
            to: moment(attendanceAverageToDate).format("DD-MM-YYYY")
          }
        }
      );

      const resData = response?.data?.data?.average_attendance;
      //console.log('me',resData)
      setAttendanceAverage(resData);
      setLoadingAttendanceAverage(false);
    } catch (error) {
      const component = "Attendance Average error | ";
      ErrorHandler(error, component);
      setLoadingAttendanceAverage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendanceAverageFromDate, attendanceAverageToDate]);


  const fetchAttendanceAvi = useCallback(async () => {
    setLoadingAttendanceAverage(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/hr_dashboard/attendance_average_calculations.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            from: date,
            to: date,
            percentage_type:'clockin_percentage'
          }
        }
      );

      const resData = response?.data?.data?.average_attendance;
      const neww = response?.data?.data?.average_attendance?.percentage_average;      ;
      //console.log('me',neww)
      setClockn(neww);
      setAttendanceAvi(resData);
      setLoadingAttendanceAverage(false);
    } catch (error) {
      const component = "Attendance Average error | ";
      ErrorHandler(error, component);
      setLoadingAttendanceAverage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);



  const fetchAttendanceAv = useCallback(async () => {
    setLoadingAttendanceAverage(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/hr_dashboard/attendance_average_calculations.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            from: moment(attendanceAverageFromDate).format("DD-MM-YYYY"),
            to: moment(attendanceAverageToDate).format("DD-MM-YYYY"),
            percentage_type:'clockin_percentage'

          }
        }
      );

      const resData = response?.data?.data?.average_attendance;
      const neww = response?.data?.data?.average_attendance?.percentage_average;      ;
      setClockin(neww)
      setAttendanceAv(resData);
      //console.log("resData", resData);
      setLoadingAttendanceAverage(false);
    } catch (error) {
      const component = "Attendance Average error | ";
      ErrorHandler(error, component);
      setLoadingAttendanceAverage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendanceAverageFromDate, attendanceAverageToDate]);





  // All Campaigns:
  const fetchAllCampaigns = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/campaigns.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: CampaignPage,
          limit: CampaignSizePerPage
        }
      });
      const resData = response?.data?.data?.campaigns;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = CampaignSizePerPage;
      const thisTotalPageSize = totalPages;

      setCampaignSizePerPage(thisPageLimit);
      setTotalCampaignPages(thisTotalPageSize);

      const formattedCampaigns = resData.map((e, index) => ({
        ...e,
        // index: index + 1,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY")
      }));

      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.log("All Campaigns error:", error);
      setLoading(false);
    }
  }, [CampaignPage, CampaignSizePerPage]);

  // All Departments:
  const fetchAllDepartments = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/departments.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: DepartmentPage,
          limit: DepartmentSizePerPage
        }
      });
      const resData = response?.data?.data?.departments;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = DepartmentSizePerPage;
      const thisTotalPageSize = totalPages;

      setDepartmentSizePerPage(thisPageLimit);
      setTotalDepartmentPages(thisTotalPageSize);

      const formattedDepartments = resData.map((e) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY")
      }));

      setDepartments(formattedDepartments);
      setLoading(false);
    } catch (error) {
      console.log("All Departments error:", error);
      setLoading(false);
    }
  }, [DepartmentPage, DepartmentSizePerPage]);

  useEffect(() => {
    fetchDailyAttendanceSummary();
    fetchDailyAttendance();
    fetchAllCampaigns();
    fetchAllDepartments();
  }, [
    fetchDailyAttendanceSummary,
    fetchDailyAttendance,
    fetchAllCampaigns,
    fetchAllDepartments
  ]);

  useEffect(() => {
    fetchMonthlyAttendance();
  }, [fetchMonthlyAttendance]);

  useEffect(() => {
    fetchAttendanceAverage();
  }, [fetchAttendanceAverage]);
 
  useEffect(() => {
    fetchAttendanceAv();
  }, [fetchAttendanceAv]);
  useEffect(() => {
    fetchAttendanceAvi();
  }, [fetchAttendanceAvi]);


  const columns = [
    {
      dataField: "full_name",
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
          <Link
            to={`/dashboard/hr/office/employee-attendance/${row?.full_name}/${row?.ogid}`}
          >
            {value?.toUpperCase()}
          </Link>
        </h2>
      )
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "clock_in",
      text: "Clock In",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value) => {
        return value === "No Clock in" ? (
          <span className="text-danger">{value}</span>
        ) : (
          moment(value, "HH:mm:ss").format("hh:mma")
        );
      }
    },
    {
      dataField: "clock_out",
      text: "Clock Out",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value) => {
        return value === "No Clock out" ? (
          <span className="text-danger">{value}</span>
        ) : (
          moment(value, "HH:mm:ss").format("hh:mma")
        );
      }
    },
    {
      dataField: "work_hours",
      text: "Work Hours",
      sort: true,
      headerStyle: { width: "100%" }
    }
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
          <Link
            to={`/dashboard/hr/office/employee-attendance/${row?.staffName}/${row?.ogid}`}
          >
            {value?.toUpperCase()} <span>{row?.ogid}</span>
          </Link>
        </h2>
      )
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "total_hours",
      text: "Total Hours",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "lateness",
      text: "Lateness",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "absence",
      text: "Absence (NCNS)",
      sort: true,
      headerStyle: { width: "100%" }
    },
    // {
    //   dataField: "absent",
    //   text: "Absent(did not clock out)",
    //   sort: true,
    //   headerStyle: { width: "100%" },
    // },
    ...dateColumns
  ];

  const campaignColumns = [
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "35%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/attendance/campaign/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      )
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" }
    }
  ];

  const departmentColumns = [
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "35%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/attendance/department/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      )
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" }
    }
  ];
  
 
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employees Attendance Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Attendance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="daily-attendance-card-group">
        <div className="daily-attendance-card">
          <span>Total Clock In</span>
          <div className="card-body inner">
            <span className="dash-widget-icon">
              <i className="las la-clock"></i>
            </span>
            <div className="daily-attendance-card-info">
              {loading ? (
                <h3>
                  <lord-icon
                    src="https://cdn.lordicon.com/xjovhxra.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#08a88a"
                  ></lord-icon>
                </h3>
              ) : (
                <h3>{dailyAttendanceSummary?.clock_in || "0"}</h3>
              )}
            </div>
          </div>
        </div>

        <div className="daily-attendance-card">
          <span>Total Clock Out</span>
          <div className="card-body inner">
            <span className="dash-widget-icon">
              <i
                className="las la-clock"
                style={{ transform: "scaleX(-1)" }}
              ></i>
            </span>
            <div className="daily-attendance-card-info">
              {loading ? (
                <h3>
                  <lord-icon
                    src="https://cdn.lordicon.com/xjovhxra.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#08a88a"
                  ></lord-icon>
                </h3>
              ) : (
                <h3> {dailyAttendanceSummary?.clock_out || "0"} </h3>
              )}
            </div>
          </div>
        </div>

        <div className="daily-attendance-card">
          <div className="card-body inner">
            <span className="dash-widget-icon">
              <i
                className="las la-calendar"
                style={{ transform: "scaleX(-1)" }}
              ></i>
            </span>
            <div className="daily-attendance-card-info">
              {loading ? (
                <h3>
                  <lord-icon
                    src="https://cdn.lordicon.com/xjovhxra.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#08a88a"
                  ></lord-icon>
                </h3>
              ) : (
                <h3>
                  {" "}
                  {moment(dailyAttendanceSummary?.day).format(
                    "Do MMMM, YYYY"
                  )}{" "}
                </h3>
              )}
            </div>
          </div>
        </div>

        <div className="daily-attendance-card">
          <p>Percentage clock-ins</p>
          <div className="percentage_average_card_doughnutChart">
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                pulse
                style={{ marginTop: "5px", fontSize: "20px" }}
              />
            ) : (
              <VictoryDougnutChart percent={clockn || 0} />
            )}
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
                  Daily Attendance Summary
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

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_attendanceAverage"
                >
                  Attendance Average
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_departments"
                >
                  Departments
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_campaigns">
                  Campaigns
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_dailyAttendance" className="col-12 tab-pane show active">
            <DailyAttendanceTable
              columns={columns}
              data={dailyAttendance}
              loading={loading}
              setLoading={setLoading}
              date={date}
              setDate={setDate}
            />
          </div>

          <div id="tab_monthlyAttendance" className="col-12 tab-pane">
            <MonthlyAttendanceTable
              columns={monthlyAttendanceColumns}
              data={monthlyAttendance}
              loading={loadingMonthlyRecord}
              setLoading={setLoadingMonthlyRecord}
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
              officeType={officeType}
              setOfficeType={setOfficeType}
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

          <div id="tab_attendanceAverage" className="col-12 tab-pane">
            <AttendanceAverageAdmin
              fromDate={attendanceAverageFromDate}
              setFromDate={setAttendanceAverageFromDate}
              toDate={attendanceAverageToDate}
              setToDate={setAttendanceAverageToDate}
              data={attendanceAverage}
              clockin={clockin}
              loading={loadingAttendanceAverage}
            />
          </div>

          <div id="tab_departments" className="col-12 tab-pane">
            <UniversalPaginatedTable
              columns={departmentColumns}
              data={departments}
              loading={loading}
              setLoading={setLoading}
              page={CampaignPage}
              setPage={setDepartmentPage}
              sizePerPage={CampaignSizePerPage}
              setSizePerPage={setCampaignSizePerPage}
              totalPages={totalDepartmentPages}
              setTotalPages={setTotalCampaignPages}
            />
          </div>

          <div id="tab_campaigns" className="col-12 tab-pane">
            <UniversalPaginatedTable
              columns={campaignColumns}
              data={campaigns}
              loading={loading}
              setLoading={setLoading}
              page={CampaignPage}
              setPage={setCampaignPage}
              sizePerPage={CampaignSizePerPage}
              setSizePerPage={setCampaignSizePerPage}
              totalPages={totalCampaignPages}
              setTotalPages={setTotalCampaignPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceRecord;
