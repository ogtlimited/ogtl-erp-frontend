/*eslint-disable no-unused-vars*/

import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../Context/AppContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../services/api';
import $ from 'jquery';
import  secureLocalStorage  from  "react-secure-storage";

export const EditCampaignScheduleTitleModal = ({ fetchAllSchedule, editSchedule }) => {
  const { showAlert } = useAppContext();
  const [editCampaignSchedule, setEditCampaignSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = JSON.parse(secureLocalStorage.getItem('user'));


  useEffect(() => {
    setEditCampaignSchedule(editSchedule);
  }, [editSchedule]);

  const cancelEvent = () => {
    $('#EditCampaignScheduleTitleFormModal').modal('toggle');
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setEditCampaignSchedule({
      ...editCampaignSchedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditCampaignSchedule = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/campaign-schedules/${editSchedule._id}`, {
        title: editCampaignSchedule.title,
      });

      showAlert(
        true,
        `Campaign schedule title updated successfully!`,
        'alert alert-success'
      );
      $('#EditCampaignScheduleTitleFormModal').modal('toggle');
      setLoading(false);
      fetchAllSchedule();
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
        id="EditCampaignScheduleTitleFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit Title
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
              <form onSubmit={handleEditCampaignSchedule}>
                <div className="row">

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={editCampaignSchedule.title}
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
