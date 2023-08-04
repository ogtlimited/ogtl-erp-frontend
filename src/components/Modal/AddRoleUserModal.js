// *IN USE

import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import {
  RoleUserForm,
  officeTypeOptions,
} from "../FormJSON/CreateLeader.js";
import $ from "jquery";
import Select from "react-select";

export const AddRoleUserModal = ({ roleId, fetchRoleUsers }) => {
  const { showAlert } = useAppContext();
  const [roleUser, setRoleUser] = useState(RoleUserForm);
  const [loading, setLoading] = useState(false);
  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [allOffices, setAllOffices] = useState([]);
  const [allLeaders, setAllLeaders] = useState([]);
  const [officeType, setOfficeType] = useState("");

  const cancelEvent = () => {
    setRoleUser(RoleUserForm);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
  };

  const handleOfficeTypeChange = (e) => {
    setRoleUser({
      ...roleUser,
      operation_office_id: "",
    });

    fetchAllOffices(e?.value);
    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setRoleUser({
      ...roleUser,
      operation_office_id: e?.value,
      officeName: e?.label,
    });
    setIsOfficeSelected(true);
    fetchAllUsers(e?.value);
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

  const fetchAllUsers = async (officeId) => {
    try {
      const response = await axiosInstance.get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          operation_office_id: officeId,
          pages: 1,
          limit: 1000,
        },
      });

      const resData = response?.data?.data?.employees;

      const formattedLeaders = resData
        .map((e) => ({
          label: e?.full_name,
          value: e.ogid,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllLeaders(formattedLeaders);
      setLoading(false);
    } catch (error) {
      console.log("Get All Leaders error:", error);
      setLoading(false);
    }
  };

  const handleLeaderAction = async (e) => {
    e.preventDefault();

    const leaderData = {
      hr_user_id: roleUser.hr_user_id,
      admin_role_id: Number(roleId),
    };

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(`/api/v1/role_assignments.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: leaderData,
      });

      showAlert(true, response?.data?.data?.message, "alert alert-success");

      $("#RoleUserFormModal").modal("toggle");
      setRoleUser(RoleUserForm);
      fetchRoleUsers();
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
        id="RoleUserFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add Role User
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
                          options={allOffices}
                          isSearchable={true}
                          isClearable={true}
                          value={{
                            label: roleUser?.officeName,
                            value: roleUser?.operation_office_id,
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
                          Role User
                        </label>
                        <Select
                          options={allLeaders}
                          isSearchable={true}
                          isClearable={true}
                          value={{
                            value: roleUser?.hr_user_id,
                            label: roleUser?.roleUserName,
                          }}
                          onChange={(e) =>
                            setRoleUser({
                              ...roleUser,
                              hr_user_id: e?.value,
                              roleUserName: e?.label,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  )}

                  
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
