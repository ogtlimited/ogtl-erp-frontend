/** @format */

import React, { useState, useEffect } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import axiosInstance from '../../services/api';
import { CREATE_LEAVE } from '../FormJSON/CreateLeave';
// import $ from 'jquery';
import { useAppContext } from '../../Context/AppContext';

function RejectLeaveModal({
  closeModal,
  rejectLeave,
  fetchYourLeaves,
  fetchReporteesLeaves,
}) {
  console.log('Reject this leave', rejectLeave);
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(CREATE_LEAVE);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleRejectLeave = async (id) => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      // const res = await axiosInstance.patch(`/api/deactivate/client-account/${id}`);
      console.log('rejection reason', leave);
      showAlert(true, 'Leave Rejected', 'alert alert-success');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
    fetchYourLeaves();
    fetchReporteesLeaves();
    closeModal(false);
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
                  <label htmlFor="reason_for_application">
                    Reason for Rejection
                  </label>
                  <textarea
                    name="reason_for_application"
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
