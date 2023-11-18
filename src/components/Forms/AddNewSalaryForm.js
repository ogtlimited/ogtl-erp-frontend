//* IN USE

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

const defaultValues = {
  ogid: "",
  annual_gross_salary: "",

  officeName: "",
  employeeName: "",
  operation_office_id: "",
};

const AddNewSalaryForm = ({ fetchAllSalaries }) => {
  const {
    selectCampaigns,
    selectDepartments,
    selectTeams,
    officeTypeOptions,
    loadingSelect,
    showAlert,
    goToTop,
  } = useAppContext();
  const [data, setData] = useState(defaultValues);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    if (data?.ogid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [data?.ogid]);

  const cancelEvent = () => {
    setData(defaultValues);
    setOfficeType("");
    setIsOfficeTypeSelected(false);
    setIsOfficeSelected(false);
  };

  const handleOfficeTypeChange = (e) => {
    setData({
      ...data,
      operation_office_id: "",
      officeName: "",
      ogid: "",
      employeeName: "",
    });

    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setData({
      ...data,
      operation_office_id: e?.value,
      officeName: e?.label,
      ogid: "",
      employeeName: "",
    });
    setIsOfficeSelected(true);
    fetchAllEmployees(e?.value);
  };

  // All Employees:
  const fetchAllEmployees = async (officeId) => {
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

      const formattedData = resData
        .map((e) => ({
          label: e?.name,
          value: e.ogid,
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
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            pages: 1,
            limit: 1000,
          },
        }
      );

      const resData = response?.data?.data?.employees;

      const formattedData = resData
        .map((e) => ({
          label: e?.name,
          value: e.ogid,
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
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            pages: 1,
            limit: 1000,
          },
        }
      );

      const resData = response?.data?.data?.employees;

      const formattedData = resData
        .map((e) => ({
          label: e?.name,
          value: e.ogid,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllEmployees(formattedData);
      setLoading(false);
      return;
    }
  };

  const handleAddSalary = (e) => {
    e.preventDefault();

    setLoading(true);

    const payloadData = [
      {
        ogid: data?.ogid,
        annual_gross_salary: +data?.annual_gross_salary,
      },
    ];

    axiosInstance
      .post("/api/v1/employee_salaries.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: payloadData,
      })
      .then((res) => {
        showAlert(
          true,
          `${data?.employeeName} salary added successfully`,
          "alert alert-success"
        );
        $("#AddNewSalary").modal("toggle");
        fetchAllSalaries();
        cancelEvent();
        setLoading(false);
        goToTop();
      })
      .catch((error) => {
        showAlert(true, error.response.data.errors, "alert alert-warning");
        $("#AddNewSalary").modal("toggle");
        setLoading(false);
        goToTop();
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddNewSalary"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add Employee Salary
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
                <form onSubmit={handleAddSalary}>
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
                          <label htmlFor="operation_office_id">Office</label>
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
                          <label htmlFor="ogid">Employee</label>
                          <Select
                            options={allEmployees}
                            isSearchable={true}
                            value={{
                              value: data?.ogid,
                              label: data?.employeeName,
                            }}
                            onChange={(e) =>
                              setData({
                                ...data,
                                ogid: e?.value,
                                employeeName: e?.label,
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="annual_gross_salary">
                          Annual Gross Salary
                        </label>
                        <input
                          name="annual_gross_salary"
                          type="num"
                          className="form-control"
                          value={data.annual_gross_salary}
                          onChange={(e) =>
                            setData({
                              ...data,
                              annual_gross_salary: e?.target?.value,
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

export default AddNewSalaryForm;
