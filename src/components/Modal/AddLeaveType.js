/** @format */

import React, { useState, useEffect } from 'react';
import { CREATE_LEAVE_TYPE } from '../FormJSON/CreateLeave';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import $ from 'jquery';
import  secureLocalStorage  from  "react-secure-storage";

export const AddLeaveTypeModal = ({ fetchLeaveType }) => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState(CREATE_LEAVE_TYPE);
  const user = JSON.parse(secureLocalStorage.getItem('user'));

  const cancelEvent = () => {
    setLeaveType(CREATE_LEAVE_TYPE);
  }

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeaveType({ ...leaveType, [e.target.name]: e.target.value });
  };

  const handleCreateLeaveType = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post('/leave-type', leaveType);
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;

      showAlert(true, 'Leave type created', 'alert alert-success');
      fetchLeaveType()
      setLeaveType(CREATE_LEAVE_TYPE);
      $('#FormModal').modal('toggle');
    } catch (error) {
      const errorMsg = error.response?.data?.message
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
    }
    setLoading(false);
  };


  return (
    <>
      <div
        className="modal fade"
        id="FormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Leave Application
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
              <form onSubmit={handleCreateLeaveType}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leave_type">Leave Type</label>
                      <input
                        type="text"
                        name="leave_type"
                        value={leaveType.leave_type}
                        onChange={handleFormChange}
                        className="form-control "
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
                      'Submit'
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
