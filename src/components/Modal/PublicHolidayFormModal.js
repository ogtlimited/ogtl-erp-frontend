/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import moment from "moment";
import $ from "jquery";

export const PublicHolidayFormModal = ({ mode, data, refetchData }) => {
  const { fetchPublicHolidays, fetchAllPublicHolidays, showAlert, goToTop } = useAppContext();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");

  useEffect(() => {
    if (mode === "Create") {
      setFormData(data);
    } else {
      setFormData({
        ...data,
        start_date: moment(data?.start_date).utc().format('YYYY-MM-DDTHH:mm'),
        end_date: moment(data?.end_date).utc().format('YYYY-MM-DDTHH:mm'),
      })
    }
  }, [data, mode]);

  const cancelEvent = () => {
    setFormData(data);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublicHolidayAction = async (e) => {
    if (mode === "Create") {
      return handleCreatePublicHoliday(e);
    } else {
      return handleEditPublicHoliday(e);
    }
  };

  const handleCreatePublicHoliday = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/public_holidays.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: formData?.title,
            start_date: formData?.start_date,
            end_date: formData?.end_date,
          },
        }
      );

      goToTop();
      showAlert(
        true,
        `${formData?.title} Public Holiday Successfully Created!`,
        "alert alert-success"
      );
      cancelEvent();
      refetchData();
      fetchPublicHolidays();
      fetchAllPublicHolidays();
      $("#PublicHolidayFormModal").modal("toggle");

      setFormData(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#PublicHolidayFormModal").modal("toggle");

      setLoading(false);
    }
  };

  const handleEditPublicHoliday = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/public_holidays/${formData?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: formData?.title,
            start_date: formData?.start_date,
            end_date: formData?.end_date,
          },
        }
      );

      goToTop();
      showAlert(
        true,
        `${formData?.title} Public Holiday Successfully Updated!`,
        "alert alert-success"
      );
      refetchData();
      fetchPublicHolidays();
      $("#PublicHolidayFormModal").modal("toggle");

      setFormData(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#PublicHolidayFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="PublicHolidayFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Public Holiday
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
              <form onSubmit={handlePublicHolidayAction}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={formData?.title}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start_date">Start</label>
                      <input
                        type="datetime-local"
                        name="start_date"
                        value={formData?.start_date}
                        onChange={handleFormChange}
                        className="form-control "
                        min={today_date}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date">End</label>
                      <input
                        type="datetime-local"
                        name="end_date"
                        value={formData?.end_date}
                        onChange={handleFormChange}
                        className="form-control "
                        min={formData?.start_date}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  {mode === "Create" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Submit"
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
