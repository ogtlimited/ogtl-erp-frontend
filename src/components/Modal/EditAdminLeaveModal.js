/* eslint-disable no-unused-vars */
/** @format */

import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import { HR_UPDATE_LEAVE } from "../FormJSON/CreateLeave";
import { useAppContext } from "../../Context/AppContext";
import $ from "jquery";

function EditAdminLeaveModal({ hrEdit, fetchAllLeaves, fetchHRLeaveHistory }) {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(HR_UPDATE_LEAVE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLeave({
      start_date: hrEdit.leave?.start_date,
      end_date: hrEdit.leave?.end_date,
      reasons_for_update: hrEdit.leave?.reasons_for_update,
    });
  }, [
    hrEdit.leave?.end_date,
    hrEdit.leave?.reasons_for_update,
    hrEdit.leave?.start_date,
  ]);

  const cancelEvent = () => {
    setLeave(HR_UPDATE_LEAVE);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleEditLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = hrEdit.leave?.id;

    const firstName = hrEdit?.first_name
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
    const lastName = hrEdit?.last_name
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());

    const fullName = firstName + " " + lastName;

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/hr_update_leave_dates/${id}.json`,
        {
          payload: leave,
        }
      );

      showAlert(
        true,
        `${fullName} Leave Request has been Updated!`,
        "alert alert-info"
      );

      $("#EditLeaveModal").modal("toggle");
      setLoading(false);
    } catch (error) {
      $("#EditLeaveModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoading(false);
    }
    fetchAllLeaves();
    fetchHRLeaveHistory();
  };

  return (
    <>
      <div
        className="modal fade"
        id="EditLeaveModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Update Leave Application
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
              <form onSubmit={handleEditLeave}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start_date">Start</label>
                      {hrEdit?.leave_marker === "On Leave" ? (
                        <input
                          type="date"
                          name="start_date"
                          value={leave.start_date?.split("T")[0]}
                          className="form-control "
                          readOnly
                        />
                      ) : (
                        <input
                          type="date"
                          name="start_date"
                          value={leave.start_date?.split("T")[0]}
                          onChange={handleFormChange}
                          className="form-control "
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date">Last Day of Leave</label>
                      <input
                        type="date"
                        name="end_date"
                        value={leave.end_date?.split("T")[0]}
                        onChange={handleFormChange}
                        className="form-control "
                        min={leave.start_date?.split("T")[0]}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="reasons_for_update">
                        Reason for Update
                      </label>
                      <textarea
                        name="reasons_for_update"
                        className="form-control "
                        value={leave.reasons_for_update}
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
}

export default EditAdminLeaveModal;
