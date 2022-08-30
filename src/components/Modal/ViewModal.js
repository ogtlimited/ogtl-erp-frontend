import React from "react";

const ViewModal = ({title, content,}) => {
  return (
    <div
      id="generalModal"
      className="modal custom-modal fade show "
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
              {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
