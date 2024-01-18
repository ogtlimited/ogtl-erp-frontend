import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import $ from "jquery";
import helper from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";

export const EditSalarySlipModal = ({
  data,
  fetchEmployeeSalarySlip,
  fetchPayrollTotals,
}) => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState([]);
  const [maxBasic, setMaxBasic] = useState(null);
  const [totalDaysWorked, setTotalDaysWorked] = useState(22);

  useEffect(() => {
    setFormData({
      monthly_income_tax: data?.initialTax,
      monthly_pension: data?.initialPension,
      basic: data?.initialBasic,
      prorate: data?.initialProrate,
      // salary: data?.initialSalary,
    });

    setMaxBasic(data?.initialBasic);
  }, [
    data?.initialTax,
    data?.initialPension,
    data?.initialBasic,
    data?.initialProrate,
    // data?.initialSalary,
  ]);

  const clearForm = () => {
    setFormData({
      monthly_income_tax: data?.initialTax,
      monthly_pension: data?.initialPension,
      basic: data?.initialBasic,
      prorate: data?.initialProrate,
      // salary: data?.initialSalary,
    });

    setTotalDaysWorked(22);
  };

  // Handle Form Change:
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Submit:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      monthly_income_tax: +formData?.monthly_income_tax,
      monthly_pension: +formData?.monthly_pension,
      basic: +formData?.basic,
      prorate: formData?.prorate,
      
      total_days_worked: +totalDaysWorked,
      // salary: +formData?.salary,
    };

    try {
      const res = await axiosInstance.put(
        `/api/v1/salary_slips/${data?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: formattedData,
        }
      );
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;

      fetchEmployeeSalarySlip();
      fetchPayrollTotals();

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
                  <div className="col-md-6">
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
                  </div>

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
                        onChange={(e) => setTotalDaysWorked(e?.target?.value)}
                        max={22}
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
                          { value: false, label: "No" },
                        ]}
                        value={{
                          label: formData?.prorate ? "Yes" : "No",
                          value: formData?.prorate,
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
