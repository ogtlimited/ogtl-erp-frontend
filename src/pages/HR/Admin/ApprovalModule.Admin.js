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
    selectRoles,
    goToTop
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");

  const [stage, setStage] = useState(0);
  const [arroverSection, setApproverSection] = useState(false);
  const [notifySection, setNotifySection] = useState(false);

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

  const handleAddApproverSection = () => {
    setStage(stage + 1);
    setApproverSection(true);
  };

  const handleAddNotifySection = () => {
    setNotifySection(true);
  };

  const handleSubmit = async () => {
    console.log("Submit this module", formData);
  };

  const renderSelect = (label, options, value, onChange) => (
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <Select
          options={options}
          isSearchable
          value={value}
          onChange={onChange}
          style={{ display: "inline-block" }}
          placeholder={
            !options.length
              ? `fetching ${label.toLowerCase()}...`
              : `Select ${label}`
          }
        />
      </div>
    </div>
  );

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
            onClick={handleAddApproverSection}
            disabled={arroverSection}
          >
            <MdOutlineAdd /> <span>Add Approver</span>
          </button>
        </div>
      </div>

      {/* Approver Section */}
      {arroverSection && (
        <div className="column approval_builder">
          <h3 className="approval_builder_header">
            {formData?.approverOption &&
              formData?.approverOption?.replace(/\b\w/g, (char) =>
                char.toUpperCase()
              )}
          </h3>

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
                    formData?.leadershipName
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
                    formData?.designationName
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
                      ? "fetching designations..."
                      : "Select Designation"
                  }
                />
              </div>
            </div>
          ) : null}

          {/* Role Option */}
          {formData?.approverOption === "role" ? (
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="role_option">Role Option</label>
                <Select
                  options={selectRoles}
                  isSearchable={true}
                  value={
                    formData?.roleName
                      ? {
                          label: formData?.roleName,
                          value: formData?.role
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roleName: e?.label,
                      role: e?.value
                    })
                  }
                  style={{ display: "inline-block" }}
                  placeholder={
                    !selectRoles?.length ? "fetching roles..." : "Select Role"
                  }
                />
              </div>
            </div>
          ) : null}

          {/* Checkboxes & Confirm Btn*/}
          {formData?.approverOption?.length ? (
            <>
              <div className="form-checkbox-group">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="finalApprover"
                    name="finalApprover"
                    className="form-checkbox-input"
                    checked={formData.finalApprover || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        finalApprover: e.target.checked
                      })
                    }
                  />
                  <label
                    htmlFor="finalApprover"
                    className="form-checkbox-label"
                  >
                    Final Approver?
                  </label>
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="leaveNotes"
                    name="leaveNotes"
                    className="form-checkbox-input"
                    checked={formData.leaveNotes || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leaveNotes: e.target.checked
                      })
                    }
                  />
                  <label htmlFor="leaveNotes" className="form-checkbox-label">
                    Leave Notes?
                  </label>
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="sendBackOption"
                    name="sendBackOption"
                    className="form-checkbox-input"
                    checked={formData.sendBackOption || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sendBackOption: e.target.checked
                      })
                    }
                  />
                  <label
                    htmlFor="sendBackOption"
                    className="form-checkbox-label"
                  >
                    Send Back Option?
                  </label>
                </div>
              </div>

              <div className="col-md-4" style={{ marginTop: "2rem" }}>
                <button
                  type="button"
                  className="add_btn_new"
                  onClick={handleAddNotifySection}
                >
                  <span>Confirm</span>
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* Notify Section */}
      {notifySection && (
        <div className="column approval_builder">
          <h3 className="approval_builder_header">
            Copy/Notify on Approval/Refusal
          </h3>

          <div className="form-radio-group">
            {selectApproverOptions.map((option, index) => (
              <div className="form-radio" key={index}>
                <label
                  className="form-radio-label"
                  htmlFor={`notifyOption${index}`}
                >
                  {option.label}
                </label>
                <input
                  className="form-radio-input"
                  type="radio"
                  name="notifyOption"
                  id={`notifyOption${index}`}
                  value={option.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifyOption: e.target.value
                    })
                  }
                />
              </div>
            ))}
          </div>

          {/* Leadership Option */}
          {formData?.notifyOption === "leadership" ? (
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="leadership_option">Leadership Option</label>
                <Select
                  options={selectLeadershipOptions}
                  isSearchable={true}
                  value={
                    formData?.leadershipToNotifyTitle
                      ? {
                          label: formData?.leadershipToNotifyTitle,
                          value: formData?.leadershipToNotify
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      leadershipToNotifyTitle: e?.label,
                      leadershipToNotify: e?.value
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
          {formData?.notifyOption === "designation" ? (
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="designation_option">Designation Option</label>
                <Select
                  options={selectDesignations}
                  isSearchable={true}
                  value={
                    formData?.designationToNotifyTitle
                      ? {
                          label: formData?.designationToNotifyTitle,
                          value: formData?.designationToNotify
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      designationToNotifyTitle: e?.label,
                      designationToNotify: e?.value
                    })
                  }
                  style={{ display: "inline-block" }}
                  placeholder={
                    !selectDesignations?.length
                      ? "fetching designations..."
                      : "Select Designation"
                  }
                />
              </div>
            </div>
          ) : null}

          {/* Role Option */}
          {formData?.notifyOption === "role" ? (
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="role_option">Role Option</label>
                <Select
                  options={selectRoles}
                  isSearchable={true}
                  value={
                    formData?.roleToNotifyTitle
                      ? {
                          label: formData?.roleToNotifyTitle,
                          value: formData?.roleToNotify
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roleToNotifyTitle: e?.label,
                      roleToNotify: e?.value
                    })
                  }
                  style={{ display: "inline-block" }}
                  placeholder={
                    !selectRoles?.length ? "fetching roles..." : "Select Role"
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
