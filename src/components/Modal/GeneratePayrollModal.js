/* eslint-disable no-unused-vars */
/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import secureLocalStorage from "react-secure-storage";

export const GeneratePayrollModal = ({
  fetchEmployeeSalarySlip,
  setGenerating,
}) => {
  const { showAlert } = useAppContext();
  const [createPayslips, setCreatePayslips] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const cancelEvent = () => {
    setCreatePayslips("");
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setCreatePayslips({
      ...createPayslips,
      [e.target.name]: e.target.value,
    });
  };

  const handleGeneratePayroll = async (e) => {
    e.preventDefault();

    setLoading(true);

    const month = createPayslips.monthAndYear.split("-")[1];
    const year = createPayslips.monthAndYear.split("-")[0];

    try {
      const res = await axiosInstance.post(
        `/api/v1/salary_slips.json?month=${month}&year=${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        `Salary slips are being generated`,
        "alert alert-success"
      );
      setCreatePayslips("");
      $("#GeneratePayrollModal").modal("toggle");
      fetchEmployeeSalarySlip();
      setGenerating(false);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
      setGenerating(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="GeneratePayrollModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-l">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Generate Payroll
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
              <form onSubmit={handleGeneratePayroll}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="monthAndYear">Select Month & Year</label>
                      <input
                        name="monthAndYear"
                        type="month"
                        className="form-control"
                        value={createPayslips.month}
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
                      "Generate Payroll"
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
