/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";

export const CampaignFormModal = ({ mode, data, fetchAllCampaigns }) => {
  const { categoryOptions, showAlert, goToTop } = useAppContext();
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

  const handleCampaignAction = async (e) => {
    if (mode === "Create") {
      return handleCreateCampaign(e);
    } else {
      return handleEditCampaign(e);
    }
  };

  // CREATE:
  const handleCreateCampaign = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const campaignData = {
        title: office.title,
        leave_approval_level: +office.leave_approval_level,
        pensionable: office?.pensionable,
        taxable: office?.taxable,
      };

      const response = await createCampaign(campaignData);

      if (response.status === 200) {
        const departmentData = {
          operation_department_id: +id,
          operation_campaign_id: response?.data?.data?.campaign?.id,
        };
        await createDepartmentCampaign(departmentData);
      }

      setOffice(data);
      showAlert(true, "Campaign successfully created", "alert alert-success");
      fetchAllCampaigns();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      $("#CampaignFormModal").modal("toggle");
      goToTop();
      setLoading(false);
    }
  };

  // creates the campaign:
  const createCampaign = async (campaignData) => {
    return axiosInstance.post("/api/v1/campaigns.json", {
      payload: campaignData,
    });
  };

  // assigns the campaign to the department:
  const createDepartmentCampaign = async (departmentData) => {
    return axiosInstance.post("/api/v1/departments_campaigns.json", {
      payload: departmentData,
    });
  };

  // handles the error response:
  const handleErrorResponse = (error) => {
    const errorMsg = error?.response?.data?.errors;
    showAlert(true, errorMsg, "alert alert-warning");
  };

  // EDIT:
  const handleEditCampaign = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = office.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/campaigns/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: office.title,
            leave_approval_level: +office.leave_approval_level,
            pensionable: office?.pensionable,
            taxable: office?.taxable,
          },
        }
      );

      showAlert(true, `Campaign successfully updated`, "alert alert-success");
      fetchAllCampaigns();
      $("#CampaignFormModal").modal("toggle");

      // goToTop();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#CampaignFormModal").modal("toggle");

      goToTop();
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="CampaignFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Campaign
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
              <form onSubmit={handleCampaignAction}>
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
                          value={title?.toUpperCase()}
                          readOnly
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Campaign Title</label>
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

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="pensionable">Pensionable</label>
                      <Select
                        name="pensionable"
                        options={categoryOptions}
                        value={{
                          label: office?.pensionable ? "Yes" : "No",
                          value: office?.pensionable,
                        }}
                        onChange={(e) =>
                          setOffice({
                            ...office,
                            pensionable: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="taxable">Taxable</label>
                      <Select
                        name="taxable"
                        options={categoryOptions}
                        value={{
                          label: office?.taxable ? "Yes" : "No",
                          value: office?.taxable,
                        }}
                        onChange={(e) =>
                          setOffice({
                            ...office,
                            taxable: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
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
