/* eslint-disable no-unused-vars */
/** @format */

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../services/api";

export const PayrollApprovalModal = ({ batchId }) => {
  const [approversData, setApproversData] = useState([]);

  const fetchApproversData = useCallback(() => {
    axiosInstance
      .get(`/api/v1/payroll_processors.json?batch_id=${batchId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        const data = res?.data?.data?.payroll_processors;
        const sortedData = data.sort((a, b) => a.stage - b.stage);

        setApproversData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching approvers data:", error);
      });
  }, [batchId]);

  useEffect(() => {
    fetchApproversData();
  }, [fetchApproversData, batchId]);

  return (
    <>
      <div
        className="modal fade"
        id="PayrollApprovalModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered custom-modal-width">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Payroll Approval Reports
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
              <main
                className="payroll-approval-modal-body"
                style={{ display: "flex" }}
              >
                {approversData.map((approver, index) => (
                  <div className="daily-attendance-card-group" key={index}>
                    <div className="daily-attendance-card">
                      <div>
                        <h4>{`Approver ${index + 1}`}</h4>
                        <main>
                          <p style={{ fontWeight: "500" }}>
                            {approver?.full_name}
                          </p>
                          <p style={{ marginTop: "-1rem" }}>
                            {approver?.email}
                          </p>
                        </main>
                      </div>
                      <div className="card-body inner">
                        <span
                          className={
                            approver.current_processor
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
