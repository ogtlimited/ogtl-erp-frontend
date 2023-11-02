/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const EditLeaveCountModal = ({leaveCountEdit, fetchAllSubordinates}) => {
  const { showAlert } = useAppContext();
  const [leaveCount, setLeaveCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const empLeaveCount = leaveCountEdit?.leaveCount;
    setLeaveCount(empLeaveCount);
  }, [leaveCountEdit]);

  const cancelEvent = () => {
    $("#leaveCountModal").modal("toggle");
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeaveCount(e.target.value);
  };

  const handleUpdateLeaveCount = (e) => {
    e.preventDefault();

    const employeeRecord = {
      ogid: leaveCountEdit.ogid,
      leaveCount: leaveCount,
    };

    setLoading(true);
    axiosInstance
      .patch(`/employees/leave-count/${employeeRecord.ogid}`, {
        leaveCount: employeeRecord.leaveCount,
      })
      .then((res) => {
        showAlert(
          true,
          `${leaveCountEdit.first_name}'s Leave Count Successfully Updated!`,
          "alert alert-success"
        );
        fetchAllSubordinates();
        $("#leaveCountModal").modal("toggle");
        cancelEvent();
        setLoading(false);
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message;
        console.log("Add Leave Count Error:", errorMsg);
        showAlert(true, `${errorMsg}`, "alert alert-danger");
        $("#leaveCountModal").modal("toggle");
        cancelEvent();
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="leaveCountModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit Leave Count
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
                <form onSubmit={handleUpdateLeaveCount}>
                  <div className="row">

                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="leaveCount">
                          Leave Count
                        </label>
                        <input
                          type="number"
                          name="leaveCount"
                          className="form-control"
                          value={leaveCount}
                          onChange={handleFormChange}
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
        </div>
      </div>
    </>
  );
};
