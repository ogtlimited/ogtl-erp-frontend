/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../services/api";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import $ from "jquery";

export const RequestReviewModal = ({
  setRefreshApproversData,
  reviewersData,
}) => {
  const { id } = useParams();
  const { showAlert } = useAppContext();
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Select Reviewer:
  const handleSelectReviewer = async (data) => {
    const ogid = data?.ogid;
    setSelectedReviewer(ogid);
  };

  // Cancel Event
  const cancelEvent = () => {
    setSelectedReviewer("")
  }

  // Handle Request Review:
  const handleRequestReview = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/request_payroll_reviews/${id}.json?ogid=${selectedReviewer}`,
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
        "Request for a review has been successfully sent!",
        "alert alert-success"
      );
      $("#RequestReviewModal").modal("toggle");
      setSelectedReviewer("");
      setRefreshApproversData(true);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="RequestReviewModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl custom-modal-dialog-centered">
          <div className="modal-content custom-modal-width">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Payroll Approvers
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
              <p>Select Reviewer</p>
              <main
                className="payroll-approval-modal-body"
                style={{ display: "flex" }}
              >
                {reviewersData.map((approver, index) => (
                  <div className="payroll-approval-card-group" key={index}>
                    <div
                      className={
                        selectedReviewer === approver?.ogid
                          ? "payroll-approval-card payroll-approvers active_reviewer"
                          : "payroll-approval-card payroll-approvers"
                      }
                      onClick={() => handleSelectReviewer(approver)}
                    >
                      <div>
                        <h5>{`Approver ${index + 1}`}</h5>
                        <main>
                          <p
                            className="reviewer_name"
                            style={{ fontWeight: "500" }}
                          >
                            {approver?.full_name}
                          </p>
                          <p style={{ marginTop: "-1rem", fontSize: "13px" }}>
                            {approver?.ogid}
                          </p>
                        </main>
                      </div>
                      <div className="card-body inner">
                        <span
                          className={
                            selectedReviewer === approver?.ogid
                              ? "current-processor"
                              : "dash-widget-icon"
                          }
                        >
                          {approver?.stage}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </main>

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
                  onClick={handleRequestReview}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
