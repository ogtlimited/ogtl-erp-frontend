/* eslint-disable no-unused-vars */
/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const BankDetailsModal = ({
  data,
  fetchEmployeeProfile,
  CurrentUserCanCreateAndEdit
}) => {
  const { showAlert, salaryMode, goToTop } = useAppContext();
  const [bankDetails, setBankDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBankDetails(data);
  }, [data]);

  const cancelEvent = () => {
    setBankDetails(data);
    setLoading(false);
  };

  const handleFormChange = (e) => {
    e.preventDefault();

    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleEditBankDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    const editedBankDetails = {
      bank_code: bankDetails?.bank_code,
      bank_account: bankDetails?.bank_account,
      bank_name: bankDetails?.bank_name
    };

    try {
      const res = await axiosInstance.put(
        `/api/v1/bank_details/${data?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          payload: editedBankDetails
        }
      );

      const resData = res?.data?.data;

      showAlert(
        true,
        res?.message || "Employee bank details updated successfully!",
        "alert alert-success"
      );
      fetchEmployeeProfile();
      $("#BankInfoFormModal").modal("toggle");
      setBankDetails(data);
      setLoading(false);
      goToTop();
    } catch (error) {
      showAlert(
        true,
        error?.response?.data?.errors || "Error updating records",
        "alert alert-warning"
      );
      $("#BankInfoFormModal").modal("toggle");
      setLoading(false);
      goToTop();
    }
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
                Edit Bank Detail
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
              <form onSubmit={handleEditBankDetails}>
                <div className="row">
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="department">Salary Mode</label>
                      <Select
                        options={salaryMode}
                        isSearchable={true}
                        isClearable={true}
                        onChange={(e) =>
                          setBankDetails({
                            ...bankDetails,
                            salary_mode: e?.value
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div> */}

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="bank_name">Bank Name</label>
                      <input
                        name="bank_name"
                        type="text"
                        className="form-control"
                        value={bankDetails?.bank_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="bank_account_number">
                        Account Number
                      </label>
                      <input
                        name="bank_account_number"
                        type="text"
                        className="form-control"
                        value={bankDetails?.bank_account}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/\D/.test(value)) {
                            return;
                          }

                          setBankDetails((prev) => {
                            return {
                              ...prev,
                              bank_account: value
                            };
                          });
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="bank_code">Bank Code</label>
                      <input
                        name="bank_code"
                        type="text"
                        className="form-control"
                        value={bankDetails?.bank_code}
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
                      "Submit"
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
