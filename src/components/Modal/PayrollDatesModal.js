/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const PayrollDatesModal = ({ mode, data, fetchAllPayrollDates }) => {
  const { showAlert } = useAppContext();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordinals, setOrdinals] = useState("");

  useEffect(() => {
    setDates(data);
  }, [data]);

  const cancelEvent = () => {
    if (mode === "Create") {
      setDates({
        day: "",
      });
      setOrdinals("");
    } else {
      setDates({
        day: dates?.generation_date,
      });
      setOrdinals(data?.payday);
    }
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    const day = e.target.value;

    setDates((prev) => ({
      ...prev,
      [e.target.name]: day,
    }));

    const generateOrdinal = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }

      const lastDigit = day % 10;
      const suffixes = ["st", "nd", "rd"];
      const suffix = suffixes[lastDigit - 1] || "th";

      return `${day}${suffix}`;
    };

    setOrdinals(generateOrdinal(day));
  };

  const handlePaydayActions = async (e) => {
    if (mode === "Create") {
      return handleGeneratePayday(e);
    } else {
      return handleEditPayday(e);
    }
  };

  // Handle Payroll Config - Payday Generation:
  const handleGeneratePayday = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post(`/api/v1/payroll_configs.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          generation_date: +dates?.day,
        },
      });

      showAlert(
        true,
        `Payday (${ordinals}) has been created successfully.`,
        "alert alert-success"
      );
      $("#PayrollDatesModal").modal("toggle");
      fetchAllPayrollDates();
      cancelEvent();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  // Handle Payroll Config - Payday Assignment:
  const handleEditPayday = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post(`/api/v1/payroll_configs.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          generation_date: +dates?.day,
        },
      });

      showAlert(
        true,
        `Payday (${ordinals}) has been updated successfully.`,
        "alert alert-success"
      );
      $("#PayrollDatesModal").modal("toggle");
      fetchAllPayrollDates();
      cancelEvent();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="PayrollDatesModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-l">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode === "Edit" ? "Update" : mode} Payday
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
              <form onSubmit={handlePaydayActions}>
                <div className="row">
                  <div className="col-md-9">
                    <div className="form-group">
                      <label htmlFor="day">
                        Enter a day when payroll should be generated
                      </label>
                      {mode === "Create" ? (
                        <input
                          name="day"
                          type="number"
                          className="form-control"
                          value={dates?.day}
                          onChange={handleFormChange}
                          min={1}
                          max={31}
                          required
                        />
                      ) : (
                        <input
                          name="day"
                          type="number"
                          className="form-control"
                          defaultValue={dates?.generation_date}
                          onChange={handleFormChange}
                          min={1}
                          max={31}
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="ordinals">Payday</label>
                      {mode === "Create" ? (
                        <input
                          name="ordinals"
                          type="text"
                          className="form-control"
                          value={ordinals}
                          readOnly
                        />
                      ) : (
                        <input
                          name="ordinals"
                          type="text"
                          className="form-control"
                          defaultValue={!ordinals ? dates?.payday : ordinals}
                          readOnly
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
