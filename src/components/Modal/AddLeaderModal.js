/** @format */

import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import {
  LeaderForm,
  officeTypeOptions,
  leaderTypeOptions,
} from "../FormJSON/CreateLeader.js";
import $ from "jquery";
import Select from "react-select";

export const AddLeaderModal = ({ fetchLeaders }) => {
  const { selectDepartments, selectCampaigns, showAlert } = useAppContext();
  const [leader, setLeader] = useState(LeaderForm);
  const [loading, setLoading] = useState(false);
  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false); 
  const [allLeaders, setAllLeaders] = useState([]);
  const [officeType, setOfficeType] = useState("");


  const cancelEvent = () => {
    setLeader(LeaderForm);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
  };

  const handleOfficeTypeChange = (e) => {
    setLeader({
      ...leader,
      operation_office_id: "",

      officeName: "",
    });

    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setLeader({
      ...leader,
      operation_office_id: e?.value,
      officeName: e?.label,
    });
    setIsOfficeSelected(true);
    fetchAllEmployees(e?.value);
  };

  const fetchAllEmployees = async (officeId) => {
    try {
      if (officeType === "Department") {
        const response = await axiosInstance.get(
          `/api/v1/departments_employees/${officeId}.json`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            params: {
              pages: 1,
              limit: 1000,
            },
          }
        );
        const resData = response?.data?.data?.employees;

        const formattedLeaders = resData
          .map((e) => ({
            label: e?.name,
            value: e.ogid,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setAllLeaders(formattedLeaders);
        setLoading(false);
        return;
      }

      if (officeType === "Campaign") {
        const response = await axiosInstance.get(
          `/api/v1/campaign_employees/${officeId}.json`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            params: {
              pages: 1,
              limit: 1000,
            },
          }
        );
        const resData = response?.data?.data?.employees;

        const formattedLeaders = resData
          .map((e) => ({
            label: e?.name,
            value: e.ogid,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setAllLeaders(formattedLeaders);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log("All Leaders error:", error);
      setLoading(false);
    }
  };

  const handleLeaderAction = async (e) => {
  e.preventDefault();

  const leaderDeptData = {
    operation_department_id: leader.operation_office_id,
    hr_employee_id: leader.hr_employee_id,
    title: leader.title,
  };
  
  const leaderCampaignData = {
    operation_campaign_id: leader.operation_office_id,
    hr_employee_id: leader.hr_employee_id,
    title: leader.title,
  };

  const payload = officeType === "Department" ? leaderDeptData : leaderCampaignData;

  console.log(payload);

  setLoading(true);

  try {
    const response = await axiosInstance.post(`/api/v1/leaders.json`,{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      payload:payload
    });

    showAlert(true, `Leader successfully created`, "alert alert-success");
    $("#LeaderFormModal").modal("toggle");
    cancelEvent();
    fetchLeaders();
    setLoading(false);
  } catch (error) {
    const errorMsg = error?.response?.data?.errors || 'An error occurred';
    showAlert(true, errorMsg, "alert alert-warning");
    setLoading(false);
  }
};


  return (
    <>
      <div
        className="modal fade"
        id="LeaderFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add Supervisor/Team Lead
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
              <form onSubmit={handleLeaderAction}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Office Type</label>
                      <Select
                        options={officeTypeOptions}
                        isClearable={true}
                        value={{
                          label: officeType,
                          value: officeType,
                        }}
                        style={{ display: "inline-block" }}
                        onChange={(e) => handleOfficeTypeChange(e)}
                      />
                    </div>
                  </div>

                  {isOfficeTypeSelected && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="employee_info.operation_office_id">
                          Office
                        </label>
                        <Select
                          options={
                            officeType === "Department"
                              ? selectDepartments
                              : officeType === "Campaign"
                              ? selectCampaigns
                              : null
                          }
                          isSearchable={true}
                          isClearable={true}
                          value={{
                            label: leader?.officeName,
                            value: leader?.operation_office_id,
                          }}
                          onChange={(e) => handleOfficeChange(e)}
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  )}

                  {isOfficeSelected && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="employee_info.operation_office_id">
                          Leader
                        </label>
                        <Select
                          options={allLeaders}
                          isSearchable={true}
                          isClearable={true}
                          value={{
                            value: leader?.hr_employee_id,
                            label: leader?.leaderName,
                          }}
                          onChange={(e) =>
                            setLeader({
                              ...leader,
                              hr_employee_id: e?.value,
                              leaderName: e?.label,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <Select
                        options={leaderTypeOptions}
                        isClearable={true}
                        value={{
                          label: leader?.leadershipType,
                          value: leader?.title,
                        }}
                        onChange={(e) =>
                          setLeader({
                            ...leader,
                            title: e?.value,
                            leadershipType: e?.label,
                          })
                        }
                        style={{ display: "inline-block" }}
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
