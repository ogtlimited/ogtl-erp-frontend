/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";

export const DepartmentTeamFormModal = ({
  mode,
  data,
  fetchAllDepartmentTeams,
}) => {
  const { selectTeams, selectDepartments, showAlert, goToTop } =
    useAppContext();
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

  const handleDepartmentTeamAction = async (e) => {
    if (mode === "Add") {
      return handleCreateDepartmentTeam(e);
    } else {
      return handleEditDepartmentTeam(e);
    }
  };

  const handleCreateDepartmentTeam = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/departments_teams.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            operation_department_id: +id,
            operation_team_id: office.operation_team_id,
          },
        }
      );

      goToTop();
      showAlert(
        true,
        `${office?.team_title} Team successfully added to ${title} Department`,
        "alert alert-success"
      );
      fetchAllDepartmentTeams();
      $("#DepartmentTeamFormModal").modal("toggle");

      setOffice(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DepartmentTeamFormModal").modal("toggle");

      setLoading(false);
    }
  };

  const handleEditDepartmentTeam = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = office.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/teams/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: office.title,
          },
        }
      );

      goToTop();
      showAlert(true, `Team successfully updated`, "alert alert-success");
      fetchAllDepartmentTeams();
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
        id="DepartmentTeamFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
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
              <form onSubmit={handleDepartmentTeamAction}>
                <div className="row">
                  {mode === "Edit" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="operation_department_id">
                          Department
                        </label>
                        <Select
                          name="operation_department_id"
                          options={selectDepartments}
                          value={{
                            label: office?.department_title,
                            value: office?.operation_department_id,
                          }}
                          onChange={(e) =>
                            setOffice({
                              ...office,
                              operation_department_id: e?.value,
                              department_title: e?.label,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : (
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
                  )}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="operation_team_id">Team</label>
                      <Select
                        name="operation_team_id"
                        options={selectTeams}
                        value={{
                          label: office?.team_title,
                          value: office?.operation_team_id,
                        }}
                        onChange={(e) =>
                          setOffice({
                            ...office,
                            operation_team_id: e?.value,
                            team_title: e?.label,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  {mode === "Add" && (
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
