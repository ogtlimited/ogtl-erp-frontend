//* IN USE

import React, { useState, useEffect } from "react";
import { HR_ADD_JOB_SIEVER, officeTypeOptions } from "../FormJSON/AddJobSiever";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const AddJobSieverModal = ({ fetchJobSievers }) => {
  const { showAlert, loadingSelect, goToTop } = useAppContext();
  const [data, setData] = useState(HR_ADD_JOB_SIEVER);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  const [allOffices, setAllOffices] = useState([]);

  useEffect(() => {
    if (data?.hr_employee_id) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [data?.hr_employee_id]);

  const cancelEvent = () => {
    setData(HR_ADD_JOB_SIEVER);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
  };

  const handleOfficeTypeChange = (e) => {
    setData({
      ...data,
      operation_office_id: "",
      officeName: "",
      hr_employee_id: "",
      employeeName: "",
    });

    fetchAllOffices(e?.value);
    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setData({
      ...data,
      operation_office_id: e?.value,
      officeName: e?.label,
      hr_employee_id: "",
      employeeName: "",
    });
    setIsOfficeSelected(true);
    fetchAllEmployees(e?.value);
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
          value: e?.id,
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

  // All Employees:
  const fetchAllEmployees = async (officeId) => {
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
          value: e?.ogid,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllEmployees(formattedLeaders);
      setLoading(false);
    } catch (error) {
      console.log("Get All employees error:", error);
      setLoading(false);
    }
  };

  const handleAddJobSiever = async (e) => {
    e.preventDefault();

    const dataPayload = {
      ogid: data?.hr_employee_id,
    };

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post("/api/v1/add_rep_sievers.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          ...dataPayload,
        },
      });

      showAlert(
        true,
        `${data?.employeeName} has been added to Job Sievers.`,
        "alert alert-success"
      );
      fetchJobSievers();
      $("#AddJobSieverModal").modal("toggle");
      goToTop();
      cancelEvent();
    } catch (error) {
      $("#AddJobSieverModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      goToTop();
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddJobSieverModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add Job Siever
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
                <form onSubmit={handleAddJobSiever}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Office Type</label>
                        <Select
                          options={officeTypeOptions}
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
                          <label htmlFor="operation_office_id">
                            Office
                          </label>
                          <Select
                            options={allOffices}
                            isSearchable={true}
                            value={{
                              label: data?.officeName,
                              value: data?.operation_office_id,
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
                          <label htmlFor="hr_employee_id">
                            Employee
                          </label>
                          <Select
                            options={allEmployees}
                            isSearchable={true}
                            value={{
                              value: data?.hr_employee_id,
                              label: data?.employeeName,
                            }}
                            onChange={(e) =>
                              setData({
                                ...data,
                                hr_employee_id: e?.value,
                                employeeName: e?.label,
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
