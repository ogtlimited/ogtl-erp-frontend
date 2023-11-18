/** @format */

import React, { useState, useEffect } from "react";
import { CREATE_CAMPAIGN } from "../FormJSON/AddCampaign";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import CampaignHelperService from "../../pages/Campaigns/campaign.helper";
import secureLocalStorage from "react-secure-storage";

export const AddCampaignModal = ({ fetchCampaign }) => {
  const { createCampaign, showAlert, status } = useAppContext();
  const [campaign, setCampaign] = useState(CREATE_CAMPAIGN);
  const [loading, setLoading] = useState(false);

  const [isAllValid, setIsAllValid] = useState(false);
  const [isClientValid, setIsClientValid] = useState(false);
  const [isTypeValid, setIsTypeValid] = useState(false);

  const [services, setServices] = useState([]);
  const [clientId, setClientId] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [qualityAnalyst, setQualityAnalyst] = useState("");

  const user = JSON.parse(secureLocalStorage.getItem("user"));

  useEffect(() => {
    setIsClientValid(campaign.client_id ? true : false);
    setIsTypeValid(campaign.type ? true : false);
    setIsAllValid(campaign.client_id && campaign.type ? true : false);
  }, [campaign]);

  useEffect(() => {
    createCampaign().then((res) => {
      const { clientS, employees } = res.data.createCampaignForm;

      const empHelper = new CampaignHelperService(clientS, employees);

      const service = empHelper.mapRecords();
      setServices([service]);

      const clientId = service.clientsOpts;
      setClientId(clientId);

      const supervisor = service.supervisorOpts;
      setSupervisor(supervisor);

      const qltyAnalyst = service.qualityAnalystOpts;
      setQualityAnalyst(qltyAnalyst);
    });
  }, [createCampaign, status]);

  const type = [
    {
      label: "Domestic",
      value: "domestic",
    },
    {
      label: "Foreign",
      value: "foreign",
    },
  ];

  const diallers = [
    {
      label: "In House",
      value: "inhouse",
    },
    {
      label: "External",
      value: "external",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  const billingStructure = [
    {
      label: "Standard",
      value: "standard",
    },
    {
      label: "Hourly",
      value: "per_hour",
    },
    {
      label: "Seat",
      value: "seat",
    },
    {
      label: "Per Hour /Seat",
      value: "per_hour/seat",
    },
  ];

  const cancelEvent = () => {
    setCampaign(CREATE_CAMPAIGN);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleAddCampaign = async (e) => {
    e.preventDefault();

    setLoading(true);

    let newValue = {
      ...campaign,
      number_of_employees: +campaign.number_of_employees,
      creator: user?._id,
    };

    const formData = Object.fromEntries(
      Object.entries(newValue).filter(([_, v]) => v)
    );

    try {
      const res = await axiosInstance.post("/office", formData);
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;
      showAlert(true, "Campaign Created Successfully!", "alert alert-success");
      $("#AddCampaignFormModal").modal("toggle");
      fetchCampaign();
      setLoading(false);
      setCampaign(CREATE_CAMPAIGN);
    } catch (error) {
      $("#AddCampaignFormModal").modal("toggle");
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddCampaignFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add New Campaign
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
              {!services.length ? (
                <>
                  <p style={{ textAlign: "center" }}>Loading Form...</p>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                <form onSubmit={handleAddCampaign}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="project_name">Project Name</label>
                        <input
                          className="form-control"
                          name="project_name"
                          type="text"
                          value={campaign.project_name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="client_id">
                          Client {!isClientValid && <span>*</span>}
                        </label>
                        <Select
                          options={clientId}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setCampaign({ ...campaign, client_id: e?.value })
                          }
                          style={{ display: "inline-block" }}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="type">
                          Type {!isTypeValid && <span>*</span>}
                        </label>
                        <Select
                          options={type}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setCampaign({ ...campaign, type: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="diallers">
                          Diallers{" "}
                          <span style={{ color: "#999", fontSize: "12px" }}>
                            (optional)
                          </span>
                        </label>
                        <Select
                          options={diallers}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setCampaign({ ...campaign, diallers: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="number_of_employees">
                          Number of employees{" "}
                          <span style={{ color: "#999", fontSize: "12px" }}>
                            (optional)
                          </span>
                        </label>
                        <input
                          className="form-control"
                          name="number_of_employees"
                          type="number"
                          value={campaign.number_of_employees}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="billing_structure">
                          Billing Structure{" "}
                          <span style={{ color: "#999", fontSize: "12px" }}>
                            (optional)
                          </span>
                        </label>
                        <Select
                          options={billingStructure}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setCampaign({
                              ...campaign,
                              billing_structure: e?.value,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="start_date">Start date</label>
                        <input
                          className="form-control"
                          name="start_date"
                          type="date"
                          value={campaign.start_date}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="end_date">
                          End date{" "}
                          <span style={{ color: "#999", fontSize: "12px" }}>
                            (optional)
                          </span>
                        </label>
                        <input
                          className="form-control"
                          name="end_date"
                          type="date"
                          value={campaign.end_date}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="manager">
                          Manager{" "}
                          <span style={{ color: "#999", fontSize: "12px" }}>
                            (optional)
                          </span>
                        </label>
                        <Select
                          options={supervisor}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setCampaign({ ...campaign, manager: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="quality_analyst">
                          Quality Analyst{" "}
                          <span style={{ color: "#999", fontSize: "12px" }}>
                            (optional)
                          </span>
                        </label>
                        <Select
                          options={qualityAnalyst}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setCampaign({
                              ...campaign,
                              quality_analyst: e?.value,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="objectives">
                          Objectives{" "}
                          <span style={{ color: "#999", fontSize: "12px" }}>
                            (optional)
                          </span>
                        </label>
                        <textarea
                          className="form-control"
                          name="objectives"
                          type="textarea"
                          value={campaign.objectives}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="horizontal-department-rule" />
                  <h5 style={{ marginBottom: "20px" }}>Campaign Shift</h5>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="shift_name">Shift Name</label>
                        <input
                          name="shift_name"
                          type="text"
                          className="form-control"
                          value={campaign.shift_name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="start_time">Start Time</label>
                        <input
                          name="start_time"
                          type="time"
                          className="form-control"
                          value={campaign.start_time}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="end_time">End Time</label>
                        <input
                          name="end_time"
                          type="time"
                          className="form-control"
                          value={campaign.end_time}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ zIndex: 0 }}
                      disabled={!isAllValid}
                    >
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
