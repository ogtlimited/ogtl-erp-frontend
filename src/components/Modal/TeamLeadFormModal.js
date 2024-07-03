/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";

export const TeamLeadFormModal = ({ mode, data, fetchTeamLead }) => {
  const { selectLeaders, selectTeams, showAlert, goToTop, leadershipTypes } =
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

  const handleAssignTeamLead = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (mode === "Assign") {
        if (!office?.leadership_type) {
          setLoading(false);
          return showAlert(
            true,
            `Please select a leadership type`,
            "alert alert-warning"
          );
        }

        // eslint-disable-next-line no-unused-vars
        const response = await axiosInstance.post(`/api/v1/teams_leads.json`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            operation_team_id: +id,
            team_lead_id: office.team_lead_id,
            leadership_type: office?.leadership_type,
          },
        });
      } else {
        // eslint-disable-next-line no-unused-vars
        const response = await axiosInstance.patch(
          `/api/v1/teams_leads/${id}.json`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            payload: {
              operation_team_id: +id,
              team_lead_id: office.team_lead_id,
              leadership_type: office?.leadership_type,
            },
          }
        );
      }

      goToTop();
      showAlert(
        true,
        `${
          office?.lead_title
        } successfully assigned as ${title?.toUpperCase()} Team Lead`,
        "alert alert-success"
      );
      fetchTeamLead();
      $("#TeamLeadFormModal").modal("toggle");

      setOffice(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#TeamLeadFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="TeamLeadFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Team Lead
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
              <form onSubmit={handleAssignTeamLead}>
                <div className="row">
                  {mode === "Edit" ? (
                    <div className="col-md-4">
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
                  ) : (
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="operation_team_id">Team</label>
                        <input
                          name="operation_team_id"
                          type="text"
                          className="form-control"
                          value={title}
                          readOnly
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="leadership_type">Leadership Type</label>
                      <Select
                        name="leadership_type"
                        options={leadershipTypes}
                        value={{
                          label: office?.leadership_title,
                          value: office?.leadership_type,
                        }}
                        onChange={(e) =>
                          setOffice({
                            ...office,
                            leadership_type: e?.value,
                            leadership_title: e?.label,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="form-group">
                      <label htmlFor="team_lead_id">Team Lead</label>
                      <Select
                        name="team_lead_id"
                        options={selectLeaders}
                        value={{
                          label: office?.lead_title,
                          value: office?.team_lead_id,
                        }}
                        onChange={(e) =>
                          setOffice({
                            ...office,
                            team_lead_id: e?.value,
                            lead_title: e?.label,
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
