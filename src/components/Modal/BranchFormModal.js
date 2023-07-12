/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const BranchFormModal = ({ mode, data, fetchAllBranches }) => {
  const { showAlert } = useAppContext();
  const [branch, setBranch] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBranch(data);
  }, [data]);


  const cancelEvent = () => {
    setBranch(data);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setBranch({
      ...branch,
      [e.target.name]: e.target.value,
    });
  };

  const handleBranchActions = async (e) => {
    if (mode === "Create") {
      return handleCreateBranch(e);
    } else {
      return handleEditBranch(e);
    }
  };

  const handleCreateBranch = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(`/api/v1/branches.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: branch.title,
          state: branch.state,
          country: branch.country,
        },
      });

      showAlert(
        true,
        "Branch successfully created",
        "alert alert-success"
      );
      fetchAllBranches();
      $("#BranchFormModal").modal("toggle");
      setBranch(data);
      setLoading(false);
    } catch (error) {
      showAlert(
        true,
        "Something went wrong, please try again",
        "alert alert-danger"
      );
      setLoading(false);
    }
  }

  const handleEditBranch = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(`/api/v1/branches/${branch.id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: branch.title,
          state: branch.state,
          country: branch.country,
        },
      });

      showAlert(
        true,
        "Branch successfully updated",
        "alert alert-success"
      );
      fetchAllBranches();
      $("#BranchFormModal").modal("toggle");
      setBranch(data);
      setLoading(false);
    } catch (error) {
      showAlert(
        true,
        "Something went wrong, please try again",
        "alert alert-danger"
      );
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="modal fade"
        id="BranchFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Branch
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
              <form onSubmit={handleBranchActions}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Branch</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={branch.title}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        name="state"
                        type="text"
                        className="form-control"
                        value={branch.state}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <input
                        name="country"
                        type="text"
                        className="form-control"
                        value={branch.country}
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
