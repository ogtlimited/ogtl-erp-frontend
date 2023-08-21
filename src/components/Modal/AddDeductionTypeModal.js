//* IN USE

import React, { useState, useEffect } from "react";
import {
  HR_ADD_DEDUCTION_TYPE,
  officeTypeOptions,
  deductionProcessOptions,
} from "../FormJSON/AddDeduction";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const AddDeductionTypeModal = ({ fetchDeductionTypes }) => {
  const { showAlert, loadingSelect } = useAppContext();
  const [data, setData] = useState(HR_ADD_DEDUCTION_TYPE);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isDeductionTypeSelected, setIsDeductionTypeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [deductionType, setDeductionType] = useState("");
  const [allOffices, setAllOffices] = useState([]);

  useEffect(() => {
    if (data?.operation_office_id && deductionType.length) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [data?.operation_office_id, deductionType.length]);

  const cancelEvent = () => {
    setData(HR_ADD_DEDUCTION_TYPE);
    setOfficeType("");
    setDeductionType("");
    setIsOfficeTypeSelected(false);
    setIsDeductionTypeSelected(false);
  };

  const handleOfficeTypeChange = (e) => {
    setData({
      ...data,
      operation_office_id: "",
      officeName: "",
    });

    fetchAllOffices(e?.value);
    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleDeductionTypeChange = (e) => {
    setData({
      ...data,
      percentage: "",
      amount: "",
    });

    setDeductionType(e?.value);
    setIsDeductionTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setData({
      ...data,
      operation_office_id: e?.value,
      officeName: e?.label,
    });
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
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

  const handleAddDeductionType = async (e) => {
    e.preventDefault();

    const dataPayload = {
      office_id: data?.operation_office_id,
      title: data?.title,
      description: data?.description,
      percentage: data?.percentage?.length ? +data?.percentage : null,
      amount: data?.amount?.length ? +data?.amount : null,
    };

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post("/api/v1/deduction_types.json", {
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
        `Deduction type (${data?.title}) has been created successfully.`,
        "alert alert-success"
      );
      fetchDeductionTypes();
      $("#AddDeductionTypesModal").modal("toggle");
      cancelEvent();
    } catch (error) {
      $("#AddDeductionTypesModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddDeductionTypesModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add Deduction Type
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
                <form onSubmit={handleAddDeductionType}>
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
                          <label htmlFor="employee_info.operation_office_id">
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

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          name="title"
                          type="text"
                          className="form-control"
                          value={data?.title}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          name="description"
                          className="form-control "
                          value={data?.description}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Type of Deduction</label>
                        <Select
                          options={deductionProcessOptions}
                          value={{
                            label: deductionType,
                            value: deductionType,
                          }}
                          style={{ display: "inline-block" }}
                          onChange={(e) => handleDeductionTypeChange(e)}
                        />
                      </div>
                    </div>

                    {isDeductionTypeSelected &&  (
                      <div className="col-md-6">
                        {deductionType === "percentage" ? (
                          <div className="form-group">
                            <label htmlFor="percentage">Percentage</label>
                            <input
                              name="percentage"
                              type="number"
                              className="form-control"
                              value={data?.percentage}
                              onChange={handleFormChange}
                              maxLength={3}
                              max={100}
                              required
                            />
                          </div>
                        ) : deductionType === "amount" ? (
                          <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input
                              name="amount"
                              type="number"
                              className="form-control"
                              value={data?.amount}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        ) : null}
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
