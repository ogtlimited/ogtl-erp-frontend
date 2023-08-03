import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import DailyAttendanceTable from "../../../components/Tables/EmployeeTables/DailyAttendanceTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import Switch from "@mui/material/Switch";

const RemoteAttendanceAdmin = () => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [dailyRemoteAttendanceSummary, setDailyRemoteAttendanceSummary] =
    useState([]);
  const [dailyRemoteAttendance, setDailyRemoteAttendance] = useState([]);
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

  // Daily Remote Attendance Summary - Cards:
  const fetchDailyRemoteAttendanceSummary = useCallback(async () => {
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

      setDailyRemoteAttendanceSummary(resData);
      setLoading(false);
    } catch (error) {
      showAlert(
        true,
        "Error retrieving information from server",
        "alert alert-warning"
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // Daily Remote Attendance - Table:
  const fetchDailyRemoteAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "api/v1/hr_dashboard/remote_attendance_records.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            day: date,
            limit: 400,
          },
        }
      );

      const resData = response?.data?.data?.records;

      const formatted = resData.map((e, index) => ({
        ...e,
        full_name: e.first_name + " " + e.last_name,
        formattedDate: moment(e?.createdAt).format("Do MMMM, YYYY"),
      }));

      setDailyRemoteAttendance(formatted);
      setLoading(false);
    } catch (error) {
      showAlert(
        true,
        "Error retrieving information from server",
        "alert alert-warning"
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

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
    // fetchDailyRemoteAttendanceSummary();
    fetchDailyRemoteAttendance();
    fetchAllCampaigns();
    fetchAllDepartments();
  }, [fetchAllCampaigns, fetchAllDepartments, fetchDailyRemoteAttendance]);

  const columns = [
    {
      dataField: "full_name",
      text: "Employee Name",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "present",
      text: "Present",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          <Switch checked={row?.present} />
        </>
      ),
    },
    {
      dataField: "acted_on_by",
      text: "Acted on by",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "formattedDate",
      text: "Date generated",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  // const officeColumns = [
  //   {
  //     dataField: "title",
  //     text: "Office",
  //     sort: true,
  //     headerStyle: { width: "35%" },
  //     formatter: (val, row) => (
  //       <p>
  //         <Link
  //           to={`/dashboard/hr/${row?.office_type}/employees/${row?.title}/${row.id}`}
  //           className="attendance-record-for-office"
  //         >
  //           {val}
  //         </Link>
  //       </p>
  //     ),
  //   },
  //   {
  //     dataField: "created_at",
  //     text: "Date Created",
  //     sort: true,
  //     headerStyle: { width: "20%" },
  //   },
  // ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Remote Attendance Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Remote Attendance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="daily-attendance-card-group">
        {/* <div className="daily-attendance-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="las la-users"></i>
            </span>
            <div className="daily-attendance-card-info">
              {loading ? (
                <h3>-</h3>
              ) : (
                <h3>{dailyRemoteAttendanceSummary?.clock_in || "-"}</h3>
              )}
            </div>
          </div>
          <span>Total Present</span>
        </div> */}

        {/* <div className="daily-attendance-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i
                className="las la-users"
                style={{ transform: "scaleX(-1)" }}
              ></i>
            </span>
            <div className="daily-attendance-card-info">
              {loading ? (
                <h3>-</h3>
              ) : (
                <h3> {dailyRemoteAttendanceSummary?.clock_out || "-"} </h3>
              )}
            </div>
          </div>
          <span>Total Absent</span>
        </div> */}

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
                  {moment(date).format(
                    "Do MMMM, YYYY"
                  )}{" "}
                </h3>
              )}
            </div>
          </div>
          <span>Date</span>
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

              {/* <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_campaigns">
                  Campaigns
                </a>
              </li> */}

              {/* <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_departments"
                >
                  Departments
                </a>
              </li> */}

            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_dailyAttendance" className="col-12 tab-pane show active">
            <DailyAttendanceTable
              columns={columns}
              data={dailyRemoteAttendance}
              loading={loading}
              setLoading={setLoading}
              date={date}
              setDate={setDate}
            />
          </div>

          {/* <div id="tab_campaigns" className="col-12 tab-pane">
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
          </div> */}

          {/* <div id="tab_departments" className="col-12 tab-pane">
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default RemoteAttendanceAdmin;
