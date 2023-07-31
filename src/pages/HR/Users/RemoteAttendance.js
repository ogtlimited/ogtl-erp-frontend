// *IN-USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import DailyAttendanceTable from "../../../components/Tables/EmployeeTables/DailyAttendanceTable";
import LeadersSubordinatesTable from "../../../components/Tables/EmployeeTables/leadersSubordinatesTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import Switch from "@mui/material/Switch";

const RemoteAttendance = () => {
  const { showAlert, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [dailyRemoteAttendanceSummary, setDailyRemoteAttendanceSummary] =
    useState([]);
  const [dailyRemoteAttendance, setDailyRemoteAttendance] = useState([]);
  const [allLeadersSubordinates, setAllLeadersSubordinates] = useState([]);

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
        "/api/v1/remote_attendance_records.json",
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
        s_n: index + 1,
        full_name: e.first_name + " " + e.last_name,
        formattedDate: moment(e?.createdAt).format("Do MMMM, YYYY"),
      }));

      console.log("Formatted Daily Remote Attendance:", formatted);

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

  // Team Attendance:
  const fetchAllLeadersSubordinates = useCallback(async () => {
    const supervisorOgid = user?.employee_info?.ogid;
    try {
      const response = await axiosInstance.get("/api/v1/subordinates.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          ogid: supervisorOgid,
        },
      });

      const resData = response?.data?.data?.subordinates;

      const mapp = resData.map((e) => {
        return {
          ...e,
          fullName: e?.first_name + " " + e?.last_name,
        };
      });

      setAllLeadersSubordinates(mapp);
      setLoading(false);
    } catch (error) {
      showAlert(
        true,
        "Error retrieving team information from server",
        "alert alert-warning"
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.employee_info?.ogid]);

  useEffect(() => {
    // fetchDailyRemoteAttendanceSummary();
    fetchDailyRemoteAttendance();
    fetchAllLeadersSubordinates();
  }, [fetchAllLeadersSubordinates, fetchDailyRemoteAttendance]);

  const columns = [
    {
      dataField: "s_n",
      text: "S/N",
      sort: true,
      headerStyle: { width: "5%" },
    },
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
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <>
          <Switch
            checked={row?.present}
            value={row?.present}
            onChange={() => handleSetPresent(row)}
          />
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
      text: "Date",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  // Generate Attendance:
  const handleGenerateAttendance = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/generate_attendance_daily_sheets.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      console.log("Generated Attendance:", response);

      showAlert(
        true,
        `Attendance for ${date} has been generated successfully!`,
        "alert alert-success"
      );
      fetchDailyRemoteAttendance();
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-info");
      setLoading(false);
    }
  };

  // Mark Present:
  const handleSetPresent = async (value) => {
    try {
      const id = value.id;
      const response = await axiosInstance.patch(
        `/api/v1/remote_attendance_records/${id}.json?present=${true}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.message;
      showAlert(true, `${resData}`, "alert alert-success");
      fetchDailyRemoteAttendance();
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-info");
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Attendance Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Leadership</li>
              <li className="breadcrumb-item active">Team Members</li>
            </ul>
          </div>
          {!dailyRemoteAttendance.length && <div className="col-auto float-right ml-auto">
            <>
              <a
                href="#"
                className="btn add-btn "
                onClick={handleGenerateAttendance}
              >
                <i className="fa fa-refresh"></i> Generate Attendance
              </a>
            </>
          </div>}
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
                  href="#tab_dailyAttendanceSummary"
                >
                  Daily Attendance Summary
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_teamAttendance"
                >
                  Team Attendance
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div
            id="tab_dailyAttendanceSummary"
            className="col-12 tab-pane show active"
          >
            <DailyAttendanceTable
              columns={columns}
              data={dailyRemoteAttendance}
              loading={loading}
              setLoading={setLoading}
              date={date}
              setDate={setDate}
            />
          </div>

          <div id="tab_teamAttendance" className="col-12 tab-pane">
            <LeadersSubordinatesTable
              data={allLeadersSubordinates}
              setData={setAllLeadersSubordinates}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoteAttendance;
