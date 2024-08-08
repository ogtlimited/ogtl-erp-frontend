/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import {
  selectModuleType,
  officeTypeOptions,
  selectApproverOptions,
  selectLeadershipOptions
} from "../../../components/FormJSON/Select";
import { MdOutlineAdd } from "react-icons/md";
import Select from "react-select";
import moment from "moment";

const ApprovalModule = () => {
  const {
    showAlert,
    loadingSelect,
    selectDepartments,
    selectCampaigns,
    selectDesignations,
    goToTop
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");

  const [stage, setStage] = useState(0);
  const [arroverSection, setApproverSection] = useState(false);

  useEffect(() => {
    console.log("show form data:", formData);
  }, [formData]);

  const handleOfficeTypeChange = (e) => {
    setFormData({
      ...formData,
      office_type: e?.value,
      operation_office_id: "",
      officeName: ""
    });

    setOfficeType(e?.label);
    setIsOfficeTypeSelected(true);
  };

  const handleOfficeChange = (e) => {
    setFormData({
      ...formData,
      operation_office_id: e?.value,
      officeName: e?.label
    });
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddApprover = () => {
    setStage(stage + 1);
    setApproverSection(true);
  };

  const handleSubmit = async () => {
    console.log("Submit this module", formData);

    // setLoading(true);

    // try {
    //   const response = await axiosInstance.post(`/api/v1/hr_surveys.json`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "ngrok-skip-browser-warning": "69420"
    //     },
    //     payload: formattedSurveyData
    //   });

    //   showAlert(
    //     true,
    //     `${response?.data?.data?.message}`,
    //     "alert alert-success"
    //   );

    //   setTitle("");
    //   setFrom(today);
    //   setTo(lastDay);
    //   setSelectedDepartmentOptions([]);
    //   setSelectedDepartment([]);
    //   setSelectedCampaignOptions([]);
    //   setSelectedCampaign([]);
    //   setLoading(false);
    // } catch (error) {
    //   goToTop();
    //   const errorMsg = error?.response?.data?.errors;
    //   showAlert(true, `${errorMsg}`, "alert alert-warning");
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Approval Form</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Settings</li>
              <li className="breadcrumb-item active">Approval Module</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="column approval_builder">
        <div className="row col-md-12">
          {/* Module Name */}
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="module_name">Module Name</label>
              <Select
                options={selectModuleType}
                isSearchable={true}
                value={
                  formData?.module_name
                    ? {
                        value: formData?.module_name,
                        label: formData?.module
                      }
                    : null
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    module_name: e?.value,
                    module: e?.label
                  })
                }
                style={{ display: "inline-block" }}
                placeholder={
                  !selectModuleType?.length
                    ? "fetching module..."
                    : "Select Module"
                }
              />
            </div>
          </div>

          {/* Office Type */}
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="office_type">Office Type</label>
              <Select
                options={officeTypeOptions}
                value={{
                  label: officeType,
                  value: officeType
                }}
                style={{ display: "inline-block" }}
                onChange={(e) => handleOfficeTypeChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="row col-md-12">
          {/* Offices */}
          {isOfficeTypeSelected && (
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="operation_office_id">Office</label>
                <Select
                  options={
                    officeType === "Department"
                      ? selectDepartments
                      : officeType === "Campaign"
                      ? selectCampaigns
                      : null
                  }
                  isSearchable={true}
                  value={
                    formData?.operation_office_id
                      ? {
                          label: formData?.officeName,
                          value: formData?.operation_office_id
                        }
                      : null
                  }
                  onChange={(e) => handleOfficeChange(e)}
                  style={{ display: "inline-block" }}
                  placeholder={
                    officeType === "Department" && !selectDepartments?.length
                      ? "fetching departments..."
                      : officeType === "Campaign" && !selectCampaigns?.length
                      ? "fetching campaigns..."
                      : `Select ${officeType}`
                  }
                />
              </div>
            </div>
          )}

          {/* Stages */}
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="stages">Stages</label>
              <input
                type="number"
                name="stages"
                value={formData?.stages}
                onChange={handleFormChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-md-4" style={{ marginTop: "2rem" }}>
          <button
            type="button"
            className={`add_btn_new ${arroverSection && "disabled"}`}
            onClick={handleAddApprover}
            disabled={arroverSection}
          >
            <MdOutlineAdd /> <span>Add Approver</span>
          </button>
        </div>
      </div>

      {arroverSection && (
        <div className="column approval_builder">
          <div className="form-radio-group">
            {selectApproverOptions.map((option, index) => (
              <div className="form-radio" key={index}>
                <label
                  className="form-radio-label"
                  htmlFor={`approverOption${index}`}
                >
                  {option.label}
                </label>
                <input
                  className="form-radio-input"
                  type="radio"
                  name="approverOption"
                  id={`approverOption${index}`}
                  value={option.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      approverOption: e.target.value
                    })
                  }
                />
              </div>
            ))}
          </div>

          {/* Leadership Option */}
          {formData?.approverOption === "leadership" ? (
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="leadership_option">Leadership Option</label>
                <Select
                  options={selectLeadershipOptions}
                  isSearchable={true}
                  value={
                    formData?.leadership_option
                      ? {
                          label: formData?.leadershipName,
                          value: formData?.leadership
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      leadershipName: e?.label,
                      leadership: e?.value
                    })
                  }
                  style={{ display: "inline-block" }}
                  placeholder={
                    !selectLeadershipOptions?.length
                      ? "fetching leaderships..."
                      : "Select Leadership"
                  }
                />
              </div>
            </div>
          ) : null}

          {/* Designation Option */}
          {formData?.approverOption === "designation" ? (
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="designation_option">Designation Option</label>
                <Select
                  options={selectDesignations}
                  isSearchable={true}
                  value={
                    formData?.designation_option
                      ? {
                          label: formData?.designationName,
                          value: formData?.designation
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      designationName: e?.label,
                      designation: e?.value
                    })
                  }
                  style={{ display: "inline-block" }}
                  placeholder={
                    !selectDesignations?.length
                      ? "fetching designation..."
                      : "Select Designation"
                  }
                />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ApprovalModule;
