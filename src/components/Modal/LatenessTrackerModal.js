//* IN USE

import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import { officeTypeOptions } from "../FormJSON/AddDeduction";
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

export const LatenessTrackerModal = ({ from, mode, data, refetchData }) => {
  const { office_type, id } = useParams();

  const {
    goToTop,
    showAlert,
    loadingSelect,
    selectEmployees,
    categoryOptions,
    selectDepartments,
    selectCampaigns
  } = useAppContext();

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isFormValid, setIsFormValid] = useState(false);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    if (mode === "Edit") {
      setFormData({
        expected_arrival_time: data?.expected_arrival_time,
        will_come_in: data?.will_come_in,
        mode_of_communication: data?.mode_of_communication,
        caller_is_employee: data?.caller_is_employee,
        caller_name: data?.caller_name,
        hr_employee_id: data?.ogid,
        operation_office_id: data?.employee?.operation_office_id,
        office_type: data?.office_type,
        office: data?.office,
        employeeName: data?.employee,
        note: data?.note
      });

      setIsOfficeTypeSelected(true);
      setIsOfficeSelected(true);
      setOfficeType(
        data?.office_type?.replace(/\b\w/g, (char) => char.toUpperCase())
      );
    } else {
      setFormData(data);

      if (id) {
        setOfficeType(
          office_type.replace(/\b\w/g, (char) => char.toUpperCase())
        );
      }
    }
  }, [data, id, mode, office_type]);

  // useEffect(() => {
  //   if (formData.hr_leave_type_id && formData?.hr_employee_id) {
  //     setIsFormValid(true);
  //   } else {
  //     setIsFormValid(false);
  //   }
  // }, [formData.hr_leave_type_id, formData.hr_employee_id]);

  const cancelEvent = () => {
    setFormData(data);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
  };

  const handleOfficeTypeChange = (e) => {
    setFormData({
      ...formData,
      operation_office_id: "",
      office: "",
      hr_employee_id: "",
      employeeName: ""
    });

    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setFormData({
      ...formData,
      operation_office_id: e?.value,
      office: e?.label,
      hr_employee_id: "",
      employeeName: ""
    });

    setIsOfficeSelected(true);
    fetchAllEmployees(e?.value);
  };

  const fetchAllEmployees = useCallback(
    async (officeId) => {

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
    },
    [officeType]
  );

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      fetchAllEmployees(+id);
    }
  }, [fetchAllEmployees, id]);

  const handleLatenessTrackerActions = async (e) => {
    if (mode === "Create") {
      return handleCreateLatenessTracker(e);
    } else {
      return handleEditLatenessTracker(e);
    }
  };

  const handleCreateLatenessTracker = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      expected_arrival_time: formData?.expected_arrival_time,
      will_come_in: formData?.will_come_in,
      mode_of_communication: formData?.mode_of_communication,
      caller_is_employee: formData?.caller_is_employee,
      caller_name: formData?.caller_name,
      hr_employee_id: formData?.hr_employee_id,
      operation_office_id:
        from === "all" ? +formData?.operation_office_id : +id,
      office_type:
        from === "all" ? officeType?.toLowerCase() : office_type?.toLowerCase(),
      note: formData?.note
    };

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        "/api/v1/lateness_trackers.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          payload
        }
      );

      goToTop();
      showAlert(
        true,
        `Lateness Tracker for ${formData?.employeeName} Successfully Created`,
        "alert alert-success"
      );

      $("#LatenessTrackerModal").modal("toggle");

      refetchData();
      cancelEvent();
      setLoading(false);
    } catch (error) {
      $("#LatenessTrackerModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");

      goToTop();
      setLoading(false);
      cancelEvent();
    }
  };

  const handleEditLatenessTracker = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      expected_arrival_time: formData?.expected_arrival_time,
      will_come_in: formData?.will_come_in,
      mode_of_communication: formData?.mode_of_communication,
      caller_is_employee: formData?.caller_is_employee,
      caller_name: formData?.caller_name,
      hr_employee_id: formData?.hr_employee_id,
      operation_office_id:
        from === "all"
          ? formData?.operation_office_id
            ? +formData?.operation_office_id
            : null
          : +id,
      office_type:
        from === "all" ? officeType?.toLowerCase() : office_type?.toLowerCase(),
      note: formData?.note
    };

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/lateness_trackers/${data?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          payload
        }
      );

      goToTop();
      showAlert(
        true,
        `Lateness Tracker for ${data?.employee} Successfully Updated`,
        "alert alert-success"
      );

      $("#LatenessTrackerModal").modal("toggle");

      refetchData();
      cancelEvent();
      setLoading(false);
    } catch (error) {
      $("#LatenessTrackerModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");

      goToTop();
      setLoading(false);
      cancelEvent();
    }
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
                {mode} Lateness Tracker
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
                <form onSubmit={handleLatenessTrackerActions}>
                  <div className="row">
                    {from === "all" ? (
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
                    ) : null}

                    {isOfficeTypeSelected && from === "all" && (
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
                            value={
                              formData?.office
                                ? {
                                    label: formData?.office,
                                    value: formData?.operation_office_id
                                  }
                                : null
                            }
                            onChange={(e) => handleOfficeChange(e)}
                            style={{ display: "inline-block" }}
                            placeholder={
                              officeType === "Department" &&
                              !selectDepartments?.length
                                ? "fetching departments..."
                                : officeType === "Campaign" &&
                                  !selectCampaigns?.length
                                ? "fetching campaigns..."
                                : `Select ${officeType}`
                            }
                          />
                        </div>
                      </div>
                    )}

                    {(isOfficeSelected || id) && (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="hr_employee_id">Employee</label>
                          <Select
                            options={allEmployees}
                            isSearchable={true}
                            value={
                              formData?.employeeName
                                ? {
                                    label: formData?.employeeName,
                                    value: formData?.hr_employee_id
                                  }
                                : null
                            }
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                hr_employee_id: e?.value,
                                employeeName: e?.label
                              })
                            }
                            style={{ display: "inline-block" }}
                            placeholder={
                              !allEmployees?.length
                                ? "fetching employees..."
                                : "Select Employee"
                            }
                          />
                        </div>
                      </div>
                    )}

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
                        <label htmlFor="expected_arrival_time">
                          Expected Arrival Time
                        </label>
                        <input
                          type="datetime-local"
                          name="expected_arrival_time"
                          value={formData?.expected_arrival_time}
                          onChange={handleFormChange}
                          className="form-control"
                          required={formData?.will_come_in}
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
                            label: formData?.mode_of_communication?.replace(
                              /\b\w/g,
                              (char) => char.toUpperCase()
                            ),
                            value: formData?.mode_of_communication
                          }}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mode_of_communication: e?.value,
                              mode_of_communication_title: e?.label
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

                    {formData?.caller_is_employee ? (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caller_name">Caller's Name</label>
                          <Select
                            name="caller_name"
                            options={selectEmployees}
                            value={
                              formData?.caller_name
                                ? {
                                    label: formData?.caller_name,
                                    value: formData?.caller_name
                                  }
                                : null
                            }
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                caller_name: e?.label
                              })
                            }
                            style={{ display: "inline-block" }}
                            placeholder={
                              !selectEmployees?.length
                                ? "fetching employees..."
                                : "Select Caller"
                            }
                          />
                        </div>
                      </div>
                    ) : null}

                    {!formData?.caller_is_employee ? (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caller_name">Caller's Name</label>
                          <input
                            type="text"
                            name="caller_name"
                            value={formData?.caller_name}
                            onChange={handleFormChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    ) : null}

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
                      // disabled={!isFormValid}
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
