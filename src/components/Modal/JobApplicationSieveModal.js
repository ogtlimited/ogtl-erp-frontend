/* eslint-disable jsx-a11y/anchor-is-valid */
/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const JobApplicationSieveModal = ({ row, fetchAllJobApplicants }) => {
  const { showAlert, user } = useAppContext();
  const [status, setStatus] = useState({
    interview_status: "",
    process_status: "",
    interview_date: null,
  });
  const [loading, setLoading] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;

  const InterviewStatusOptions = [
    { label: "Open", value: "Open" },
    { label: "Scheduled for interview", value: "Scheduled for interview" },
    { label: "Not interested", value: "Not interested" },
    { label: "Not a graduate", value: "Not a graduate" },
    { label: "Not in job location", value: "Not in job location" },
    { label: "Failed screening", value: "Failed screening" },
    { label: "Missed call", value: "Missed call" },
    { label: "Call back", value: "Call back" },
  ];

  const InterviewProcessStageOptions = [
    { label: "Open", value: "Open" },
    { label: "Sieving", value: "Sieving" },
    { label: "Phone screening", value: "Phone screening" },
    { label: "Interview scheduled", value: "Interview scheduled" },
  ];

  useEffect(() => {
    setStatus({
      interview_status: row?.interview_status,
      process_status: row?.process_status,
      interview_date: row?.interview_date,
    });
  }, [row?.interview_date, row?.interview_status, row?.process_status]);

  const handleCancel = () => {
    setStatus({
      interview_status: row?.interview_status,
      process_status: row?.process_status,
      interview_date: row?.interview_date,
    });
  };

  const handleSieveActions = async (e) => {
    e.preventDefault();

    if (!CurrentUserRoles.includes("rep_siever")) {
      return showAlert(true, "You are not a rep siever", "alert alert-warning");
    }
    
    setLoading(true);
    axiosInstance
      .patch(`/api/v1/job_applicants/${row?.id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: status,
      })
      .then((res) => {
        showAlert(
          true,
          "Job application updated successfully",
          "alert alert-success"
        );
        fetchAllJobApplicants();
        $("#JobApplicationSieveModal").modal("hide");
        handleCancel();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        $("#JobApplicationSieveModal").modal("toggle");
        const errorMsg = error?.response?.data?.errors;
        if (errorMsg) {
          return showAlert(true, errorMsg, "alert alert-danger");
        } else {
          return showAlert(
            true,
            "Error updating job applicant information",
            "alert alert-danger"
          );
        }
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="JobApplicationSieveModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Update Status
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
              <form onSubmit={handleSieveActions}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Interview Status</label>
                      <Select
                        options={InterviewStatusOptions}
                        isSearchable={true}
                        style={{ display: "inline-block" }}
                        value={{
                          label: status?.interview_status,
                          value: status?.interview_status,
                        }}
                        onChange={(e) => {
                          setStatus({
                            ...status,
                            interview_status: e?.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="employee_info.operation_office_id">
                        Process Stage
                      </label>
                      <Select
                        options={InterviewProcessStageOptions}
                        isSearchable={true}
                        style={{ display: "inline-block" }}
                        value={{
                          label: status?.process_status,
                          value: status?.process_status,
                        }}
                        onChange={(e) => {
                          setStatus({
                            ...status,
                            process_status: e?.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-primary">
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
        </div>
      </div>
    </>
  );
};
