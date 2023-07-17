import React from "react";
import $ from "jquery";

const ConfirmModal = ({ title, selectedRow, deleteFunction, message }) => {
  return (
    <>
      <div
        className="modal fade"
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
            {message ? (
              <div className="modal-body">{message}</div>
            ) : (
              <div className="modal-body">Are you sure you want to delete?</div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteFunction(selectedRow);
                  $("#exampleModal").modal("toggle");
                }}
              >
                {message ? "Deactivate" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
