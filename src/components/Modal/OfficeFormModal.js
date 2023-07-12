/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { officeTypeOptions } from "../FormJSON/CreateOffices.js";
import $ from "jquery";
import Select from "react-select";

export const OfficeFormModal = ({
  mode,
  officeType,
  setOfficeType,
  fetchAllCampaigns,
  fetchAllDepartments,
  data,
}) => {
  const { showAlert } = useAppContext();
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

  const handleOfficeTypeChange = (e) => {
    setOffice({
      ...office,
      office_type: e.value,
    });
    setOfficeType(e.label);
  };

  const handleOfficeAction = async (e) => {
    if (mode === "Create") {
      return handleCreateOffice(e);
    } else {
      return handleEditOffice(e);
    }
  };

  const handleCreateOffice = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(`/api/v1/offices.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: office.title,
          leave_approval_level: Number(office.leave_approval_level),
          office_type: office.office_type,
        },
      });

      showAlert(
        true,
        `${officeType} successfully created`,
        "alert alert-success"
      );

      if (officeType === "Campaign") {
        fetchAllCampaigns();
      } else if (officeType === "Department") {
        fetchAllDepartments();
      }

      $("#OfficeFormModal").modal("toggle");
      setOffice(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  const handleEditOffice = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = office.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(`/api/v1/offices/${id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          title: office.title,
          leave_approval_level: Number(office.leave_approval_level),
          office_type: office.office_type,
        },
      });

      showAlert(
        true,
        `${officeType} successfully updated`,
        "alert alert-success"
      );
      if (officeType === "Campaign") {
        fetchAllCampaigns();
      } else if (officeType === "Department") {
        fetchAllDepartments();
      }
      $("#OfficeFormModal").modal("toggle");
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="OfficeFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Office
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
              <form onSubmit={handleOfficeAction}>
                <div className="row">
                  {mode === "Create" && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Office Type</label>
                        <Select
                          options={officeTypeOptions}
                          value={{
                            label: office.office_type,
                            value: office.office_type,
                          }}
                          style={{ display: "inline-block" }}
                          onChange={(e) => handleOfficeTypeChange(e)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={office.title}
                        onChange={handleFormChange}
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
