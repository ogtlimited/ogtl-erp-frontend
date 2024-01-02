/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { CREATE_LEAVE } from "../FormJSON/CreateLeave";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import ms from "ms";
import moment from "moment";
import Select from "react-select";
import { RiErrorWarningLine } from "react-icons/ri";

export const ApplyLeaveModal = ({ fetchYourLeaves }) => {
  const {
    showAlert,
    loadingSelect,
    selectLeaveTypes,
    fetchAllLeaveTypes,
    user,
  } = useAppContext();
  const [leave, setLeave] = useState(CREATE_LEAVE);
  const [isLeaveTypeValid, setIsLeaveTypeValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedStartDateError, setSelectedStartDateError] = useState("");
  const [selectedEndDateError, setSelectedEndDateError] = useState("");
  const [proofUpload, setProofUpload] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const employeeGender = user?.employee_info?.personal_details?.gender;

  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [noticePeriod, setNoticePeriod] = useState(15);
  const [allowableDays, setAllowableDays] = useState(19);

  const needsProof = ["emergency", "sick", "maternity", "paternity"];

  const CurrentUserNeedsUpload = needsProof.some((type) =>
    leaveType.includes(type)
  );

  useEffect(() => {
    setIsLeaveTypeValid(leave.hr_leave_type_id ? true : false);
  }, [leave.hr_leave_type_id]);

  useEffect(() => {
    const todayDate = moment().format("YYYY-MM-DD");

    const parsedDate = new Date(selectedStartDate);
    const dayChecker = parsedDate.getDay() || null;

    if (leaveType.includes("emergency") || leaveType.includes("sick")) {
      setAllowableDays(365);
    } else if (leaveType.includes("maternity")) {
      setAllowableDays(83);
    } else if (leaveType.includes("paternity")) {
      setAllowableDays(6);
    } else {
      setAllowableDays(dayChecker < 2 ? 17 : 19);
    }

    const leaveNoticePeriod = ms(`${noticePeriod}d`);
    const maxLeaveDays = ms(`${allowableDays}d`);

    const minDate = moment(todayDate).add(leaveNoticePeriod, "ms");
    const maxDate = moment(leave?.start_date).add(maxLeaveDays, "ms");

    setMinDate(moment(minDate).format("yyyy-MM-DD"));
    setMaxDate(moment(maxDate).format("yyyy-MM-DD"));
  }, [
    allowableDays,
    leave?.start_date,
    leaveType,
    noticePeriod,
    selectedStartDate,
  ]);

  useEffect(() => {
    fetchAllLeaveTypes();
  }, [fetchAllLeaveTypes]);

  const leaveTypeSelection = useCallback(() => {
    const selectedLeave = leave?.leaveTypeTitle.toLowerCase();
    setLeaveType(selectedLeave);

    if (
      leaveType.includes("emergency") ||
      leaveType.includes("sick") ||
      leaveType.includes("paternity")
    ) {
      setNoticePeriod(0);
    } else {
      setNoticePeriod(15);
    }
  }, [leave?.leaveTypeTitle, leaveType]);

  useEffect(() => {
    leaveTypeSelection();
  }, [leaveTypeSelection]);

  const cancelEvent = () => {
    setLeave(CREATE_LEAVE);
    setSelectedStartDate("");
    setSelectedEndDate("");
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  // Handle leave type change:
  const handleSelectLeave = (e) => {
    setLeave({
      ...leave,
      start_date: "",
      end_date: "",
      reason: "",
      hr_leave_type_id: e?.value,
      leaveTypeTitle: e?.label,
    });

    setSelectedStartDate("");
    setSelectedEndDate("");

    const leaveTypeRequiresProof = needsProof.includes(e?.label.toLowerCase());
    setIsLeaveTypeValid(true);

    if (leaveTypeRequiresProof && !proofUpload) {
      setIsLeaveTypeValid(false);
    }

    setProofUpload(null);
    setFileInputKey((prevKey) => prevKey + 1);
  };

  // Handle date change:
  const handleDateChange = (e) => {
    e.preventDefault();
    const selectedDate = e.target.value;

    // ! Restricts selection of weekends
    // const parsedDate = new Date(selectedDate);
    // const weekend = parsedDate.getDay() === 6 || parsedDate.getDay() === 0;

    // if (weekend) {
    // if (e.target.name === "start_date") {
    //   setSelectedStartDateError(
    //     `You can not select ${moment(parsedDate).format(
    //       "dddd"
    //     )}, please select a weekday.`
    //   );
    //   setSelectedStartDate("");
    //   setSelectedEndDateError("");
    // } else {
    //   setSelectedEndDateError(
    //     `
    //     You can not select ${moment(parsedDate).format(
    //       "dddd"
    //     )}, please select a weekday.`
    //   );
    // }
    //   setSelectedEndDate("");
    // } else {
    if (e.target.name === "start_date") {
      setSelectedStartDate(selectedDate);
      setSelectedStartDateError("");

      setSelectedEndDateError("");
    } else {
      setSelectedEndDate(selectedDate);
      setSelectedEndDateError("");
    }
    setLeave({ ...leave, [e.target.name]: selectedDate });
    // }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setProofUpload(e.target.files);
  };

  const files = proofUpload ? [...proofUpload] : [];

  // Handle Leave Application
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const leaveTypeQuery =
      leaveType.charAt(0).toUpperCase() + leaveType.slice(1);

    const dataPayload = {
      hr_leave_type_id: leave.hr_leave_type_id,
      start_date: leave.start_date,
      end_date: leave.end_date,
      reason: leaveType.includes("vacation") ? "Vacation" : leave.reason,
    };

    try {
      if (CurrentUserNeedsUpload) {
        let formData = new FormData();

        files.forEach((file) => {
          formData.append("proofs[]", file);
        });
        formData.append("hr_leave_type_id", leave.hr_leave_type_id);
        formData.append("start_date", leave.start_date);
        formData.append("end_date", leave.end_date);
        formData.append("reason", leave.reason);

        // eslint-disable-next-line no-unused-vars
        const response = await axiosInstance.post(
          `/api/v1/leaves.json?leave_type=${leaveTypeQuery}`,
          formData
        );
      } else {
        // eslint-disable-next-line no-unused-vars
        const response = await axiosInstance.post(
          `/api/v1/leaves.json?leave_type=${leaveTypeQuery}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            payload: dataPayload,
          }
        );
      }

      showAlert(
        true,
        "Your leave application is successful, please await an approval",
        "alert alert-success"
      );

      fetchYourLeaves();
      setLeave(CREATE_LEAVE);
      setSelectedStartDate("");
      setSelectedEndDate("");
      $("#FormModal").modal("toggle");
    } catch (error) {
      $("#FormModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    } finally {
      setLoading(false);
    }
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

                    {leaveType.includes("vacation") ? null : (
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
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="start_date">Start</label>
                        <input
                          type="date"
                          name="start_date"
                          value={selectedStartDate}
                          onChange={handleDateChange}
                          className="form-control "
                          id="dateInput"
                          min={minDate}
                          required
                        />
                        {selectedStartDateError && (
                          <span className="date_error">
                            <RiErrorWarningLine className="date_error_icon" />
                            {selectedStartDateError}
                          </span>
                        )}
                      </div>
                    </div>

                    {leave.start_date ? (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="end_date">Last Day of Leave</label>
                          <input
                            type="date"
                            name="end_date"
                            value={selectedEndDate}
                            onChange={handleDateChange}
                            className="form-control "
                            id="dateInput"
                            min={leave.start_date}
                            max={maxDate}
                            required
                          />
                          {selectedEndDateError && (
                            <span className="date_error">
                              <RiErrorWarningLine className="date_error_icon" />
                              {selectedEndDateError}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : null}

                    {CurrentUserNeedsUpload ? (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="proofs">Proof Upload</label>
                          <input
                            key={fileInputKey}
                            name="proofs"
                            type="file"
                            className="form-control proof_upload"
                            accept="image/*,.pdf,.doc,.csv,.txt"
                            placeholder="Click to upload "
                            onChange={handleFileChange}
                            multiple
                            required
                          />
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
                    {(leaveType.includes("maternity") &&
                      employeeGender === "male") ||
                    (leaveType.includes("paternity") &&
                      employeeGender === "female") ? null : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                          !isLeaveTypeValid ||
                          (CurrentUserNeedsUpload && !proofUpload)
                        }
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
                    )}
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
