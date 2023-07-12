/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { officeTypeOptions } from "../FormJSON/CreateDesignation.js";
import $ from "jquery";
import Select from "react-select";

export const RoleFormModal = ({ mode, data, fetchAllRoles }) => {
  const { showAlert } = useAppContext();
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [allOffices, setAllOffices] = useState([]);

  useEffect(() => {
    setRole(data);
  }, [data]);

  const cancelEvent = () => {
    setRole(data);
    setOfficeType("");
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setRole({
      ...role,
      [e.target.name]: e.target.value,
    });
  };

  const handleOfficeTypeChange = (e) => {
    fetchAllOffices(e?.value);
    setOfficeType(e?.label);
    setIsOfficeSelected(true);
  };

  // All Offices:
  const fetchAllOffices = async (office) => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: office,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const allDepartments = resData.filter(
        (e) => e?.office_type === "department"
      );
      const allCampaigns = resData.filter((e) => e?.office_type === "campaign");

      const formattedDepartments = allDepartments
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      const formattedCampaigns = allCampaigns
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      if (office === "department") setAllOffices(formattedDepartments);
      if (office === "campaign") setAllOffices(formattedCampaigns);
    } catch (error) {
      console.log("Get All Offices error:", error);
    }
  };

  const handleRoleActions = async (e) => {
    if (mode === "Create") {
      return handleCreateRole(e);
    } else {
      return handleEditRole(e);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    
    
    const payloadData = {
      title: role.title,
      operation_office_id: role.operation_office_id,
    }

    console.log("but this works:", payloadData)

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(`/api/v1/roles.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: payloadData
      });

      showAlert(
        true,
        "Role successfully created",
        "alert alert-success"
      );
      fetchAllRoles();
      $("#RolesFormModal").modal("toggle");
      setRole(data)
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  const handleEditRole = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = role.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/designations/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: role.title,
            deleted: role.deleted,
            operation_office_id: role.operation_office_id,
          },
        }
      );

      showAlert(
        true,
        "Designation successfully updated",
        "alert alert-success"
      );
      // fetchDesignations();
      $("#DesignationFormModal").modal("toggle");
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
        id="RolesFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Role
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
              <form onSubmit={handleRoleActions}>

                <div className="row">
                  {mode === "Create" && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Office Type</label>
                        <Select
                          options={officeTypeOptions}
                          style={{ display: "inline-block" }}
                          value={{
                            label: officeType,
                            value: officeType,
                          }}
                          onChange={(e) => handleOfficeTypeChange(e)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Select Office */}
                  {isOfficeSelected && mode === "Create" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="employee_info.operation_office_id">
                          Office
                        </label>
                        <Select
                          options={allOffices}
                          isSearchable={true}
                          isClearable={true}
                          value={{
                            label: role?.officeName,
                            value: role?.operation_office_id,
                          }}
                          onChange={(e) =>
                            setRole({
                              ...role,
                              operation_office_id: e?.value,
                              officeName: e?.label,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">
                        Title
                      </label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={role.title}
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
