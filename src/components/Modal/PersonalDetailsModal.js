import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import {
  genderOptions,
  bloodGroupOptions,
  maritalStatusOptions,
  meansOfIdentificationOptions
} from "../FormJSON/AddEmployee";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const PersonalDetailsModal = ({
  data,
  fetchEmployeeProfile,
  CurrentUserCanCreateAndEdit
}) => {
  const { showAlert, goToTop } = useAppContext();
  const [personalDetails, setPersonalDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [imageSize, setImageSize] = useState(null);
  const [imageSizeColor, setImageSizeColor] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setPersonalDetails(data?.employee?.personal_detail);
  }, [data]);

  const cancelEvent = () => {
    setPersonalDetails(data?.employee?.personal_detail);
    setLoading(false);
    setImageSize(null);
    setImageSizeColor(null);
    setUploadProgress(0);
    setFileInputKey((prevKey) => prevKey + 1);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 52428800) {
      setPersonalDetails({ ...personalDetails, profile_picture: selectedFile });
      setImageSize(selectedFile.size);
      setImageSizeColor("green");
    } else {
      setPersonalDetails({ ...personalDetails, profile_picture: selectedFile });
      setImageSize(selectedFile.size);
      setImageSizeColor("red");
      showAlert(true, "File size exceeds 50MB limit", "alert alert-warning");
    }
  };

  const handleEditPersonalDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in personalDetails) {
      formData.append(key, personalDetails[key] || "");
    }

    try {
      const id = personalDetails.id;

      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/personal_details/${id}.json`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          }
        }
      );

      showAlert(
        true,
        "Employee personal details updated successfully!",
        "alert alert-success"
      );
      fetchEmployeeProfile();
      $("#PersonalDetailsModal").modal("toggle");
      setPersonalDetails(data);
      setLoading(false);
      goToTop();
    } catch (error) {
      showAlert(
        true,
        error?.response?.data?.errors || "Error updating records",
        "alert alert-warning"
      );
      $("#PersonalDetailsModal").modal("toggle");
      setLoading(false);
      goToTop();
    }
  };

  return (
    <div
      className="modal fade"
      id="PersonalDetailsModal"
      tabIndex="-1"
      aria-labelledby="FormModalLabel"
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
                <div
                  className="col-md-12"
                  style={{
                    marginBottom: "1rem"
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="profile_picture">Profile Picture</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="profile_picture"
                      name="profile_picture"
                      key={fileInputKey}
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ marginBottom: "1rem", cursor: "pointer" }}
                    />
                    {imageSize && (
                      <div className="text-muted">
                        Selected image size:{" "}
                        <span
                          className={
                            imageSizeColor === "green"
                              ? "image_good"
                              : "text-danger"
                          }
                        >
                          {(imageSize / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="progress mb-2">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${uploadProgress}%`
                      }}
                      aria-valuenow={uploadProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {uploadProgress}%
                    </div>
                  </div>
                </div>

                {CurrentUserCanCreateAndEdit && (
                  <>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                          name="first_name"
                          type="text"
                          className="form-control"
                          value={personalDetails?.first_name || ""}
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
                          value={personalDetails?.middle_name || ""}
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
                          value={personalDetails?.last_name || ""}
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
                            label:
                              personalDetails?.gender?.replace(
                                /\b\w/g,
                                (char) => char.toUpperCase()
                              ) || "Select gender...",
                            value: personalDetails?.gender
                          }}
                          onChange={(e) =>
                            setPersonalDetails({
                              ...personalDetails,
                              gender: e?.value
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
                          value={personalDetails?.DOB?.split("T")[0] || ""}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="blood_group">Blood Group</label>
                        <Select
                          options={bloodGroupOptions}
                          isSearchable={true}
                          isClearable={true}
                          value={{
                            label:
                              personalDetails?.blood_group?.replace(
                                /\b\w/g,
                                (char) => char.toUpperCase()
                              ) || "Select blood group...",
                            value: personalDetails?.blood_group
                          }}
                          onChange={(e) =>
                            setPersonalDetails({
                              ...personalDetails,
                              blood_group: e?.value
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="marital_status">Marital Status</label>
                        <Select
                          options={maritalStatusOptions}
                          isSearchable={true}
                          isClearable={true}
                          value={{
                            label:
                              personalDetails?.marital_status?.replace(
                                /\b\w/g,
                                (char) => char.toUpperCase()
                              ) || "Select marital status...",
                            value: personalDetails?.marital_status
                          }}
                          onChange={(e) =>
                            setPersonalDetails({
                              ...personalDetails,
                              marital_status: e?.value
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
                          value={{
                            label:
                              personalDetails?.means_of_identification?.replace(
                                /\b\w/g,
                                (char) => char.toUpperCase()
                              ) || "Select means of identification...",
                            value: personalDetails?.means_of_identification
                          }}
                          onChange={(e) =>
                            setPersonalDetails({
                              ...personalDetails,
                              means_of_identification: e?.value
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
                          value={personalDetails?.id_number || ""}
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
                          value={
                            personalDetails?.id_issue_date?.split("T")[0] || ""
                          }
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </>
                )}
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
  );
};
