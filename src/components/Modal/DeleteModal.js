import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const DeleteModal = ({
  title,
  selectedRow,
  deleteFunction,
  message,
  isLoading,
}) => {
  return (
    <div
      className="modal confirm_modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              {title}
            </h5>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <>
              {isLoading ? (
                <button type="button" className="btn btn-primary">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    pulse
                    // style={{ margin: "0 10px" }}
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    deleteFunction(selectedRow);
                  }}
                >
                  Confirm
                </button>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
