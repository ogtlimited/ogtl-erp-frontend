/* eslint-disable no-unused-vars */
/** @format */

import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import axiosInstance from "../../services/api";
import { HR_CANCEL_LEAVE } from "../FormJSON/CreateLeave";
import { useAppContext } from "../../Context/AppContext";

function CancelAdminLeaveModal({
  closeModal,
  hrCancel,
  fetchAllLeaves,
  fetchHRLeaveHistory,
}) {
  const { showAlert, fetchHRLeavesNotificationCount } = useAppContext();
  const [leave, setLeave] = useState(HR_CANCEL_LEAVE);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleCancelLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = hrCancel.leave?.id;

    const firstName = hrCancel?.first_name
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
    const lastName = hrCancel?.last_name
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());

    const fullName = firstName + " " + lastName;

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/leaves_cancellation/${id}.json`,
        {
          payload: leave,
        }
      );

      showAlert(
        true,
        `${fullName} Leave has been Cancelled!`,
        "alert alert-info"
      );

      closeModal(false);
      setLoading(false);	
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoading(false);
    }
    fetchAllLeaves();
    fetchHRLeaveHistory();
    fetchHRLeavesNotificationCount();
  };

  return (
    <>
      <div className="deactivate-modal">
        <div className="deactivate-modal-container">
          <RiCloseCircleFill
            className="deactivate-modal-close"
            onClick={() => closeModal(false)}
          />
          <div className="rejection-modal-body">
            <form onSubmit={handleCancelLeave}>
              <div>
                <div className="form-group">
                  <label htmlFor="reason_for_cancellation">
                    Reason for Cancellation
                  </label>
                  <textarea
                    name="reason_for_cancellation"
                    className="form-control rejection-textarea"
                    value={leave.reason_for_cancellation}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => closeModal(false)}
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
    </>
  );
}

export default CancelAdminLeaveModal;
