//* IN USE

import React, { useState, useEffect } from "react";
import { HR_CREATE_LEAVE, officeTypeOptions } from "../FormJSON/CreateLeave";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

const modeofCommunicationOptions = [
  {
    label: "Call",
    value: "call"
  },
  {
    label: "Email",
    value: "email"
  },
  {
    label: "Text",
    value: "text"
  }
];

export const LatenessTrackerModal = ({
  fetchHRLeaves,
  fetchHRLeaveHistory,
  fetchAllEmpOnLeave
}) => {
  const {
    showAlert,
    loadingSelect,
    selectDepartments,
    selectCampaigns,
    categoryOptions
  } = useAppContext();
  const [formData, setFormData] = useState(HR_CREATE_LEAVE);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    if (formData.hr_leave_type_id && formData?.hr_user_id) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData.hr_leave_type_id, formData.hr_user_id]);

  const cancelEvent = () => {
    setFormData(HR_CREATE_LEAVE);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
  };

  const handleOfficeTypeChange = (e) => {
    setFormData({
      ...formData,
      operation_office_id: "",
      officeName: "",
      hr_user_id: "",
      employeeName: ""
    });

    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setFormData({
      ...formData,
      operation_office_id: e?.value,
      officeName: e?.label,
      hr_user_id: "",
      employeeName: ""
    });

    setIsOfficeSelected(true);
    fetchAllEmployees(e?.value);
  };

  const fetchAllEmployees = async (officeId) => {
    if (officeType === "Department") {
      const response = await axiosInstance.get(
        `/api/v1/departments_employees/${officeId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            pages: 1,
            limit: 1000
          }
        }
      );

      const resData = response?.data?.data?.employees;

      const formattedData = resData
        .map((e) => ({
          label: e?.name,
          value: e.ogid
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllEmployees(formattedData);
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
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            pages: 1,
            limit: 1000
          }
        }
      );

      const resData = response?.data?.data?.employees;

      const formattedData = resData
        .map((e) => ({
          label: e?.name,
          value: e.ogid
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllEmployees(formattedData);
      setLoading(false);
      return;
    }

    if (officeType === "Team") {
      const response = await axiosInstance.get(
        `/api/v1/teams_employees/${officeId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            pages: 1,
            limit: 1000
          }
        }
      );

      const resData = response?.data?.data?.employees;

      const formattedData = resData
        .map((e) => ({
          label: e?.name,
          value: e.ogid
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllEmployees(formattedData);
      setLoading(false);
      return;
    }
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateLatenessTracker = async (e) => {
    e.preventDefault();

    const dataPayload = {
      hr_user_id: formData?.hr_user_id,
      hr_leave_type_id: formData.hr_leave_type_id,
      start_date: formData.start_date,
      end_date: formData.end_date,
      reason: formData.reason
    };

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        "/api/v1/hr_manual_leaves.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          payload: {
            ogid: dataPayload?.hr_user_id,
            formData: {
              hr_leave_type_id: dataPayload?.hr_leave_type_id,
              start_date: dataPayload?.start_date,
              end_date: dataPayload?.end_date,
              reason: dataPayload?.reason
            }
          }
        }
      );

      showAlert(
        true,
        `Leave Application for ${formData?.employeeName} is successful`,
        "alert alert-success"
      );
      fetchHRLeaves();
      fetchHRLeaveHistory();
      fetchAllEmpOnLeave();
      $("#CreateLeaveModal").modal("toggle");
      cancelEvent();
    } catch (error) {
      $("#CreateLeaveModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      // cancelEvent();
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="LatenessTrackerModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Lateness Tracker
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
              {!loadingSelect ? (
                <form onSubmit={handleCreateLatenessTracker}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="expected_arrival_time">
                          Expected Arrival Time
                        </label>
                        <input
                          type="date"
                          name="expected_arrival_time"
                          value={formData?.expected_arrival_time}
                          onChange={handleFormChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="will_come_in">
                          Will this staff come into the office?
                        </label>
                        <Select
                          name="will_come_in"
                          options={categoryOptions}
                          value={{
                            label: formData?.will_come_in ? "Yes" : "No",
                            value: formData?.will_come_in
                          }}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              will_come_in: e?.value
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="mode_of_communication">
                          Mode of Communication
                        </label>
                        <Select
                          name="mode_of_communication"
                          options={modeofCommunicationOptions}
                          value={{
                            label: formData?.mode_of_communication,
                            value: formData?.mode_of_communication
                          }}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mode_of_communication: e?.value
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="caller_is_employee">
                          Is the caller an employee?
                        </label>
                        <Select
                          name="caller_is_employee"
                          options={categoryOptions}
                          value={{
                            label: formData?.caller_is_employee ? "Yes" : "No",
                            value: formData?.caller_is_employee
                          }}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              caller_is_employee: e?.value
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="caller">Caller</label>
                        <input
                          type="text"
                          name="caller"
                          value={formData?.caller}
                          onChange={handleFormChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Office Type</label>
                        <Select
                          options={officeTypeOptions}
                          value={{
                            label: officeType,
                            value: officeType
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
                            value={{
                              label: formData?.officeName,
                              value: formData?.operation_office_id
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
                          <label htmlFor="employee">Employee</label>
                          <Select
                            options={allEmployees}
                            isSearchable={true}
                            value={{
                              value: formData?.hr_user_id,
                              label: formData?.employeeName
                            }}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                hr_user_id: e?.value,
                                employeeName: e?.label
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <textarea
                          name="note"
                          className="form-control "
                          value={formData.note}
                          onChange={handleFormChange}
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
                      disabled={!isFormValid}
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
              ) : (
                <div
                  className="add-employee-form-loader-div"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
