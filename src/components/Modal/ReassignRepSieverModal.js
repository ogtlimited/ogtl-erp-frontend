/** @format */

import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const ReassignRepSieverModal = ({ fetchRepSievers, selectedRow }) => {
  const { showAlert } = useAppContext();
  const [data, setData] = useState({
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  const cancelEvent = () => {
    setData({
      start_date: "",
      end_date: "",
    });
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleReassignRepSiever = async (e) => {
    e.preventDefault();

    const dataPayload = {
      start_date: data.start_date,
      end_date: data.end_date,
    };

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/hr_dashboard/reassign_rep_sievers/${selectedRow?.ogid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: dataPayload,
        }
      );

      showAlert(
        true,
        `You have successfully reassigned ${selectedRow?.full_name}`,
        "alert alert-success"
      );
      fetchRepSievers();
      setData({
        start_date: "",
        end_date: "",
      });
      $("#ReassignRepSieverFormModal").modal("toggle");
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="ReassignRepSieverFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {selectedRow?.full_name}
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
              <form onSubmit={handleReassignRepSiever}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start_date">Start Date</label>
                      <input
                        type="date"
                        name="start_date"
                        value={data.start_date}
                        onChange={handleFormChange}
                        className="form-control "
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date">End Date</label>
                      <input
                        type="date"
                        name="end_date"
                        value={data.end_date}
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
