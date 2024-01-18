import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";

function HrManagerResignationFeedbackModal({
  setmodalType,
  resignationContent,
  fetchHrManagerResignations,
}) {
  const { showAlert, 
    goToTop } = useAppContext();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Resignation Feedback:
  const handleResignationFeedback = async (e) => {
    e.preventDefault();

    const id = resignationContent.id;
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/hr_manager_approve_resignations/${id}.json`,
        {
          payload: {
            feedback: data,
          },
        }
      );

      showAlert(
        true,
        `${resignationContent?.full_name} resignation has been successfully approved!`,
        "alert alert-success"
      );

      fetchHrManagerResignations();
      setmodalType("");
      setLoading(false);
      goToTop();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoading(false);
      goToTop();
    }
  };

  return (
    <>
      <div className="deactivate-modal">
        <div className="deactivate-modal-container">
          <RiCloseCircleFill
            className="deactivate-modal-close"
            onClick={() => setmodalType("")}
          />
          <div className="rejection-modal-body">
            <form onSubmit={handleResignationFeedback}>
              <div>
                <div className="form-group">
                  <label htmlFor="feedback">
                    Feedback
                  </label>
                  <textarea
                    name="feedback"
                    className="form-control rejection-textarea"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setmodalType("")}
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
    </>
  );
}

export default HrManagerResignationFeedbackModal;
