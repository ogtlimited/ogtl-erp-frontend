/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { useParams } from "react-router-dom";
import $ from "jquery";

export const TeamFormModal = ({ mode, data, fetchAllTeams }) => {
  const { showAlert, goToTop } = useAppContext();
  const { id } = useParams();
  const { title } = useParams();
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

  const handleTeamAction = async (e) => {
    if (mode === "Create") {
      return handleCreateTeam(e);
    } else {
      return handleEditTeam(e);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(`/api/v1/teams.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: office.title,
        },
      });

      showAlert(true, `Team successfully created`, "alert alert-success");
      fetchAllTeams();
      $("#TeamFormModal").modal("toggle");

      goToTop();
      setOffice(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#TeamFormModal").modal("toggle");

      goToTop();
      setLoading(false);
    }
  };

  const handleEditTeam = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = office.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(`/api/v1/teams/${id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: office.title,
        },
      });

      goToTop();
      showAlert(true, `Team successfully updated`, "alert alert-success");
      fetchAllTeams();
      $("#TeamFormModal").modal("toggle");

      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#TeamFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="TeamFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered ${
            mode === "Create" ? "modal-lg" : "col-md-6"
          }`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Team
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
              <form onSubmit={handleTeamAction}>
                <div className="row">
                  {mode === "Create" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="operation_department_id">
                          Department
                        </label>
                        <input
                          name="operation_department_id"
                          type="text"
                          className="form-control"
                          value={title}
                          readOnly
                        />
                      </div>
                    </div>
                  ) : null}

                  <div
                    className={`${
                      mode === "Create" ? "col-md-6" : "col-md-12"
                    } `}
                  >
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
