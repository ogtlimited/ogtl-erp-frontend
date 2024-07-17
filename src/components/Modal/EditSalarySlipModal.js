import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";

export const EditSalarySlipModal = ({
  data,
  fetchEmployeeSalarySlip,
  fetchPayrollTotals
}) => {
  const { showAlert, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [loadingProrationInfo, setLoadingProrationInfo] = useState(false);

  const [formData, setFormData] = useState([]);
  const [totalDaysWorked, setTotalDaysWorked] = useState(null);

  useEffect(() => {
    setFormData({
      prorate: data?.initialProrate,
      salary_month: data?.salary_month,
      year: data?.year
      // monthly_income_tax: data?.initialTax,
      // monthly_pension: data?.initialPension,
      // basic: data?.initialBasic,
      // salary: data?.initialSalary,
    });
  }, [
    data?.initialProrate,
    data?.salary_month,
    data?.year
    // data?.initialTax,
    // data?.initialPension,
    // data?.initialBasic,
    // data?.initialSalary,
  ]);

  const clearForm = () => {
    setFormData({
      prorate: data?.initialProrate,
      salary_month: data?.salary_month,
      year: data?.year
      // monthly_income_tax: data?.initialTax,
      // monthly_pension: data?.initialPension,
      // basic: data?.initialBasic,
      // salary: data?.initialSalary,
    });

    setTotalDaysWorked(22);
  };

  // // Handle Form Change:
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // Handle Total Days Worked
  const handleTotalDaysWorked = (e) => {
    const isInteger = Number.isInteger(+e?.target?.value);

    if (isInteger) {
      setTotalDaysWorked(e?.target?.value);
    } else {
      setTotalDaysWorked(Math.floor(e?.target?.value));
    }
  };

  // Get Proration Details:
  const getStaffProration = useCallback(async () => {
    setLoadingProrationInfo(true);

    try {
      const res = await axiosInstance.get(
        `/api/v1/salary_proration_details/${data?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );
      // eslint-disable-next-line no-unused-vars
      const resData = res?.data?.data;

      setTotalDaysWorked(resData?.record?.total_days_worked);

      setLoadingProrationInfo(false);
    } catch (error) {
      const component = "Employee Proration Error | ";
      ErrorHandler(error, component);
      setLoadingProrationInfo(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    data?.id && getStaffProration();
  }, [data?.id, getStaffProration]);

  // Handle Submit:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      prorate: formData?.prorate,
      total_days_worked: +totalDaysWorked
      // salary_month: formData?.salary_month?.toString(),
      // year: formData?.year?.toString(),
    };

    try {
      const res = await axiosInstance.put(
        `/api/v1/salary_slips/${data?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          payload: formattedData
        }
      );
      // eslint-disable-next-line no-unused-vars
      const resData = res?.data?.data;

      fetchEmployeeSalarySlip();
      fetchPayrollTotals();
      setTotalDaysWorked(null);

      showAlert(
        true,
        "Salary slip successfully updated!",
        "alert alert-success"
      );
      $("#EditSalarySlipModal").modal("toggle");
      setLoading(false);
    } catch (error) {
      showAlert(true, error.response.data.errors, "alert alert-warning");
      $("#EditSalarySlipModal").modal("toggle");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="EditSalarySlipModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-l">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit{" "}
                {data?.employeeName
                  .toLowerCase()
                  .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                's Payroll
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="basic">Basic</label>
                      <input
                        name="basic"
                        type="number"
                        className="form-control"
                        value={formData.basic}
                        max={maxBasic}
                        onChange={handleChange}
                        step="any"
                      />
                    </div>
                  </div> */}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="total_days_worked">
                        Total days worked
                      </label>
                      <input
                        name="total_days_worked"
                        type="number"
                        className="form-control"
                        value={totalDaysWorked}
                        onChange={handleTotalDaysWorked}
                        placeholder={
                          loadingProrationInfo ? "fetching..." : null
                        }
                        max={30}
                        step="1"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="prorate">Prorate</label>
                      <Select
                        name="prorate"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                        value={{
                          label: formData?.prorate ? "Yes" : "No",
                          value: formData?.prorate
                        }}
                        onChange={(e) =>
                          setFormData({ ...formData, prorate: e.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={clearForm}
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
                      "Confirm"
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
