import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import DailyAttendanceTable from "../../../components/Tables/EmployeeTables/DailyAttendanceTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";

const AttendanceRecord = () => {
  const { ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [dailyAttendanceSummary, setDailyAttendanceSummary] = useState([]);
  const [dailyAttendance, setDailyAttendance] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [CampaignPage, setCampaignPage] = useState(1);
  const [CampaignSizePerPage, setCampaignSizePerPage] = useState(10);
  const [totalCampaignPages, setTotalCampaignPages] = useState("");

  const [DepartmentPage, setDepartmentPage] = useState(1);
  const [DepartmentSizePerPage, setDepartmentSizePerPage] = useState(10);
  const [totalDepartmentPages, setTotalDepartmentPages] = useState("");

  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");
  const [date, setDate] = useState(today_date);

  // Daily Attendance - Cards:
  const fetchDailyAttendanceSummary = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "api/v1/daily_attendance_summary.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            date: date,
          },
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
              date: moment(e?.date).format("Do MMMM, YYYY"),
            }));

      setDailyAttendance(resData);
      setLoading(false);
    } catch (error) {
      const component = "Daily Attendance - Summary:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // All Campaigns:
  const fetchAllCampaigns = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/campaigns.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          pages: CampaignPage,
          limit: CampaignSizePerPage,
        },
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
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
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
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          pages: DepartmentPage,
          limit: DepartmentSizePerPage,
        },
      });
      const resData = response?.data?.data?.departments;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = DepartmentSizePerPage;
      const thisTotalPageSize = totalPages;

      setDepartmentSizePerPage(thisPageLimit);
      setTotalDepartmentPages(thisTotalPageSize);

      const formattedDepartments = resData.map((e, index) => ({
        ...e,
        // index: index + 1,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
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
    fetchAllDepartments,
  ]);

  const columns = [
    {
      dataField: "idx",
      text: "S/N",
      sort: true,
      headerStyle: { width: "5%" },
    },
    {
      dataField: "full_name",
      text: "Employee Name",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <Link
            to={`/dashboard/hr/office/employee-attendance/${row?.full_name}/${row?.ogid}`}
          >
            {value}
          </Link>
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "15%" },
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
    },
    {
      dataField: "clock_out",
      text: "Clock Out",
      sort: true,
      headerStyle: { width: "15%" },
    },
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
            to={`/dashboard/hr/campaign/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      ),
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
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
            to={`/dashboard/hr/department/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      ),
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employees Attendance Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Attendance Record</li>
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
                <a className="nav-link" data-toggle="tab" href="#tab_campaigns">
                  Campaigns
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
        </div>
      </div>
    </>
  );
};

export default AttendanceRecord;
