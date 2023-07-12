import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import DailyAttendanceTable from "../../../components/Tables/EmployeeTables/DailyAttendanceTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";

const AttendanceRecord = () => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(true);
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
    console.log("Summary date:", date);
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
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoading(false);
    }
  }, [date, showAlert]);

  // Daily Attendance - Table:
  const fetchDailyAttendance = useCallback(async () => {
    try {
      const response = await axiosInstance.get("api/v1/daily_attendance.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          date: date,
          limit: 400,
        },
      });
      const resData =
        response?.data?.data?.info === "no record for date"
          ? []
          : response?.data?.data?.info.map((e, index) => ({
              ...e,
              idx: index + 1,
            }));

      console.log("FORMATTED!!!:", resData);

      setDailyAttendance(resData);
      setLoading(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoading(false);
    }
  }, [date, showAlert]);

  // All Campaigns:
  const fetchAllCampaigns = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "campaign",
          pages: CampaignPage,
          limit: CampaignSizePerPage,
        },
      });
      const resData = response?.data?.data?.offices;
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
      console.log("Get All Campaigns error:", error);
      setLoading(false);
    }
  }, [CampaignPage, CampaignSizePerPage]);

  // All Departments:
  const fetchAllDepartments = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "department",
          pages: DepartmentPage,
          limit: DepartmentSizePerPage,
        },
      });
      const resData = response?.data?.data?.offices;
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
      console.log("Get All Departments error:", error);
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
      headerStyle: { width: "35%" },
    },
    {
      dataField: "clock_in",
      text: "Clock In",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "clock_out",
      text: "Clock Out",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  const officeColumns = [
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "35%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/${row?.office_type}/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val}
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
            <h3 className="page-title">Attendance Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="daily-attendance-card-group">
        <div className="daily-attendance-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="las la-clock"></i>
            </span>
            <div className="daily-attendance-card-info">
              {loading ? (
                <h3>-</h3>
              ) : (
                <h3>{dailyAttendanceSummary?.clock_in || "-"}</h3>
              )}
            </div>
          </div>
          <span>Total Clock In</span>
        </div>

        <div className="daily-attendance-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i
                className="las la-clock"
                style={{ transform: "scaleX(-1)" }}
              ></i>
            </span>
            <div className="daily-attendance-card-info">
              {loading ? (
                <h3>-</h3>
              ) : (
                <h3> {dailyAttendanceSummary?.clock_out || "-"} </h3>
              )}
            </div>
          </div>
          <span>Total Clock Out</span>
        </div>

        <div className="daily-attendance-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i
                className="las la-calendar"
                style={{ transform: "scaleX(-1)" }}
              ></i>
            </span>
            <div className="daily-attendance-card-info">
              {loading ? (
                <h3>-</h3>
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
          <span>Day</span>
        </div>
      </div>

      {/* <div className="page-menu">
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
                  href="#tab_campaigns"
                >
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
      </div> */}

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
              columns={officeColumns}
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
              columns={officeColumns}
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
