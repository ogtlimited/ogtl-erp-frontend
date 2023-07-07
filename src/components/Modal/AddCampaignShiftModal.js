/*eslint-disable no-unused-vars*/

import React, { useState, useEffect } from 'react';
import { create_campaign_shifts } from '../FormJSON/CreateLeaveApprovalLevel';
import { useAppContext } from '../../Context/AppContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../services/api';
import $ from 'jquery';
import  secureLocalStorage  from  "react-secure-storage";

export const AddCampaignShiftModal = ({ fetchCampaignShift, campaign }) => {
  const { id } = useParams();
  const { showAlert } = useAppContext();
  const [createCampaignShift, setCreateCampaignShift] = useState(
    create_campaign_shifts
  );
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(secureLocalStorage.getItem('user'));

  const cancelEvent = () => {
    setCreateCampaignShift(create_campaign_shifts);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setCreateCampaignShift({
      ...createCampaignShift,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCampaignShift = async (e) => {
    e.preventDefault();

    function convertH2M(timeInHour) {
      var timeParts = timeInHour.split(':');
      return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }

    function toHoursAndMinutes(totalMinutes) {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);
      return `${hours < 1 ? hours + 24 : hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/shiftType', {
        ...createCampaignShift,
        campaignId: id,
        expectedWorkTime: toHoursAndMinutes(
          convertH2M(createCampaignShift.end_time) -
            convertH2M(createCampaignShift.start_time)
        ),
      });
      const resData = res?.data?.data;

      showAlert(
        true,
        `${campaign} shift created successfully!`,
        'alert alert-success'
      );
      setCreateCampaignShift(create_campaign_shifts);
      $('#CampaignShiftFormModal').modal('toggle');
      setLoading(false);
      fetchCampaignShift();
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="CampaignShiftFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Create {campaign} shift
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
              <form onSubmit={handleCreateCampaignShift}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="shift_name">Shift Name</label>
                      <input
                        name="shift_name"
                        type="text"
                        className="form-control"
                        value={createCampaignShift.shift_name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="start_time">Start Time</label>
                      <input
                        name="start_time"
                        type="time"
                        className="form-control"
                        value={createCampaignShift.start_time}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="end_time">End Time</label>
                      <input
                        name="end_time"
                        type="time"
                        className="form-control"
                        value={createCampaignShift.end_time}
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
