// *IN-USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import DailyAttendanceTable from "../../../components/Tables/EmployeeTables/DailyAttendanceTable";
import LeadersSubordinatesTable from "../../../components/Tables/EmployeeTables/leadersSubordinatesTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import Switch from "@mui/material/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RemoteAttendance = () => {
  const { showAlert, user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [dailyRemoteAttendanceSummary, setDailyRemoteAttendanceSummary] =
    useState([]);
  const [dailyRemoteAttendance, setDailyRemoteAttendance] = useState([]);
  const [allLeadersSubordinates, setAllLeadersSubordinates] = useState([]);

  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");
  const [allPresent, setAllPresent] = useState(null);
  const [allAbsent, setAllAbsent] = useState(null);
  const [date, setDate] = useState(today_date);

  // // Daily Remote Attendance Summary - Cards:
  // const fetchDailyRemoteAttendanceSummary = useCallback(async () => {
  //   try {
  //     const response = await axiosInstance.get(
  //       "api/v1/remote_attendance_summary.json",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           "ngrok-skip-browser-warning": "69420",
  //         },
  //         params: {
  //           date: date,
  //         },
  //       }
  //     );
  //     const resData = response?.data?.data?.result;

  //     console.log("cards:", response?.data?.data)

  //     setDailyRemoteAttendanceSummary(resData);
  //     setLoading(false);
  //   } catch (error) {
  //     const component = "Daily Remote Attendance Summary:";
  //     ErrorHandler(error, component);
  //     setLoading(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [date]);

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

      const present = resData.filter((e) => e.present === true);
      const absent = resData.filter((e) => e.present === false);

      setAllPresent(present?.length);
      setAllAbsent(absent?.length);

      const formatted = resData.map((e, index) => ({
        ...e,
        full_name: e.first_name + " " + e.last_name,
        formattedDate: moment(e?.createdAt).format("Do MMMM, YYYY"),
      }));

      setDailyRemoteAttendance(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Daily Remote Attendance:";
      ErrorHandler(error, component);
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
      const component = "Team Attendance:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.employee_info?.ogid]);

  useEffect(() => {
    // fetchDailyRemoteAttendanceSummary();
    fetchDailyRemoteAttendance();
    fetchAllLeadersSubordinates();
  }, [fetchAllLeadersSubordinates, fetchDailyRemoteAttendance]);

  // Generate Attendance:
  const handleGenerateAttendance = async () => {
    setGenerating(true);
    try {
      const response = await axiosInstance.post(
        `/api/v1/generate_attendance_daily_sheets.json?day=${date}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        `Attendance for ${date} has been generated successfully!`,
        "alert alert-success"
      );
      fetchDailyRemoteAttendance();
      setGenerating(false);
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-info");
      setGenerating(false);
    }
  };

  // Mark Present:
  const handleMarkAttendance = async (value) => {
    try {
      const id = value.id;
      const response = await axiosInstance.patch(
        `/api/v1/remote_attendance_records/${id}.json?present=${
          value?.present ? false : true
        }`,
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
          <Switch
            checked={row?.present}
            value={row?.present}
            onChange={() => handleMarkAttendance(row)}
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
      text: "Date generated",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Remote Attendance Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Leadership</li>
              <li className="breadcrumb-item active">Attendance Records</li>
            </ul>
          </div>
          {!dailyRemoteAttendance.length && (
            <div className="col-auto float-right ml-auto">
              <>
                {generating ? (
                  <button className="btn add-btn ">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      pulse
                      style={{ marginRight: "10px" }}
                    />{" "}
                    Generating Attendance
                  </button>
                ) : (
                  <button
                    className="btn add-btn "
                    onClick={handleGenerateAttendance}
                  >
                    <i className="fa fa-refresh"></i> Generate Attendance
                  </button>
                )}
              </>
            </div>
          )}
        </div>
      </div>

      <div className="daily-attendance-card-group">
        <div className="daily-attendance-card">
          <span>Total Absent</span>
          <div className="card-body inner">
            <span className="dash-widget-icon">
              <i
                className="las la-calendar-times"
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
                <h3> {allAbsent || "0"} </h3>
              )}
            </div>
          </div>
        </div>

        <div className="daily-attendance-card">
          <span>Total Present</span>
          <div className="card-body inner">
            <span className="dash-widget-icon">
              <i className="las la-calendar-check"></i>
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
                <h3>{allPresent || "0"}</h3>
              )}
            </div>
          </div>
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
              <h3> {moment(date).format("Do MMMM, YYYY")} </h3>
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
                  href="#tab_dailyAttendanceSummary"
                >
                  Daily Attendance
                </a>
              </li>

              {/* <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_teamAttendance"
                >
                  Team Attendance
                </a>
              </li> */}
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
              today={today_date}
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
