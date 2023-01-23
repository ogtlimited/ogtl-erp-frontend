/** @format */

import React, { useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import axiosInstance from '../../services/api';
import { APPEAL_REJECTION } from '../FormJSON/CreateLeave';
import { useAppContext } from '../../Context/AppContext';

function AppealRejectionModal({
  closeModal,
  appealRejection,
  loading,
  setLoading,
  fetchYourLeaves,
  fetchReporteesLeaves,
}) {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(APPEAL_REJECTION);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleAppealRejection = async (e) => {
    e.preventDefault();
    const id = appealRejection._id;
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/leave-application/appeal-rejected-leave?_id=${id}`,
        leave
      );
      showAlert(true, 'Appeal Sent Successfully', 'alert alert-success');
      closeModal(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log('Appeal Rejection error:', error.response);
      setLoading(false);
    }
    fetchYourLeaves();
    fetchReporteesLeaves();
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
            <form onSubmit={handleAppealRejection}>
              <div>
                <div className="form-group">
                  <label htmlFor="reasons">Appeal Rejection</label>
                  <textarea
                    name="reasons"
                    className="form-control rejection-textarea"
                    value={leave.reasons}
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

export default AppealRejectionModal;
