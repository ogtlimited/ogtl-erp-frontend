/** @format */

import React, { useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import axiosInstance from '../../services/api';
import { REQUEST_EDIT } from '../FormJSON/CreateLeave';
import { useAppContext } from '../../Context/AppContext';

function RequestEditModal({
  closeModal,
  requestEdit,
  loading,
  setLoading,
  fetchReporteesLeaves,
}) {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(REQUEST_EDIT);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleRequestEditLeave = async (e) => {
    e.preventDefault();
    const id = requestEdit._id;
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/leads-leave-applications/request-modification?_id=${id}`,
        leave
      );
      showAlert(true, 'Modification Request Sent Successfully', 'alert alert-success');

      closeModal(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log('Leave Modification error:', error.response);
      setLoading(false);
    }
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
            <form onSubmit={handleRequestEditLeave}>
              <div>
                <div className="form-group">
                  <label htmlFor="reasons">Reason for Modification</label>
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

export default RequestEditModal;
