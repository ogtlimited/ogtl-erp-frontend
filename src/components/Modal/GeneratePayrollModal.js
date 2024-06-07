import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import moment from "moment";
import secureLocalStorage from "react-secure-storage";
import $ from "jquery";

export const GeneratePayrollModal = ({
  fetchAllBatches,
  payday,
  // handlePayslipPooling,
}) => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);

  const currentMonth = moment().format("MM");
  const currentYear = moment().format("YYYY");

  const [createPayslips, setCreatePayslips] = useState({
    monthAndYear: `${currentYear}-${currentMonth}`,
  });

  const cancelEvent = () => {
    setCreatePayslips({
      monthAndYear: `${currentYear}-${currentMonth}`,
    });
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

    secureLocalStorage.setItem("payslipMonth", month);
    secureLocalStorage.setItem("payslipYear", year);

    try {
      // eslint-disable-next-line no-unused-vars
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

      const msg = res?.data?.data?.message;

      showAlert(true, msg, "alert alert-success");
      $("#GeneratePayrollModal").modal("toggle");
      fetchAllBatches();
      // handlePayslipPooling();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  function getMinMonth() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    if (currentMonth === 12) {
      return `${currentYear}-${currentMonth}`;
    }

    return `${currentYear}-${currentMonth.toString().padStart(2, "0")}`;
  }

  function getMaxMonth() {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const year = nextMonth.getFullYear();
    const month = nextMonth.getMonth() + 1;

    return `${year}-${month.toString().padStart(2, "0")}`;
  }

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
                Generate Payroll{" "}
                {payday && (
                  <>
                    for <strong> {payday} </strong>
                    {currentYear}
                  </>
                )}
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
                      <label htmlFor="monthAndYear">Select Month</label>
                      <input
                        name="monthAndYear"
                        type="month"
                        className="form-control"
                        value={createPayslips?.monthAndYear}
                        onChange={handleFormChange}
                        min={getMinMonth()}
                        max={getMaxMonth()}
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
