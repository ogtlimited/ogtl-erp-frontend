import React from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ConfirmModal = ({
  title,
  selectedRow,
  deleteFunction,
  modalType,
  message,
  isLoading,
}) => {
  return (
    <>
      <div
        className="modal confirm_modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
            </div>
            {modalType === "deactivate" ? (
              <div className="modal-body">{message}</div>
            ) : modalType === "left" ? (
              <div className="modal-body">
                Are you sure this employee has resigned?
              </div>
            ) : modalType === "terminated" ? (
              <div className="modal-body">
                Are you sure you want to terminate this employee?
              </div>
            ) : (
              <div className="modal-body">{message}</div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {modalType === "deactivate" ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteFunction(selectedRow);
                    $("#exampleModal").modal("toggle");
                  }}
                >
                  Deactivate
                </button>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
