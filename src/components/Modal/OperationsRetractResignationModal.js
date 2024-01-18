import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";

function OperationsRetractResignationModal({
  setmodalType,
  resignationContent,
  fetchOperationsResignations,
}) {
  const { showAlert } = useAppContext();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Retract Resignation:
  const handleRetractResignation = async (e) => {
    e.preventDefault();

    const id = resignationContent.id;
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/operation_team_resignation_retractions/${id}.json`,
        {
          payload: {
            retraction_reason: data,
          },
        }
      );

      showAlert(
        true,
        `${resignationContent?.full_name} resignation has been retracted!`,
        "alert alert-info"
      );

      fetchOperationsResignations();
      setmodalType("");
      setLoading(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoading(false);
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
            <form onSubmit={handleRetractResignation}>
              <div>
                <div className="form-group">
                  <label htmlFor="retraction_reason">
                    Reason for Retraction
                  </label>
                  <textarea
                    name="retraction_reason"
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

export default OperationsRetractResignationModal;
