/** @format */

import React, { useState, useEffect } from "react";
import { CREATE_LEAVE } from "../FormJSON/CreateLeave";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import ms from "ms";
import moment from "moment";
import Select from "react-select";
import  secureLocalStorage  from  "react-secure-storage";

export const ApplyLeaveModal = ({ fetchYourLeaves }) => {
  const { showAlert, loadingSelect, selectLeaveTypes } = useAppContext();
  const [leave, setLeave] = useState(CREATE_LEAVE);
  const [isLeaveTypeValid, setIsLeaveTypeValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const [today, setToday] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    if (leave.hr_leave_type_id) {
      setIsLeaveTypeValid(true);
    } else {
      setIsLeaveTypeValid(false);
    }
  }, [leave.hr_leave_type_id]);

  useEffect(() => {
    const time = new Date().toDateString();
    const today_date = moment(time).format("yyyy-MM-DD");
    setToday(today_date);
    const minSec = ms("15d");
    // const leaveDays = user?.employee_info?.leave_count + 15;
    const leaveDays = user?.employee_info?.leave_count;
    const maxSec = ms(`${leaveDays}d`);
    const min_date = new Date(+new Date(today) + minSec);
    const max_date = new Date(+new Date(leave.start_date) + maxSec);
    setMinDate(moment(min_date).format("yyyy-MM-DD"));
    setMaxDate(moment(max_date).format("yyyy-MM-DD"));
  }, [leave.start_date, today, user?.employee_info?.leave_count]);

  useEffect(() => {
    const selectedLeave = leave?.leaveTypeTitle.toLowerCase();
    setLeaveType(selectedLeave);
  }, [leave.leaveTypeTitle, leaveType]);

  const cancelEvent = () => {
    setLeave(CREATE_LEAVE);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSelectLeave = (e) => {
    setLeave({
      ...leave,
      start_date: "",
      end_date: "",
      hr_leave_type_id: e?.value,
      leaveTypeTitle: e?.label,
    });
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();

    const dataPayload = {
      hr_leave_type_id: leave.hr_leave_type_id,
      start_date: leave.start_date,
      end_date: leave.end_date,
      reason: leave.reason,
    };

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        "/api/v1/leaves.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: dataPayload
        }
      );

      showAlert(
        true,
        "Your leave application is successful, please await an approval",
        "alert alert-success"
      );
      fetchYourLeaves();
      setLeave(CREATE_LEAVE);
      $("#FormModal").modal("toggle");
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="FormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Leave Application
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              {!loadingSelect ? (
                <form onSubmit={handleApplyLeave}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="hr_leave_type_id">Leave Type</label>
                        <Select
                          name="hr_leave_type_id"
                          options={selectLeaveTypes}
                          isSearchable={true}
                          value={{
                            label: leave.leaveTypeTitle,
                            value: leave.hr_leave_type_id,
                          }}
                          onChange={(e) => handleSelectLeave(e)}
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="reason">Reason for Application</label>
                        <textarea
                          name="reason"
                          className="form-control "
                          value={leave.reason}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="start_date">Start</label>
                        {leaveType.includes("emergency") ? (
                          <input
                            type="date"
                            name="start_date"
                            value={leave.start_date}
                            onChange={handleFormChange}
                            className="form-control "
                            min={today}
                            required
                          />
                        ) : (
                          <input
                            type="date"
                            name="start_date"
                            value={leave.start_date}
                            onChange={handleFormChange}
                            className="form-control "
                            min={minDate}
                            required
                          />
                        )}
                      </div>
                    </div>

                    {leave.start_date.length ? (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="end_date">Last Day of Leave</label>
                          {leaveType.includes("emergency") ? (
                            <input
                              type="date"
                              name="end_date"
                              value={leave.end_date}
                              onChange={handleFormChange}
                              className="form-control "
                              min={leave.start_date}
                              max={maxDate}
                              required
                            />
                          ) : (
                            <input
                              type="date"
                              name="end_date"
                              value={leave.end_date}
                              onChange={handleFormChange}
                              className="form-control "
                              min={leave.start_date}
                              max={maxDate}
                              required
                            />
                          )}
                        </div>
                      </div>
                    ) : null}
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
                    <button type="submit" className="btn btn-primary" 
                      disabled={!isLeaveTypeValid}>
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
              ) : (
                <div
                  className="add-employee-form-loader-div"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
