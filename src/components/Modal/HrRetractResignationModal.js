import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";

function HrRetractResignationModal({
  setmodalType,
  resignationContent,
  url,
  fetchHrResignations,
}) {
  const { showAlert, goToTop } = useAppContext();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Retract Resignation:
  const handleRetractResignation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(url, {
        payload: {
          retraction_reason: data,
        },
      });

      showAlert(
        true,
        `${resignationContent?.full_name} resignation has been retracted!`,
        "alert alert-info"
      );

      setLoading(false);
      setmodalType("");
      goToTop();

      fetchHrResignations();
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

export default HrRetractResignationModal;
