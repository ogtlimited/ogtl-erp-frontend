/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const DepartmentFormModal = ({ mode, data, fetchAllDepartments }) => {
  const { showAlert, goToTop } = useAppContext();
  const [office, setOffice] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOffice(data);
  }, [data]);

  const cancelEvent = () => {
    setOffice(data);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setOffice({
      ...office,
      [e.target.name]: e.target.value,
    });
  };

  const handleDepartmentAction = async (e) => {
    if (mode === "Create") {
      return handleCreateDepartment(e);
    } else {
      return handleEditDepartment(e);
    }
  };

  const handleCreateDepartment = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(`/api/v1/departments.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: office.title,
          leave_approval_level: +office.leave_approval_level,
        },
      });

      goToTop();
      showAlert(true, `Department successfully created`, "alert alert-success");
      fetchAllDepartments();
      $("#DepartmentFormModal").modal("toggle");

      setOffice(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DepartmentFormModal").modal("toggle");

      setLoading(false);
    }
  };

  const handleEditDepartment = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = office.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(`/api/v1/departments/${id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: office.title,
          leave_approval_level: +office.leave_approval_level,
        },
      });

      goToTop();
      showAlert(true, `Department successfully updated`, "alert alert-success");
      fetchAllDepartments();
      $("#DepartmentFormModal").modal("toggle");

      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DepartmentFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="DepartmentFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Department
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
              <form onSubmit={handleDepartmentAction}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={office.title}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leave_approval_level">
                        Leave Approval Level
                      </label>
                      <input
                        name="leave_approval_level"
                        type="number"
                        className="form-control"
                        value={office.leave_approval_level}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  {mode === "Create" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                  )}
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
