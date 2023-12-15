import React, { useState } from "react";
import axiosInstance from "../../services/api";

export const EditSalarySlipModal = ({ salarySlipId}) => {
  const [formData, setFormData] = useState({
    salary: 0,
    netPay: 0,
    prorate: false,
  });

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
    console.log("Submitting form with data:", formData);
    // Additional logic to handle data format or validation if needed
    const formattedData = {
      payload: {
        prorate: formData.prorate,
        salary: +formData.salary,
        net_pay: +formData.netPay,
      },
    };

    try {
      const res = await axiosInstance.put(`/api/v1/salary_slips/${salarySlipId}.json`, formattedData);
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;
     
    } catch (error) {
      // Additional error handling logic, e.g., show an error alert
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* Your existing modal code */}

      <form onSubmit={handleSubmit}>
        {/* Your existing form inputs */}
        <label htmlFor="salary">Salary</label>
        <input
          name="salary"
          type="text"
          className="form-control"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <label htmlFor="netPay">Net Pay</label>
        <input
          name="netPay"
          type="text"
          className="form-control"
          value={formData.netPay}
          onChange={handleChange}
          required
        />

        <label htmlFor="prorate">Prorate</label>
        <input
          name="prorate"
          type="text"
          className="form-control"
          value={formData.prorate}
          onChange={handleChange}
          required
        />

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
        </div>
      </form>
    </>
  );
};