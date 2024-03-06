/** @format */

import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const IWDFormModal = ({ fetchAllQuotes }) => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    message: "",
    image: null,
  });

  const cancelEvent = () => {
    setData({
      message: "",
      image: null,
    });
  };

  const handleFormChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };

  const handleCreateIWDMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("message", data.message);
    formData.append("image", data.image);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/womens_day_events.json`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        "You International Women's Day Message have been created successfully!",
        "alert alert-success"
      );
      fetchAllQuotes();
      $("#IWDFormModal").modal("toggle");
      cancelEvent();
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#IWDFormModal").modal("toggle");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="IWDFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                International Women's Day Message
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
              <form onSubmit={handleCreateIWDMessage}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="image">Image</label>
                      <input
                        name="image"
                        type="file"
                        accept="image/*"
                        className="form-control"
                        placeholder="Click to upload "
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        name="message"
                        type="text"
                        className="form-control"
                        value={data?.message}
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
