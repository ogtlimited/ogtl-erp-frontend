//* IN USE

import React, { useState, useEffect, useRef } from "react";
import { HR_ADD_DEDUCTION, officeTypeOptions } from "../FormJSON/AddDeduction";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const AddLoanModal = ({ fetchDeductions }) => {
  const {
    selectDepartments,
    selectCampaigns,
    selectTeams,
    showAlert,
    loadingSelect,
    selectLoanTypes,
    fetchLoanTypes
  } = useAppContext();
  const selectDeductionTypeRef = useRef();
  const [data, setData] = useState(HR_ADD_DEDUCTION);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    fetchLoanTypes();
  }, [fetchLoanTypes]);

  useEffect(() => {
    if (data?.hr_user_id && data?.hr_deduction_type_id) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [data?.hr_deduction_type_id, data?.hr_user_id]);

  const cancelEvent = () => {
    setData(HR_ADD_DEDUCTION);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
    selectDeductionTypeRef.current.select.clearValue();
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    const selectedDate = e.target.value;

    setData({ ...data, [e.target.name]: selectedDate });
  };

  const handleOfficeTypeChange = (e) => {
    setData({
      ...data,
      operation_office_id: "",
      officeName: "",
      hr_user_id: "",
      employeeName: ""
    });

    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  // Office change:
  const handleOfficeChange = (e) => {
    setData({
      ...data,
      operation_office_id: e?.value,
      officeName: e?.label,
      hr_user_id: "",
      employeeName: ""
    });
    setIsOfficeSelected(true);
    fetchAllEmployees(e?.value);
  };

  // All Employees:
  const fetchAllEmployees = async (officeId) => {
    try {
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
    } catch (error) {
      console.log("All Employees error:", error);
      setLoading(false);
    }
  };

  const handleAddLoan = async (e) => {
    e.preventDefault();

    const dataPayload = {
      hr_user_id: data?.hr_user_id,
      hr_deduction_type_id: data?.hr_deduction_type_id,// update to loan amount when integrating api
      date_processed: data?.date_processed,
      // loan_type_id: 2,
      // ogid: "OG212414",
      // monthly_deduction: "20000"
    };

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post("/api/v1/loans.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        payload: {
          ...dataPayload
        }
      });

      showAlert(
        true,
        `${data?.employeeName} has been added to Loans.`,
        "alert alert-success"
      );
      fetchDeductions();
      $("#AddDeductionModal").modal("toggle");
      cancelEvent();
    } catch (error) {
      $("#AddDeductionModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddDeductionModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add Loan
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
                <form onSubmit={handleAddLoan}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="date_processed">Start Date</label>
                        <input
                          type="date"
                          name="date_processed"
                          value={data?.date_processed}
                          onChange={handleDateChange}
                          className="form-control "
                          id="dateInput"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="date_processed">End Date</label>
                        <input
                          type="date"
                          name="date_processed"
                          value={data?.date_processed}
                          onChange={handleDateChange}
                          className="form-control "
                          id="dateInput"
                          required
                        />
                      </div>
                    </div>

                    {/* Office Type */}
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
                                  : selectTeams
                            }
                            isSearchable={true}
                            value={{
                              label: data?.officeName,
                              value: data?.operation_office_id
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
                            Employee
                          </label>
                          <Select
                            options={allEmployees}
                            isSearchable={true}
                            value={{
                              value: data?.hr_user_id,
                              label: data?.employeeName
                            }}
                            onChange={(e) =>
                              setData({
                                ...data,
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
                        <label htmlFor="hr_deduction_type_id">
                          Loan Type
                        </label>
                        <Select
                          options={selectLoanTypes}
                          isSearchable={true}
                          onChange={(e) =>
                            setData({
                              ...data,
                              hr_deduction_type_id: e?.value,
                              deductionTitle: e?.label
                            })
                          }
                          ref={selectDeductionTypeRef}
                          defaultValue={null}
                          placeholder="Select Loan Type"
                          style={{ display: "inline-block" }}
                        />

                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="hr_deduction_type_id">
                          Loan Amount
                        </label>
                        {/* <Select
                          options={selectDeductionTypes}
                          isSearchable={true}
                          onChange={(e) =>
                            setData({
                              ...data,
                              hr_deduction_type_id: e?.value,
                              deductionTitle: e?.label
                            })
                          }
                          ref={selectDeductionTypeRef}
                          defaultValue={null}
                          placeholder="Title | Office | Deduction Value"
                          style={{ display: "inline-block" }}
                        /> */}
                        <input
                          name="loan_amount"
                          type="number"
                          placeholder="enter amount"
                          className="form-control"
                          //   value={data.annual_gross_salary}
                          onChange={(e) =>
                            setData({
                              ...data,
                              hr_deduction_type_id: e?.value,
                              deductionTitle: e?.label
                            })
                          }
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
