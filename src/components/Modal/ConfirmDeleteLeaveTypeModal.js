/** @format */

import React from 'react';
import $ from 'jquery';
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";

const ConfirmDeleteLeaveTypeModal = ({
  title,
  typeToDelete,
  fetchLeaveType,
}) => {
  const { showAlert } = useAppContext();

  const deleteLeaveType = async (typeToDelete) => {
    const id = typeToDelete._id
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(`/leave-type/${id}`)
      showAlert(true, "Leave Type Deleted", "alert alert-success");
      $("#exampleModal").modal("toggle");
      fetchLeaveType();
    } catch (error) {
      console.log(error.response)
      showAlert(true, error.response.data.message, "alert alert-danger");
    }
  };

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
            <div className="modal-body">Are you sure you want to delete?</div>
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
                onClick={() => deleteLeaveType(typeToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteLeaveTypeModal;
