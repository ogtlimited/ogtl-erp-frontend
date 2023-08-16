/** @format */

import React, { useState, useEffect } from "react";
import { HR_CREATE_LEAVE, officeTypeOptions } from "../FormJSON/CreateLeave";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import ms from "ms";
import moment from "moment";
import Select from "react-select";
import secureLocalStorage from "react-secure-storage";

export const CreateLeaveModal = ({ fetchHRLeaves }) => {
  const { showAlert, loadingSelect, selectLeaveTypes } = useAppContext();
  const [leave, setLeave] = useState(HR_CREATE_LEAVE);
  const [isLeaveTypeValid, setIsLeaveTypeValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  const [allOffices, setAllOffices] = useState([]);

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
    setLeave(HR_CREATE_LEAVE);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
  };

  const handleOfficeTypeChange = (e) => {
    setLeave({
      ...leave,
      operation_office_id: "",
    });

    fetchAllOffices(e?.value);
    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setLeave({
      ...leave,
      operation_office_id: e?.value,
      officeName: e?.label,
    });
    setIsOfficeSelected(true);
    fetchAllUsers(e?.value);
  };

  // All Offices:
  const fetchAllOffices = async (office) => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: office,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const allDepartments = resData.filter(
        (e) => e?.office_type === "department"
      );
      const allCampaigns = resData.filter((e) => e?.office_type === "campaign");

      const formattedDepartments = allDepartments
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      const formattedCampaigns = allCampaigns
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      if (office === "department") setAllOffices(formattedDepartments);
      if (office === "campaign") setAllOffices(formattedCampaigns);
    } catch (error) {
      console.log("Get All Offices error:", error);
    }
  };

  const fetchAllUsers = async (officeId) => {
    try {
      const response = await axiosInstance.get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          operation_office_id: officeId,
          pages: 1,
          limit: 1000,
        },
      });

      const resData = response?.data?.data?.employees;

      const formattedLeaders = resData
        .map((e) => ({
          label: e?.full_name,
          value: e.ogid,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllEmployees(formattedLeaders);
      setLoading(false);
    } catch (error) {
      console.log("Get All Leaders error:", error);
      setLoading(false);
    }
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
      hr_user_id: leave?.hr_user_id,
      hr_leave_type_id: leave.hr_leave_type_id,
      start_date: leave.start_date,
      end_date: leave.end_date,
      reason: leave.reason,
    };

    console.log("Submit this leave App.:", dataPayload);

    // setLoading(true);
    // try {
    //   // eslint-disable-next-line no-unused-vars
    //   const response = await axiosInstance.post(
    //     "/api/v1/leaves.json",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "ngrok-skip-browser-warning": "69420",
    //       },
    //       payload: dataPayload
    //     }
    //   );

    //   showAlert(
    //     true,
    //     "Your leave application is successful, please await an approval",
    //     "alert alert-success"
    //   );
    //   fetchHRLeaves();
    //   setLeave(HR_CREATE_LEAVE);
    //   $("#FormModal").modal("toggle");
    // } catch (error) {
    //   showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    // }
    // setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="CreateLeaveModal"
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
                        <label>Office Type</label>
                        <Select
                          options={officeTypeOptions}
                          value={{
                            label: officeType,
                            value: officeType,
                          }}
                          style={{ display: "inline-block" }}
                          onChange={(e) => handleOfficeTypeChange(e)}
                        />
                      </div>
                    </div>

                    {isOfficeTypeSelected && (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="employee_info.operation_office_id">
                            Office
                          </label>
                          <Select
                            options={allOffices}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              label: leave?.officeName,
                              value: leave?.operation_office_id,
                            }}
                            onChange={(e) => handleOfficeChange(e)}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>
                    )}

                    {isOfficeSelected && (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="employee_info.operation_office_id">
                            Employee
                          </label>
                          <Select
                            options={allEmployees}
                            isSearchable={true}
                            isClearable={true}
                            value={{
                              value: leave?.hr_user_id,
                              label: leave?.employeeName,
                            }}
                            onChange={(e) =>
                              setLeave({
                                ...leave,
                                hr_user_id: e?.value,
                                employeeName: e?.label,
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>
                    )}

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
                        <label htmlFor="start_date">Start</label>
                        {leaveType.includes("emergency") ||
                        leaveType.includes("sick") ? (
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
                      disabled={!isLeaveTypeValid}
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
