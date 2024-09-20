//* IN USE

import React, { useState, useEffect, useRef } from "react";
import { HR_ADD_LOAN, officeTypeOptions } from "../FormJSON/AddLoan";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import { differenceInMonths } from 'date-fns';

export const AddLoanModal = ({ fetchLoans }) => {
  const {
    selectDepartments,
    selectCampaigns,
    selectTeams,
    showAlert,
    loadingSelect,
    selectLoanTypes,
    fetchLoanTypes
  } = useAppContext();
  const selectLoanTypeRef = useRef();
  const [data, setData] = useState(HR_ADD_LOAN);
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
    const isFormReady = data?.hr_user_id
      && parseInt(data.number_of_installment) === data.duration
      && data?.loanAmount > 0;

    setIsFormValid(isFormReady);
  }, [data?.hr_user_id, data?.number_of_installment, data?.duration, data?.loanAmount]);


  const cancelEvent = () => {
    setData(HR_ADD_LOAN);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
    selectLoanTypeRef.current.select.clearValue();
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    const selectedDate = e.target.value;

    // Set the start_date or end_date in the state
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: selectedDate,
    }));
  };

  useEffect(() => {
    if (data.start_date && data.end_date) {
      const duration = differenceInMonths(new Date(data.end_date), new Date(data.start_date));

      setData((prevData) => ({ ...prevData, duration }));
    }
  }, [data.start_date, data.end_date]);


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

  function formatToFirstOfMonth(dateStr) {
    const [year, month] = dateStr.split('-');

    const firstDayOfMonth = new Date(`${year}/${month}/01`);

    const formattedDate = firstDayOfMonth.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    return formattedDate;
  }

  const handleAddDeduction = async (e) => {
    e.preventDefault();

    const dataPayload = {
      start_date: formatToFirstOfMonth(data?.start_date),
      end_date: formatToFirstOfMonth(data?.end_date),
      number_of_installment: data?.number_of_installment,
      ogid: data?.hr_user_id,
      amount: data?.loanAmount,
      loan_type_id: data?.hr_loan_type_id,
      duration: data?.duration
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
        `${data?.employeeName} has been added to loans.`,
        "alert alert-success"
      );
      fetchLoans();
      $("#AddLoanModal").modal("toggle");
      cancelEvent();
    } catch (error) {
      $("#AddLoanModal").modal("toggle");
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddLoanModal"
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
                <form onSubmit={handleAddDeduction}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="start_date">Start Date</label>
                        <input
                          type="month"
                          name="start_date"
                          value={data?.start_date}
                          onChange={handleDateChange}
                          className="form-control "
                          id="dateInput"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="end_date">End Date</label>
                        <input
                          type="month"
                          name="end_date"
                          value={data?.end_date}
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
                          Loan Amount
                        </label>
                        <input
                          name="loan_amount"
                          type="number"
                          placeholder="enter amount"
                          className="form-control"
                          //   value={data.annual_gross_salary}
                          onChange={(e) =>
                            setData({
                              ...data,
                              loanAmount: e?.target.value
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="hr_deduction_type_id">
                          Installments
                        </label>
                        <input
                          name="installments"
                          type="number"
                          placeholder="enter number of installments"
                          className="form-control"
                          onChange={(e) =>
                            setData({
                              ...data,
                              number_of_installment: e?.target.value
                            })
                          }
                          required
                        />
                      </div>
                      {data.number_of_installment && data.duration && +data.number_of_installment !== +data?.duration && <p style={{ color: 'red', fontSize: '10px' }}>Number of installments must be equal to duration</p>}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="duration">Duration (in months)</label>
                        <input
                          name="duration"
                          type="number"
                          className="form-control"
                          value={data?.duration || 0}
                          readOnly
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


