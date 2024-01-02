import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";

export const EditSalarySlipModal = ({ data, fetchEmployeeSalarySlip }) => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData({
      monthly_income_tax: data?.initialTax,
      monthly_pension: data?.initialPension,
      netPay: data?.initialNetPay,
      prorate: data?.initialProrate,
      // salary: data?.initialSalary,
    });
  }, [
    data?.initialTax,
    data?.initialPension,
    data?.initialNetPay,
    data?.initialProrate,
    // data?.initialSalary,
  ]);

  const clearForm = () => {
    setFormData({
      monthly_income_tax: data?.initialTax,
      monthly_pension: data?.initialPension,
      netPay: data?.initialNetPay,
      prorate: data?.initialProrate,
      // salary: data?.initialSalary,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      monthly_income_tax: +formData?.monthly_income_tax,
      monthly_pension: +formData?.monthly_pension,
      netPay: +formData?.netPay,
      prorate: formData?.prorate,
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
                      <label htmlFor="monthly_income_tax">Tax</label>
                      <input
                        name="monthly_income_tax"
                        type="number"
                        className="form-control"
                        value={formData.monthly_income_tax}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="monthly_pension">Pension</label>
                      <input
                        name="monthly_pension"
                        type="number"
                        className="form-control"
                        value={formData.monthly_pension}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="netPay">Net Pay</label>
                      <input
                        name="netPay"
                        type="number"
                        className="form-control"
                        value={formData.netPay}
                        onChange={handleChange}
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
