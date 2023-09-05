/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import {
  officeTypeOptions,
  jobOpeningStatus,
  positionType,
  adminRole,
} from "../FormJSON/CreateJobOpening";
import $ from "jquery";
import Select from "react-select";
import TextEditor from "../Forms/TextEditor";
import moment from "moment";

export const JobOpeningFormModal = ({ mode, data, fetchJobOpening }) => {
  const { showAlert, selectBranches, goToTop } = useAppContext();
  const [jobOpening, setJobOpening] = useState([]);
  const [loading, setLoading] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [allOffices, setAllOffices] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    if (mode === "Create") {
      setJobOpening(data);
    } else {
      setJobOpening({
        ...data,
        operation_office_id: data?.operation_office?.id,
        operation_branch_id: data?.operation_branch?.id,
        start_date: moment(data?.start_date).format("YYYY-MM-DD"),
        end_date: moment(data?.dead_line).format("YYYY-MM-DD"),
        status: data?.status,
        position_type: data?.position_type,
        admin_role: data?.admin_role,
        officeName: data?.operation_office?.title,
        branchName: data?.operation_branch?.title,
        statusName: data?.status === "open" ? "OPEN" : "CLOSED",
        adminRole: data?.admin_role ? "YES" : "NO",
      });
      setOfficeType(data?.office_type);
      setIsOfficeSelected(true);
      setEditorContent(data?.description);
    }
  }, [data, mode]);

  const cancelEvent = () => {
    setJobOpening(data);
    setOfficeType("");
    setIsOfficeSelected(false);
    setEditorContent("");
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setJobOpening({
      ...jobOpening,
      [e.target.name]: e.target.value,
    });
  };

  const handleOfficeTypeChange = (e) => {
    fetchAllOffices(e?.value);
    setOfficeType(e?.label);
    setIsOfficeSelected(true);
  };

  useEffect(() => {
    if (
      jobOpening?.operation_office_id &&
      jobOpening?.operation_branch_id &&
      jobOpening?.status &&
      jobOpening?.position_type
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    jobOpening?.operation_branch_id,
    jobOpening?.operation_office_id,
    jobOpening?.position_type,
    jobOpening?.status,
  ]);

  // All Offices:
  const fetchAllOffices = async (office) => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: office,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const allDepartments = resData.filter(
        (e) => e?.office_type === "department"
      );
      const allCampaigns = resData.filter((e) => e?.office_type === "campaign");

      const formattedDepartments = allDepartments
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      const formattedCampaigns = allCampaigns
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      if (office === "department") setAllOffices(formattedDepartments);
      if (office === "campaign") setAllOffices(formattedCampaigns);
    } catch (error) {
      console.log("All Offices error:", error);
    }
  };

  const handleJobOpeningActions = async (e) => {
    if (mode === "Create") {
      return handleCreateJobOpening(e);
    } else {
      return handleEditJobOpening(e);
    }
  };

  const handleCreateJobOpening = async (e) => {
    e.preventDefault();

    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(editorContent, "text/html");
    const extractedText = parsedHTML.querySelector("p").textContent;

    const dataPayload = {
      job_title: jobOpening.job_title,
      operation_office_id: jobOpening.operation_office_id,
      operation_branch_id: jobOpening.operation_branch_id,
      start_date: jobOpening.start_date,
      end_date: jobOpening.end_date,
      status: jobOpening.status,
      experience: +jobOpening.experience,
      vacancy: +jobOpening.vacancy,
      position_type: jobOpening.position_type,
      admin_role: jobOpening.admin_role,
      description: extractedText,
    };

    console.log("payload:", dataPayload);

    // setLoading(true);
    // try {
    //   // eslint-disable-next-line no-unused-vars
    //   const response = await axiosInstance.post(`/api/v1/job_openings.json`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "ngrok-skip-browser-warning": "69420",
    //     },
    //     payload: dataPayload
    //   });

    //   showAlert(
    //     true,
    //     "Job opening created successfully",
    //     "alert alert-success"
    //   );
    //   fetchJobOpening();
    //   $("#JobOpeningFormModal").modal("toggle");
    //   cancelEvent();
    //   setLoading(false);
    //   goToTop();
    // } catch (error) {
    //   const errorMsg = error?.response?.data?.errors;
    //   showAlert(true, `${errorMsg}`, "alert alert-warning");
    //   $("#JobOpeningFormModal").modal("toggle");
    //   goToTop();
    //   setLoading(false);
    // }
  };

  const handleEditJobOpening = async (e) => {
    e.preventDefault();

    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(editorContent, "text/html");
    const extractedText = parsedHTML.querySelector("p").textContent;

    const dataPayload = {
      job_title: jobOpening.job_title,
      operation_office_id: jobOpening.operation_office_id,
      operation_branch_id: jobOpening.operation_branch_id,
      start_date: jobOpening.start_date,
      end_date: jobOpening.end_date,
      status: jobOpening.status,
      experience: +jobOpening.experience,
      vacancy: +jobOpening.vacancy,
      position_type: jobOpening.position_type,
      admin_role: jobOpening.admin_role || false,
      description: extractedText,
    };

    console.log("Edit payload:", dataPayload);

    // setLoading(true);
    // const id = jobOpening?.id;
    // try {
    //   // eslint-disable-next-line no-unused-vars
    //   const response = await axiosInstance.patch(
    //     `/api/v1/job_openings/${id}.json`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "ngrok-skip-browser-warning": "69420",
    //       },
    //       payload: dataPayload
    //     }
    //   );

    //   showAlert(
    //     true,
    //     "Job opening successfully updated",
    //     "alert alert-success"
    //   );
    //   fetchJobOpening();
    //   $("#JobOpeningFormModal").modal("toggle");
    //   setLoading(false);
    //   goToTop();
    // } catch (error) {
    //   const errorMsg = error?.response?.data?.errors;
    //   showAlert(true, `${errorMsg}`, "alert alert-warning");
    //   $("#JobOpeningFormModal").modal("toggle");
    //   goToTop();
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div
        className="modal fade"
        id="JobOpeningFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Job Opening
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
              <form onSubmit={handleJobOpeningActions}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="job_title">Job Title</label>
                      <input
                        name="job_title"
                        type="text"
                        className="form-control"
                        value={jobOpening.job_title}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Office Type</label>
                      <Select
                        options={officeTypeOptions}
                        style={{ display: "inline-block" }}
                        value={{
                          label: officeType,
                          value: officeType,
                        }}
                        onChange={(e) => handleOfficeTypeChange(e)}
                      />
                    </div>
                  </div>

                  {/* Select Office */}
                  {isOfficeSelected ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="operation_office_id">Office</label>
                        <Select
                          options={allOffices}
                          isSearchable={true}
                          value={{
                            label: jobOpening?.officeName,
                            value: jobOpening?.operation_office_id,
                          }}
                          onChange={(e) =>
                            setJobOpening({
                              ...jobOpening,
                              operation_office_id: e?.value,
                              officeName: e?.label,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* Select Branch */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="operation_branch_id">Branch</label>
                      <Select
                        options={selectBranches}
                        isSearchable={true}
                        value={{
                          label: jobOpening?.branchName,
                          value: jobOpening?.operation_branch_id,
                        }}
                        onChange={(e) =>
                          setJobOpening({
                            ...jobOpening,
                            operation_branch_id: e?.value,
                            branchName: e?.label,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start_date">Start Date</label>
                      <input
                        type="date"
                        name="start_date"
                        value={jobOpening.start_date}
                        onChange={handleFormChange}
                        className="form-control "
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date">End Date</label>
                      <input
                        type="date"
                        name="end_date"
                        value={jobOpening.end_date}
                        onChange={handleFormChange}
                        className="form-control "
                        required
                      />
                    </div>
                  </div>

                  {/* Select Status */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <Select
                        options={jobOpeningStatus}
                        isSearchable={true}
                        value={{
                          label: jobOpening?.statusName,
                          value: jobOpening?.status,
                        }}
                        onChange={(e) =>
                          setJobOpening({
                            ...jobOpening,
                            status: e?.value,
                            statusName: e?.label,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  {/* Select Position Type */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="position_type">Position Type</label>
                      <Select
                        options={positionType}
                        isSearchable={true}
                        value={{
                          label: jobOpening?.position_type,
                          value: jobOpening?.position_type,
                        }}
                        onChange={(e) =>
                          setJobOpening({
                            ...jobOpening,
                            position_type: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="experience">Years of Experience</label>
                      <input
                        name="experience"
                        type="number"
                        className="form-control"
                        value={jobOpening.experience}
                        onChange={handleFormChange}
                        min={0}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="vacancy">No of Vacancies</label>
                      <input
                        name="vacancy"
                        type="number"
                        className="form-control"
                        value={jobOpening.vacancy}
                        onChange={handleFormChange}
                        min={0}
                        required
                      />
                    </div>
                  </div>

                  {/* Admin Role */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="admin_role">Is this an admin role?</label>
                      <Select
                        options={adminRole}
                        isSearchable={true}
                        value={{
                          label: jobOpening?.adminRole,
                          value: jobOpening?.admin_role,
                        }}
                        onChange={(e) =>
                          setJobOpening({
                            ...jobOpening,
                            admin_role: e?.value,
                            adminRole: e?.label,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="description">Job Description</label>
                      <TextEditor
                        editorContent={editorContent}
                        onContentChange={setEditorContent}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  {mode === "Create" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isFormValid}
                  >
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
