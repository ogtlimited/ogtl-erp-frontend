/* eslint-disable no-unused-vars */
/** @format */

import React from "react";

export const PayrollApprovalModal = ({}) => {
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
                <div className="daily-attendance-card-group">
                  <div className="daily-attendance-card">
                    <div>
                      <h4>First Approver</h4>
                      <main>
                        <p style={{fontWeight:"500"}}>Fatima Muhammad</p>
                        <p style={{ marginTop: "-1rem" }}>
                          fatima.muhammad@outsource.com
                        </p>
                        <p style={{ marginTop: "-1rem" }}>20/12/2023</p>
                      </main>
                    </div>
                    <div className="card-body inner">
                      <span className="dash-widget-icon">1</span>
                    </div>
                  </div>
                </div>

                <div className="daily-attendance-card-group">
                  <div className="daily-attendance-card">
                    <main>
                      <h4>Second Approver</h4>
                      <p style={{fontWeight:"500"}}>Abubakar Moses</p>
                      <p style={{ marginTop: "-1rem" }}>
                        abubakar.moses@outsource.com
                      </p>
                      <p style={{ marginTop: "-1rem" }}>20/12/2023</p>
                    </main>
                    <div className="card-body inner">
                      <span className="dash-widget-icon">2</span>
                    </div>
                  </div>
                </div>

                <div className="daily-attendance-card-group">
                  <div className="daily-attendance-card">
                    <main>
                      <h4>Final Approver</h4>
                      <p style={{fontWeight:"500"}}>Amal Hassan</p>
                      <p style={{ marginTop: "-1rem" }}>
                        amal.hassan@outsource.com
                      </p>
                      <p style={{ marginTop: "-1rem" }}>20/12/2023</p>
                    </main>
                    <div className="card-body inner">
                      <span className="dash-widget-icon">3</span>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
