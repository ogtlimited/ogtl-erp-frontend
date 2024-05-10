/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const EncryptionFormModal = ({ refetchData, setAllSalaries }) => {
  const { showAlert } = useAppContext();
  const [formData, setFormData] = useState({
    encryption_key: "",
  });
  const [loading, setLoading] = useState(false);

  const cancelEvent = () => {
    setFormData({
      encryption_key: "",
    });
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEncryption = async (e) => {
    e.preventDefault();

    console.log("formData", formData)

    // setLoading(true);
    // try {
    //   // eslint-disable-next-line no-unused-vars
    //   const response = await axiosInstance.post(
    //     `/api/v1/employee_salaries.json`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "ngrok-skip-browser-warning": "69420",
    //       },
    //     }
    //   );

    //   showAlert(true, `Successfully ✅`, "alert alert-success");
    //   refetchData();

    //   $("#EncryptionFormModal").modal("toggle");

    //   console.log("Salary response", response)

    //   // setAllSalaries();
    //   setLoading(false);
    // } catch (error) {
    //   const errorMsg = error?.response?.data?.errors;
    //   showAlert(true, `${errorMsg}`, "alert alert-warning");
    //   $("#EncryptionFormModal").modal("toggle");

    //   setLoading(false);
    // }
  };

  return (
    <>
      <div
        className="modal fade"
        id="EncryptionFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Encrption Key
              </h4>
            </div>

            <div className="modal-body">
              <form onSubmit={handleCreateEncryption}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="encryption_key">
                        Enter encyption key
                      </label>
                      <input
                        name="encryption_key"
                        type="text"
                        className="form-control"
                        value={formData?.encryption_key}
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
