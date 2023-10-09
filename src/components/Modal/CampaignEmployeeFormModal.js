/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";

export const CampaignEmployeeFormModal = ({
  mode,
  data,
  fetchAllCampaignEmployees,
}) => {
  const { selectEmployees, selectCampaigns, showAlert, goToTop } =
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

  const handleCreateCampaignEmployee = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/campaign_employees.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            operation_campaign_id: +id,
            employee_id: office.employee_id,
          },
        }
      );

      goToTop();
      showAlert(
        true,
        `${office?.employee_title} successfully added to ${title} Campaign`,
        "alert alert-success"
      );
      fetchAllCampaignEmployees();
      $("#CampaignEmployeeFormModal").modal("toggle");

      setOffice(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#CampaignEmployeeFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="CampaignEmployeeFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Employee
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
              <form onSubmit={handleCreateCampaignEmployee}>
                <div className="row">
                  {mode === "Edit" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="operation_campaign_id">
                          Department
                        </label>
                        <Select
                          name="operation_campaign_id"
                          options={selectCampaigns}
                          value={{
                            label: office?.campaign_title,
                            value: office?.operation_campaign_id,
                          }}
                          onChange={(e) =>
                            setOffice({
                              ...office,
                              operation_campaign_id: e?.value,
                              campaign_title: e?.label,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="operation_campaign_id">
                          Department
                        </label>
                        <input
                          name="operation_campaign_id"
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
                      <label htmlFor="employee_id">Employee</label>
                      <Select
                        name="employee_id"
                        options={selectEmployees}
                        value={{
                          label: office?.employee_title,
                          value: office?.employee_id,
                        }}
                        onChange={(e) =>
                          setOffice({
                            ...office,
                            employee_id: e?.value,
                            employee_title: e?.label,
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
