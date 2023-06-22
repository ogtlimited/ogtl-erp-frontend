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
    setBranch(branch);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setBranch({
      ...branch,
      [e.target.name]: e.target.value,
    });
  };

  const handleBranchActions = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = branch.id;
    try {
      // eslint-disable-next-line no-unused-vars
      // const response = await axiosInstance.patch(`/api/v1/branches/${id}.json`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //     "ngrok-skip-browser-warning": "69420",
      //   },
      //   payload: {},
      // });

      console.log("Edit this branch:", branch)

      showAlert(
        true,
        "Branch successfully updated",
        "alert alert-success"
      );
      fetchAllBranches();
      $("#BranchFormModal").modal("toggle");
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
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">branch</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={branch.title}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div> */}

                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leave_approval_level">Approval Level</label>
                      <input
                        name="leave_approval_level"
                        type="number"
                        className="form-control"
                        value={branch.leave_approval_level}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div> */}
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
