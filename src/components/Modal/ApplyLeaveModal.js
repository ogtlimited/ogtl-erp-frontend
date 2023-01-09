/** @format */

import React, { useState, useEffect } from 'react';
import { CREATE_LEAVE } from '../FormJSON/CreateLeave';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import $ from 'jquery';
import ms from 'ms';
import moment from 'moment';

export const ApplyLeaveModal = ({ fetchYourLeaves }) => {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(CREATE_LEAVE);
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const [leaveTypeTitle, setLeaveTypeTitle] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const [today, setToday] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    const time = new Date().toDateString();
    const today_date = moment(time).format('yyyy-MM-DD');
    setToday(today_date);
    const minSec = ms('15d');
    const leaveDays = user.leaveCount + 15;
    const maxSec = ms(`${leaveDays}d`);
    const min_date = new Date(+new Date(today) + minSec);
    const max_date = new Date(+new Date(today) + maxSec);
    setMinDate(moment(min_date).format('yyyy-MM-DD'));
    setMaxDate(moment(max_date).format('yyyy-MM-DD'));
  }, [today, user.leaveCount]);

  const cancelEvent = () => {
    setLeave(CREATE_LEAVE);
  };

  const fetchLeavesType = async () => {
    try {
      const response = await axiosInstance.get(`leave-type`);
      const resData = response?.data?.data;

      setLeaveType(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeavesTypeById = async (leaveId) => {
    const id = leaveId;
    try {
      const response = await axiosInstance.get(`/leave-type/${id}`);
      const resData = response?.data?.data.leave_type;

      setLeaveTypeTitle(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });

    if (e.target.name === 'leave_type_id') {
      fetchLeavesTypeById(e.target.value);
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post('/leave-application', leave);
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;

      showAlert(
        true,
        'Your leave application is successful, please await an approval',
        'alert alert-success'
      );
      fetchYourLeaves();
      setLeave(CREATE_LEAVE);
      $('#FormModal').modal('toggle');
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeavesType();
  }, []);

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
              <form onSubmit={handleApplyLeave}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leave_type_id">Leave Type</label>
                      <select
                        onChange={handleFormChange}
                        className="form-control "
                        name="leave_type_id"
                        required
                      >
                        <option value="" disabled selected hidden>
                          Select leave type...
                        </option>
                        {leaveType.map((leave, idx) => (
                          <option
                            key={idx}
                            value={leave._id}
                            placeholder="Leave Type"
                            required
                          >
                            {leave.leave_type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="reason_for_application">
                        Reason for Application
                      </label>
                      <textarea
                        name="reason_for_application"
                        className="form-control "
                        value={leave.reason_for_application}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="from_date">From Date</label>
                      {leaveTypeTitle === 'Emergency Leave' ? (
                        <input
                          type="date"
                          name="from_date"
                          value={leave.from_date}
                          onChange={handleFormChange}
                          className="form-control "
                          min={today}
                          max={maxDate}
                          required
                        />
                      ) : (
                        <input
                          type="date"
                          name="from_date"
                          value={leave.from_date}
                          onChange={handleFormChange}
                          className="form-control "
                          min={minDate}
                          max={maxDate}
                          required
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="to_date">To Date</label>
                      {leaveTypeTitle === 'Emergency Leave' ? (
                        <input
                          type="date"
                          name="to_date"
                          value={leave.to_date}
                          onChange={handleFormChange}
                          className="form-control "
                          min={today}
                          max={maxDate}
                          required
                        />
                      ) : (
                        <input
                          type="date"
                          name="to_date"
                          value={leave.to_date}
                          onChange={handleFormChange}
                          className="form-control "
                          min={minDate}
                          max={maxDate}
                          required
                        />
                      )}
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
