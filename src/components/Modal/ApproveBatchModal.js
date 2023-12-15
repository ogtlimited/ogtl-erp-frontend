/* eslint-disable no-unused-vars */
/** @format */

import React from "react";

export const ApproveBatchModal = ({}) => {
  const handleProceed = () => {
    
  }
  return (
    <>
      <div
        className="modal fade"
        id="ApproveBatchModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-l">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Approve Batch
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

            <div
              className="modal-body"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Are you sure you want to approve batch</p>
              <main>
                <button
                  className="btn btn-sm btn-secondary"
                  style={{ marginLeft: "20px" }}
                  data-toggle="modal"
                  data-target="#ApproveBatchModal"
                >
                  Approve Batch
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  style={{ marginLeft: "20px" }}
                  onClick={handleProceed()}
                >
                  Proceed
                </button>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
