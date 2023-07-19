import React, { useState, useEffect } from "react";
import { genderOptions, bloodGroupOptions, maritalStatusOptions, meansOfIdentificationOptions } from "../FormJSON/AddEmployee";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import { useAppContext } from "../../Context/AppContext";

export const PersonalDetailsModal = ({ data, fetchEmployeeProfile }) => {
  const { showAlert } = useAppContext();
  const [personalDetails, setPersonalDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPersonalDetails(data?.employee?.personal_detail);
  }, [data]);

  const handleFormChange = (e) => {
    e.preventDefault();
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditPersonalDetails = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const id = personalDetails.id;
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(`/api/v1/personal_details/${id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          first_name: personalDetails.first_name,
          middle_name: personalDetails.middle_name,
          last_name: personalDetails.last_name,
          gender: personalDetails.gender,
          DOB: personalDetails.DOB,
          blood_group: personalDetails.blood_group,
          marital_status: personalDetails.marital_status,
          means_of_identification: personalDetails.means_of_identification,
          id_number: personalDetails.id_number,
          id_issue_date: personalDetails.id_issue_date,
        },
      });

      showAlert(true, "employee personal details updated successfully!", "alert alert-success");
      fetchEmployeeProfile();
      $("#PersonalDetailsModal").modal("toggle");
      setPersonalDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("Edit Personal Details error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="PersonalDetailsModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit Personal Details
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
              <form onSubmit={handleEditPersonalDetails}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        name="first_name"
                        type="text"
                        className="form-control"
                        value={personalDetails?.first_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="middle_name">Middle Name</label>
                      <input
                        name="middle_name"
                        type="text"
                        className="form-control"
                        value={personalDetails?.middle_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        name="last_name"
                        type="text"
                        className="form-control"
                        value={personalDetails?.last_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <Select
                        name="gender"
                        options={genderOptions}
                        value={{
                          label: personalDetails?.gender,
                          value: personalDetails?.gender
                        }}
                        onChange={(e) =>
                          setPersonalDetails({
                            ...personalDetails,
                            gender: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="DOB">Date of Birth</label>
                      <input
                        name="DOB"
                        type="date"
                        className="form-control"
                        value={personalDetails?.DOB?.split("T")[0]}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="blood_group">
                        Blood Group
                      </label>
                      <Select
                        options={bloodGroupOptions}
                        isSearchable={true}
                        isClearable={true}
                        onChange={(e) =>
                          setPersonalDetails({
                            ...personalDetails,
                            blood_group: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="marital_status">
                        Marital Status
                      </label>
                      <Select
                        options={maritalStatusOptions}
                        isSearchable={true}
                        isClearable={true}
                        onChange={(e) =>
                          setPersonalDetails({
                            ...personalDetails,
                            marital_status: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="means_of_identification">
                        Means of Identification
                      </label>
                      <Select
                        options={meansOfIdentificationOptions}
                        isSearchable={true}
                        isClearable={true}
                        onChange={(e) =>
                          setPersonalDetails({
                            ...personalDetails,
                            means_of_identification: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="id_number">ID Number</label>
                      <input
                        name="id_number"
                        type="text"
                        className="form-control"
                        value={personalDetails?.id_number}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="id_issue_date">ID Issue Date</label>
                      <input
                        name="id_issue_date"
                        type="date"
                        className="form-control"
                        value={personalDetails?.id_issue_date?.split("T")[0]}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>

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
