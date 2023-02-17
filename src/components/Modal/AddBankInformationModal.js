/* eslint-disable no-unused-vars */
/** @format */

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { bank_details } from '../FormJSON/CreateLeaveApprovalLevel';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import $ from 'jquery';

export const AddBankInformationModal = ({ salaryDetails, fetchUserInfo }) => {
  const { id } = useParams();
  const { showAlert } = useAppContext();
  const [bankDetails, setBankDetails] = useState(bank_details);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const salaryMode = [
    {
      value: "bank",
      label: "Bank",
    },
    {
      value: "cash",
      label: "Cash",
    },
    {
      value: "cheque",
      label: "Cheque",
    },
  ]

  const cancelEvent = () => {
    setBankDetails(bank_details);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleCreateApprovalLevel = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post('/SalaryDetails', {
       ...bankDetails,
       _id: salaryDetails?.salaryDetails?._id,
       employee_id: id,
      });
      const resData = res.data.data;
      fetchUserInfo();
      showAlert(true, res.data.message, 'alert alert-success');
      setBankDetails(bank_details);
      $('#BankInfoFormModal').modal('toggle');
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="BankInfoFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Leave Approval Level
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
              <form onSubmit={handleCreateApprovalLevel}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <select
                        onChange={handleFormChange}
                        className="form-control "
                        name="department"
                        required
                      >
                        <option value="" disabled selected hidden>
                          Select department ...
                        </option>
                        {salaryMode.map((department, idx) => (
                          <option
                            key={idx}
                            value={department._id}
                            placeholder="Department"
                            required
                          >
                            {department.department}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="designation">Designation</label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="approval_level">Approval Level</label>
                      <input
                        name="approval_level"
                        type="number"
                        className="form-control"
                        // value={approvalLevel.approval_level}
                        onChange={handleFormChange}
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
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      'Submit'
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
