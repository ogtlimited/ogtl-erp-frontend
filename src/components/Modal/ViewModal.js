import React from "react";

const ViewModal = ({title, content,}) => {
  return (
    <div
      id="generalModal"
      class="modal custom-modal fade show"
      role="dialog"
      aria-modal="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
              {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
