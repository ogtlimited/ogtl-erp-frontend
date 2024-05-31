import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";

function TicketManagementFeedbackModal({
  setmodalType,
  ticketContent,
  refetchData,
}) {
  const { showAlert, goToTop } = useAppContext();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Ticket Feedback:
  const handleTicketFeedback = async (e) => {
    e.preventDefault();

    const id = ticketContent.id;
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/resolve_tickets/${id}.json`,
        {
          payload: {
            resolved: true,
            feedback: data,
          },
        }
      );

      showAlert(
        true,
        `Ticket has been Resolved Successfully`,
        "alert alert-info"
      );

      refetchData();
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
            <form onSubmit={handleTicketFeedback}>
              <div>
                <div className="form-group">
                  <label htmlFor="feedback">Feedback</label>
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

export default TicketManagementFeedbackModal;
