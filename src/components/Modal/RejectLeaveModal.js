/** @format */

import React, { useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import axiosInstance from '../../services/api';
import { REJECT_LEAVE } from '../FormJSON/CreateLeave';
import { useAppContext } from '../../Context/AppContext';

function RejectLeaveModal({
  closeModal,
  rejectLeave,
  loading,
  setLoading,
  // fetchReporteesLeaves,
}) {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(REJECT_LEAVE);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleRejectLeave = async () => {
    setLoading(false);
      const id = rejectLeave._id;
      try {
        const response = await axiosInstance.patch(`leads-leave-rejection/${id}`, leave)
        console.log("Leave rejection response:", response)
        showAlert(true, 'Leave Rejected', 'alert alert-success');
  
        // closeModal(false);
      } catch (error) {
        console.log(error);
        console.log("Leave rejection error:", error.response)
      }
      // fetchReporteesLeaves();
  }

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
                    value={leave.rejection_reason}
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
                  Submit
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
