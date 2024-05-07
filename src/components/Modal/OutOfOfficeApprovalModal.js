import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";

function OutOfOfficeApprovalModal({
  setmodalType,
  modalContent,
  refetchData,
}) {
  const { showAlert } = useAppContext();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Approve Out of Office:
  const handleApproveOutOfOffice = async (e) => {
    e.preventDefault();

    const id = modalContent.id;
    setLoading(true);
    
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/out_of_office_approval/${id}.json`,
        {
          payload: {
            reason: data,
          },
        }
      );

      showAlert(
        true,
        `${modalContent?.full_name} Out of Office has been approved!`,
        "alert alert-success"
      );

      refetchData();
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
            <form onSubmit={handleApproveOutOfOffice}>
              <div>
                <div className="form-group">
                  <label htmlFor="reason">
                    Reason for Approval
                  </label>
                  <textarea
                    name="reason"
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

export default OutOfOfficeApprovalModal;
