// *IN USE

import React, { useState } from "react";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import $ from "jquery";

function DeductionReversalModal({ selectedRow, fetchDeductions }) {
  const { showAlert, goToTop } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    hr_deduction_id: "",
    reason: "",
  });

  const cancelEvent = () => {
    setData({
      hr_deduction_id: "",
      reason: "",
    });
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle Deduction Reversal:
  const handleReverseDeductions = async (e) => {
    e.preventDefault();

    const id = selectedRow?.deduction?.id;

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/deduction_reversals.json`,
        {
          payload: {
            hr_deduction_id: id,
            reason: data.reason,
          },
        }
      );

      showAlert(
        true,
        `${selectedRow?.employeeName} deduction has been reversed successfully`,
        "alert alert-success"
      );
      $("#DeductionReversalFormModal").modal("toggle");
      fetchDeductions();
      setLoading(false);
      goToTop();
      cancelEvent();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      goToTop();
      $("#DeductionReversalFormModal").modal("toggle");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="DeductionReversalFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Reverse Deduction
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
              <form onSubmit={handleReverseDeductions}>
                <div>
                  <div className="form-group">
                    <label htmlFor="reason">Reason for Reversal</label>
                    <textarea
                      name="reason"
                      className="form-control rejection-textarea"
                      value={data.reason}
                      onChange={handleFormChange}
                      required
                    />
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
}

export default DeductionReversalModal;
