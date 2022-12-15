/** @format */

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../Context/AppContext';
import { LeaveApplicationFormJSON } from '../FormJSON/HR/Leave/application';
import { EDIT_LEAVE } from '../FormJSON/CreateLeave';
import axiosInstance from '../../services/api';
import $ from 'jquery';

export const EditLeaveModal = ({ editLeave, fetchYourLeaves }) => {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(EDIT_LEAVE);
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState([]);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleEditLeave = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = editLeave._id;
    try {
      const res = await axiosInstance.put(
        `leave-application/${id}`,
        {
          leave_type: leave.leave_type,
          from_date: new Date(leave.from_date).toISOString(),
          to_date: new Date(leave.to_date).toISOString(),
          reason_for_application: leave.reason_for_application,
        }
      );
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;
      console.log(resData);

      showAlert(
        true,
        'Your leave application has been successfully updated, please await an approval',
        'alert alert-success'
      );
      fetchYourLeaves();
      $('#EditModal').modal('toggle');
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
    }
    setLoading(false);
  };

  useEffect(() => {
    setLeave(editLeave);
    const fetchLeavesType = () => {
      const types = LeaveApplicationFormJSON.Fields[0].options;
      setLeaveType(types);
    };
    fetchLeavesType();
  }, [editLeave]);

  return (
    <>
      <div
        className="modal fade"
        id="EditModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit Leave Application
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
                      <label htmlFor="from_date">From Date</label>
                      <input
                        type="date"
                        name="from_date"
                        value={leave.from_date}
                        onChange={handleFormChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="to_date">To Date</label>
                      <input
                        type="date"
                        name="to_date"
                        value={leave.to_date}
                        onChange={handleFormChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leave_type_id">Leave Type</label>
                      <select
                        onChange={handleFormChange}
                        className="form-control "
                        name="leave_type_id"
                      >
                        <option value="" disabled selected hidden>
                          Select leave type...
                        </option>
                        {leaveType.map((leave, idx) => (
                          <option
                            key={idx}
                            value={leave.value}
                            placeholder="Leave Type"
                          >
                            {leave.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="reason_for_application">Reason</label>
                      <textarea
                        name="reason_for_application"
                        className="form-control "
                        value={leave.reason_for_application}
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
