import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";

export const EditSalarySlipModal = ({
  salarySlipId,
  initialSalary,
  initialNetPay,
  initialProrate,
}) => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    salary: initialSalary || "",
    netPay: initialNetPay || "",
    prorate: initialProrate || false,
  });

  useEffect(() => {

    const clearForm = () => {
      setFormData({
        salary: initialSalary || "",
        netPay: initialNetPay || "",
        prorate: initialProrate || false,
      });
    };

    $("#EditSalarySlipModal").on("hidden.bs.modal", clearForm);
    return () => {
      $("#EditSalarySlipModal").off("hidden.bs.modal", clearForm);
    };
  }, []); 

  const handleChange = (e) => {
    console.log("handleChange", e.target.name, e.target.value);
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
      payload: {
        prorate: formData.prorate,
        salary: +formData.salary,
        net_pay: +formData.netPay,
      },
    };

    try {
      const res = await axiosInstance.put(
        `/api/v1/salary_slips/${salarySlipId}.json`,
        formattedData
      );
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;
      showAlert(true, "Successful!", "alert alert-success");
      $("#EditSalarySlipModal").modal("toggle");
      setLoading(false);
    } catch (error) {
      showAlert(true, error.response.data.errors, "alert alert-warning");
      $("#EditSalarySlipModal").modal("toggle");
      setLoading(false);
      console.error("Error:", error);
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
                Edit 
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
                {/* <label htmlFor="salary">Salary</label>
                <input
                  name="salary"
                  type="number"
                  className="form-control"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                /> */}

                <label htmlFor="netPay">Net Pay</label>
                <input
                  name="netPay"
                  type="number"
                  className="form-control"
                  value={formData.netPay}
                  onChange={handleChange}
                  required
                />

                {/* <label htmlFor="prorate">Prorate</label>
                <input
                  name="prorate"
                  type="text"
                  className="form-control"
                  value={formData.prorate}
                  onChange={handleChange}
                  required
                /> */}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
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
                      "Edit"
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
