//* IN USE

import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";
import axiosInstance from "../../../services/api";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SecurityManualAttendance = () => {
  const { showAlert, loadingEmployeeSelect, selectEmployees, goToTop } =
    useAppContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    ogid: "",
    staff: "",
    date: "",
    clock_in: "",
    clock_out: "",
  });
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [hasClockedOut, setHasClockedOut] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = moment(currentTime).format("hh");
  const minutes = moment(currentTime).format("mm");
  const seconds = moment(currentTime).format("ss");
  const meridiem = moment(currentTime).format("A");
  const formattedShortDate = moment(currentTime).format("ddd");
  const formattedLongDate = moment(currentTime).format("dddd, Do MMMM YYYY");

  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");

  useEffect(() => {
    setData({
      ogid: "",
      date: today_date,
      clock_in: "",
      clock_out: "",
    });
  }, [today_date]);

  const cancelEvent = () => {
    setData({
      ogid: "",
      date: today_date,
      clock_in: "",
      clock_out: "",
    });
  };

  // Employee Attendance - Today:
  const fetchEmployeeAttendance = useCallback(
    async (ogid, staff) => {
      if (ogid) {
        try {
          const response = await axiosInstance.get(
            `/api/v1/employee_attendances/${ogid}.json?start_date=${today_date}&end_date=${today_date}&limit=400`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );

          const resData =
            response?.data?.data?.result === "no record for date range"
              ? []
              : response?.data?.data?.result;

          if (resData.length) {
            setData({
              ...data,
              ogid,
              staff,
              clock_in: resData[0].clock_in,
              clock_out: resData[0].clock_out,
            });
            resData[0].clock_in !== "No Clock in" && setHasClockedIn(true);
            resData[0].clock_out !== "No Clock out" && setHasClockedOut(true);
          } else {
            setData({
              ...data,
              ogid,
              staff,
              clock_in: "",
              clock_out: "",
            });
            setHasClockedIn(false);
            setHasClockedOut(false);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Nothing to show");
        return null;
      }
    },
    [data, today_date]
  );

  // Handle Form Change:
  const handleFormChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle Submit Attendance:
  const handleSubmitAttendance = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.patch(
        `/api/v1/manual_clock_in/${data.ogid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            clock_in: data?.clock_in,
            clock_out: data?.clock_out,
            date: data?.date,
          },
        }
      );
      // eslint-disable-next-line no-unused-vars
      const resData = res;

      showAlert(
        true,
        `${data.staff} Attendance for ${moment(data?.date).format(
          "dddd, Do MMMM YYYY"
        )} has been Successfully Submitted!`,
        "alert alert-success"
      );

      setLoading(false);
      fetchEmployeeAttendance();
      goToTop();

      cancelEvent();
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      if (error?.response?.status === 500) {
        showAlert(true, "Internal Server Error!", "alert alert-warning");
        setLoading(false);
        goToTop();
      } else {
        showAlert(true, `${errorMsg}`, "alert alert-warning");
        setLoading(false);
        goToTop();
      }
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Manual Clock In/Out</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Manual Attendance</li>
            </ul>
          </div>

          <div className="col-auto float-right ml-auto">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">{formattedLongDate}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="manual-attendance-clock">
        <div class="clock-container">
          <div class="clock-col">
            <p class="clock-day clock-timer">{formattedShortDate}</p>
            <p class="clock-label">Day</p>
          </div>
          <div class="clock-col">
            <p class="clock-hours clock-timer">{hours}</p>
            <p class="clock-label">Hours</p>
          </div>
          <div class="clock-col">
            <p class="clock-minutes clock-timer">{minutes}</p>
            <p class="clock-label">Minutes</p>
          </div>
          <div class="clock-col">
            <p class="clock-seconds clock-timer">{seconds}</p>
            <p class="clock-label">Seconds</p>
          </div>
          <div class="clock-col">
            <p class="clock-meridiem clock-timer">{meridiem}</p>
            <p class="clock-label">Meridiem</p>
          </div>
        </div>
      </div>

      <div className="custom-field-div">
        <div className="modal-body">
          <form onSubmit={handleSubmitAttendance}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  {loadingEmployeeSelect ? (
                    <label htmlFor="staff">
                      <>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          pulse
                          style={{ marginRight: "10px" }}
                        />{" "}
                        Fetching staff...
                      </>
                    </label>
                  ) : (
                    <label htmlFor="staff">Staff</label>
                  )}
                  <Select
                    options={selectEmployees}
                    isSearchable={true}
                    value={{
                      value: data?.ogid,
                      label: data?.staff,
                    }}
                    onChange={(e) => {
                      setData({ ...data, ogid: e?.value, staff: e?.label });
                      fetchEmployeeAttendance(e?.value, e?.label);
                    }}
                    style={{ display: "inline-block" }}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    className="form-control"
                    name="date"
                    type="date"
                    value={data?.date}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group">
                  <label htmlFor="clock_in">Clock In Time</label>
                  <input
                    className="form-control"
                    name="clock_in"
                    type="time"
                    value={data?.clock_in}
                    onChange={handleFormChange}
                    required
                    readOnly={hasClockedIn}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group">
                  <label htmlFor="clock_out">Clock Out time</label>
                  <input
                    className="form-control"
                    name="clock_out"
                    type="time"
                    value={data?.clock_out}
                    onChange={handleFormChange}
                    readOnly={hasClockedOut}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={cancelEvent}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ zIndex: 0 }}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SecurityManualAttendance;
