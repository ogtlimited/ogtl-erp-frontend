/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const DesignationFormModal = ({ mode, data, fetchDesignations }) => {
  const { showAlert } = useAppContext();
  const [designation, setDesignation] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setDesignation(data);
  }, [data]);


  const cancelEvent = () => {
    setDesignation(designation);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setDesignation({
      ...designation,
      [e.target.name]: e.target.value,
    });
  };

  const handleDesignationActions = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = designation.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(`/api/v1/designations/${id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: designation.title,
          leave_approval_level: Number(designation.leave_approval_level),
          deleted: designation.deleted,
          operation_office_id: designation.operation_office_id,
        },
      });

      console.log("designation response:", response)

      showAlert(
        true,
        "Designation successfully updated",
        "alert alert-success"
      );
      fetchDesignations();
      $("#DesignationFormModal").modal("toggle");
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="DesignationFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Designation
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleDesignationActions}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Designation</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={designation.title}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leave_approval_level">Approval Level</label>
                      <input
                        name="leave_approval_level"
                        type="number"
                        className="form-control"
                        value={designation.leave_approval_level}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  {mode === "Create" && <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={cancelEvent}
                  >
                    Cancel
                  </button>}
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
      </div>
    </>
  );
};
