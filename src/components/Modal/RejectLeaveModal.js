/** @format */

import React, { useState, useCallback } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import axiosInstance from '../../services/api';
import { REJECT_LEAVE } from '../FormJSON/CreateLeave';
import { useAppContext } from '../../Context/AppContext';

function RejectLeaveModal({
  closeModal,
  rejectLeave,
  fetchReporteesLeaves,
}) {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(REJECT_LEAVE);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleRejectLeave = useCallback(async () => {
      const id = rejectLeave._id;
      setLoading(true);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axiosInstance.post(`leads-leave-rejection/${id}`, leave)
        showAlert(true, 'Leave Rejected', 'alert alert-success');
  
        fetchReporteesLeaves();
        closeModal(false);
      } catch (error) {
        console.log(error);
      }
  }, [closeModal, fetchReporteesLeaves, leave, rejectLeave._id, showAlert])

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
                  <label htmlFor="rejection_reason">
                    Reason for Rejection
                  </label>
                  <textarea
                    name="rejection_reason"
                    className="form-control rejection-textarea"
                    value={leave.reason_for_application}
                    onChange={handleFormChange}
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
                    'Submit'
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

export default RejectLeaveModal;
