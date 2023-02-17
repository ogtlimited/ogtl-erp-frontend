/* eslint-disable no-unused-vars */
/** @format */

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { bank_details } from '../FormJSON/CreateLeaveApprovalLevel';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import Select from 'react-select';
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
                Bank Information
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
                      <label htmlFor="department">Salary Mode</label>
                      <Select
                          options={salaryMode}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setBankDetails({ ...bankDetails, salary_mode: e?.value })
                          }
                          style={{ display: 'inline-block' }}
                        />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="bank_name">Bank Name</label>
                      <input 
                        name="bank_name"
                        type="text"
                        className="form-control"
                        value={bankDetails.bank_name}
                        onChange={handleFormChange}/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="bank_code">Bank Code</label>
                      <input
                        name="bank_code"
                        type="text"
                        className="form-control"
                        value={bankDetails.bank_code}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="bank_account_number">Account Number</label>
                      <input
                        name="bank_account_number"
                        type="text"
                        className="form-control"
                        value={bankDetails.bank_account_number}
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
