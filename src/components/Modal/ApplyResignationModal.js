/** @format */

import React, { useState, useEffect } from 'react';
import { CREATE_RESIGNATION } from '../FormJSON/CreateResignation';
import { useAppContext } from '../../Context/AppContext';
import tokenService from '../../services/token.service';
import axiosInstance from '../../services/api';
import $ from 'jquery';
import ms from 'ms';
import moment from 'moment';

export const ApplyResignationModal = ({ fetchYourResignation }) => {
  const { showAlert } = useAppContext();
  const [resignation, setResignation] = useState(CREATE_RESIGNATION);
  const [loading, setLoading] = useState(false);
  const user = tokenService.getUser();

  const [today, setToday] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    const time = new Date().toDateString();
    const today_date = moment(time).format('yyyy-MM-DD');
    setToday(today_date);
    const minSec = ms('15d');
    const min_date = new Date(+new Date(today) + minSec);
    setMinDate(moment(min_date).format('yyyy-MM-DD'));
  }, [today, user.leaveCount]);

  const cancelEvent = () => {
    setResignation(CREATE_RESIGNATION);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setResignation({ ...resignation, [e.target.name]: e.target.value });
  };

  const handleApplyResignation = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post('/Exit', {
        ...resignation,
        employee_id: user._id,
      });
      // eslint-disable-next-line no-unused-vars
      const resData = res?.data?.data;
      console.log("Created Resignation application", resData)

      showAlert(
        true,
        'Your resignation application is successful, please await an approval',
        'alert alert-success'
      );
      // fetchYourResignation();
      setResignation(CREATE_RESIGNATION);
      $('#ResignationFormModal').modal('toggle');
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="ResignationFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Resignation Form
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
              <form onSubmit={handleApplyResignation}>
                <div className="row">
                  

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="effective_date">Effective Date</label>
                        <input
                          type="date"
                          name="effective_date"
                          value={resignation.effective_date}
                          onChange={handleFormChange}
                          className="form-control "
                          min={minDate}
                          required
                        />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="reason_for_resignation">
                        Reason for Resignation
                      </label>
                      <textarea
                        name="reason_for_resignation"
                        className="form-control "
                        value={resignation.reason_for_resignation}
                        onChange={handleFormChange}
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
