/* eslint-disable no-unused-vars */
/** @format */

import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import axiosInstance from "../../services/api";
import { REJECT_LEAVE } from "../FormJSON/CreateLeave";
import { useAppContext } from "../../Context/AppContext";

function RejectWorkforceLeaveModal({
  closeModal,
  dataManagerReject,
  fetchAllLeaves,
  fetchWorkforceLeaveHistory,
}) {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(REJECT_LEAVE);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleRejectLeave = async (e) => {
    e.preventDefault();
    const id = dataManagerReject.id;
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/workforce_reject_leave/${id}.json`,
        {
          payload: leave,
        }
      );

      showAlert(true, "Leave Rejected", "alert alert-info");

      closeModal(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
    fetchAllLeaves();
    fetchWorkforceLeaveHistory();
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
            <form onSubmit={handleRejectLeave}>
              <div>
                <div className="form-group">
                  <label htmlFor="rejection_reason">Reason for Rejection</label>
                  <textarea
                    name="rejection_reason"
                    className="form-control rejection-textarea"
                    value={leave.rejection_reason}
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

export default RejectWorkforceLeaveModal;
