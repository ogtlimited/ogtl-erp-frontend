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
import DropdownCheckboxOptions from "../../../components/Forms/DropdownCheckboxOptions";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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
  const [sendBackSection, setSendBackSection] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const formattedLeadershipSelection = [
    { label: "All", value: "all" },
    ...selectLeadershipOptions
  ];
  const formattedDesignationSelection = [
    { label: "All", value: "all" },
    ...selectDesignations
  ];
  const formattedRoleSelection = [
    { label: "All", value: "all" },
    ...selectRoles
  ];

  const [closeAll, setCloseAll] = useState(false);
  const [viewingCOAOptions, setViewingCOAOptions] = useState(false);
  const [selectedCOAOptions, setSelectedCOAOptions] = useState([]);
  const [selectedCOA, setSelectedCOA] = useState([]);

  useEffect(() => {
    console.log("show COA:", formData, selectedCOA);
  }, [formData, selectedCOA]);

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

  const handleAddSendBackSection = () => {
    setSendBackSection(true);
  };

  const handleDeletePill = (data) => {
    console.log("delete selectedCOAOptions", {
      data,
      selectedCOA,
      selectedCOAOptions
    });

    setSelectedCOA(
      selectedCOA.filter((selected) => selected?.value !== data?.value)
    );

    setSelectedCOAOptions(
      selectedCOAOptions.filter((id) => id !== data?.value)
    );
  };

  const handleSubmit = async () => {
    console.log("Submit this module:", formData);
    setIsSubmitted(true);
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
                      approverOption: e.target.value,
                      approverName: "",
                      approver: ""
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
                    formData?.approverName
                      ? {
                          label: formData?.approverName,
                          value: formData?.approver
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      approverName: e?.label,
                      approver: e?.value
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
                    formData?.approverName
                      ? {
                          label: formData?.approverName,
                          value: formData?.approver
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      approverName: e?.label,
                      approver: e?.value
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
                    formData?.approverName
                      ? {
                          label: formData?.approverName,
                          value: formData?.approver
                        }
                      : null
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      approverName: e?.label,
                      approver: e?.value
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
                  onClick={handleAddSendBackSection}
                >
                  <span>Confirm</span>
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* Send Back Section */}
      {sendBackSection ? (
        <div className="column approval_builder">
          {/* Copy On Approval */}
          <div className="column approval_builder_inner">
            <h3 className="approval_builder_header">Copy on Approval</h3>

            <div className="form-radio-group">
              {selectApproverOptions.map((option, index) => (
                <div className="form-radio" key={index}>
                  <label
                    className="form-radio-label"
                    htmlFor={`copyOnApprovalOption${index}`}
                  >
                    {option.label}
                  </label>
                  <input
                    className="form-radio-input"
                    type="radio"
                    name="copyOnApprovalOption"
                    id={`copyOnApprovalOption${index}`}
                    value={option.value}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        copyOnApprovalOption: e.target.value
                      });
                      setSelectedCOAOptions([]);
                      setSelectedCOA([]);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Leadership Option */}
            {formData?.copyOnApprovalOption === "leadership" ? (
              <>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="leadership_option">Leadership Option</label>
                    <DropdownCheckboxOptions
                      office="Leadership"
                      options={formattedLeadershipSelection}
                      selectedOptions={selectedCOAOptions}
                      setSelected={setSelectedCOA}
                      closeAll={closeAll}
                      setViewingOffice={setViewingCOAOptions}
                      onSelectionChange={(updatedSelectedOptions) =>
                        setSelectedCOAOptions(updatedSelectedOptions)
                      }
                    />
                  </div>
                </div>

                <div className="col-md-12 form_pills_container">
                  <div className="col-md-12 form_pills_container_inner">
                    <Stack
                      className="form_pill_stack"
                      direction="row"
                      spacing={1}
                    >
                      {selectedCOA.map((leadership, index) => {
                        if (leadership === "all") return null;

                        return (
                          <Chip
                            key={index}
                            label={leadership?.label}
                            onDelete={() => handleDeletePill(leadership)}
                          />
                        );
                      })}
                    </Stack>
                  </div>
                </div>
              </>
            ) : null}

            {/* Designation Option */}
            {formData?.copyOnApprovalOption === "designation" ? (
              <>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="designation_option">
                      Designation Option
                    </label>
                    <DropdownCheckboxOptions
                      office="Designation"
                      options={formattedDesignationSelection}
                      selectedOptions={selectedCOAOptions}
                      setSelected={setSelectedCOA}
                      closeAll={closeAll}
                      setViewingOffice={setViewingCOAOptions}
                      onSelectionChange={(updatedSelectedOptions) =>
                        setSelectedCOAOptions(updatedSelectedOptions)
                      }
                      valueIsNumber={true}
                    />
                  </div>
                </div>

                <div className="col-md-12 form_pills_container">
                  <div className="col-md-12 form_pills_container_inner">
                    <Stack
                      className="form_pill_stack"
                      direction="row"
                      spacing={1}
                    >
                      {selectedCOA.map((designation, index) => {
                        if (designation === "all") return null;

                        return (
                          <Chip
                            key={index}
                            label={designation?.label}
                            onDelete={() => handleDeletePill(designation)}
                          />
                        );
                      })}
                    </Stack>
                  </div>
                </div>
              </>
            ) : null}

            {/* Role Option */}
            {formData?.copyOnApprovalOption === "role" ? (
              <>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="role_option">Role Option</label>
                    <DropdownCheckboxOptions
                      office="Role"
                      options={formattedRoleSelection}
                      selectedOptions={selectedCOAOptions}
                      setSelected={setSelectedCOA}
                      closeAll={closeAll}
                      setViewingOffice={setViewingCOAOptions}
                      onSelectionChange={(updatedSelectedOptions) =>
                        setSelectedCOAOptions(updatedSelectedOptions)
                      }
                      valueIsNumber={true}
                    />
                  </div>
                </div>

                <div className="col-md-12 form_pills_container">
                  <div className="col-md-12 form_pills_container_inner">
                    <Stack
                      className="form_pill_stack"
                      direction="row"
                      spacing={1}
                    >
                      {selectedCOA.map((role, index) => {
                        if (role === "all") return null;

                        return (
                          <Chip
                            key={index}
                            label={role?.label}
                            onDelete={() => handleDeletePill(role)}
                          />
                        );
                      })}
                    </Stack>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {/* Copy On Refusal */}
          <div className="column approval_builder_inner">
            <h3 className="approval_builder_header">Copy on Refusal</h3>

            <div className="form-radio-group">
              {selectApproverOptions.map((option, index) => (
                <div className="form-radio" key={index}>
                  <label
                    className="form-radio-label"
                    htmlFor={`copyOnRefusalOption${index}`}
                  >
                    {option.label}
                  </label>
                  <input
                    className="form-radio-input"
                    type="radio"
                    name="copyOnRefusalOption"
                    id={`copyOnRefusalOption${index}`}
                    value={option.value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        copyOnRefusalOption: e.target.value
                      })
                    }
                  />
                </div>
              ))}
            </div>

            {/* Leadership Option */}
            {formData?.copyOnRefusalOption === "leadership" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="leadership_option">Leadership Option</label>
                  <Select
                    options={selectLeadershipOptions}
                    isSearchable={true}
                    value={
                      formData?.leadershipToCopyOnRefusalTitle
                        ? {
                            label: formData?.leadershipToCopyOnRefusalTitle,
                            value: formData?.leadershipToCopyOnRefusal
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leadershipToCopyOnRefusalTitle: e?.label,
                        leadershipToCopyOnRefusal: e?.value
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
            {formData?.copyOnRefusalOption === "designation" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="designation_option">Designation Option</label>
                  <Select
                    options={selectDesignations}
                    isSearchable={true}
                    value={
                      formData?.designationToCopyOnRefusalTitle
                        ? {
                            label: formData?.designationToCopyOnRefusalTitle,
                            value: formData?.designationToCopyOnRefusal
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        designationToCopyOnRefusalTitle: e?.label,
                        designationToCopyOnRefusal: e?.value
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
            {formData?.copyOnRefusalOption === "role" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="role_option">Role Option</label>
                  <Select
                    options={selectRoles}
                    isSearchable={true}
                    value={
                      formData?.roleToCopyOnRefusalTitle
                        ? {
                            label: formData?.roleToCopyOnRefusalTitle,
                            value: formData?.roleToCopyOnRefusal
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        roleToCopyOnRefusalTitle: e?.label,
                        roleToCopyOnRefusal: e?.value
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

          {/* Notify On Approval */}
          <div className="column approval_builder_inner">
            <h3 className="approval_builder_header">Notify on Approval</h3>

            <div className="form-radio-group">
              {selectApproverOptions.map((option, index) => (
                <div className="form-radio" key={index}>
                  <label
                    className="form-radio-label"
                    htmlFor={`notifyOnApprovalOption${index}`}
                  >
                    {option.label}
                  </label>
                  <input
                    className="form-radio-input"
                    type="radio"
                    name="notifyOnApprovalOption"
                    id={`notifyOnApprovalOption${index}`}
                    value={option.value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notifyOnApprovalOption: e.target.value
                      })
                    }
                  />
                </div>
              ))}
            </div>

            {/* Leadership Option */}
            {formData?.notifyOnApprovalOption === "leadership" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="leadership_option">Leadership Option</label>
                  <Select
                    options={selectLeadershipOptions}
                    isSearchable={true}
                    value={
                      formData?.leadershipToNotifyOnApprovalTitle
                        ? {
                            label: formData?.leadershipToNotifyOnApprovalTitle,
                            value: formData?.leadershipToNotifyOnApproval
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leadershipToNotifyOnApprovalTitle: e?.label,
                        leadershipToNotifyOnApproval: e?.value
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
            {formData?.notifyOnApprovalOption === "designation" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="designation_option">Designation Option</label>
                  <Select
                    options={selectDesignations}
                    isSearchable={true}
                    value={
                      formData?.designationToNotifyOnApprovalTitle
                        ? {
                            label: formData?.designationToNotifyOnApprovalTitle,
                            value: formData?.designationToNotifyOnApproval
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        designationToNotifyOnApprovalTitle: e?.label,
                        designationToNotifyOnApproval: e?.value
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
            {formData?.notifyOnApprovalOption === "role" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="role_option">Role Option</label>
                  <Select
                    options={selectRoles}
                    isSearchable={true}
                    value={
                      formData?.roleToNotifyOnApprovalTitle
                        ? {
                            label: formData?.roleToNotifyOnApprovalTitle,
                            value: formData?.roleToNotifyOnApproval
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        roleToNotifyOnApprovalTitle: e?.label,
                        roleToNotifyOnApproval: e?.value
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

          {/* Notify On Refusal */}
          <div className="column approval_builder_inner">
            <h3 className="approval_builder_header">Notify on Refusal</h3>

            <div className="form-radio-group">
              {selectApproverOptions.map((option, index) => (
                <div className="form-radio" key={index}>
                  <label
                    className="form-radio-label"
                    htmlFor={`notifyOnRefusalOption${index}`}
                  >
                    {option.label}
                  </label>
                  <input
                    className="form-radio-input"
                    type="radio"
                    name="notifyOnRefusalOption"
                    id={`notifyOnRefusalOption${index}`}
                    value={option.value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notifyOnRefusalOption: e.target.value
                      })
                    }
                  />
                </div>
              ))}
            </div>

            {/* Leadership Option */}
            {formData?.notifyOnRefusalOption === "leadership" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="leadership_option">Leadership Option</label>
                  <Select
                    options={selectLeadershipOptions}
                    isSearchable={true}
                    value={
                      formData?.leadershipToNotifyOnRefusalTitle
                        ? {
                            label: formData?.leadershipToNotifyOnRefusalTitle,
                            value: formData?.leadershipToNotifyOnRefusal
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leadershipToNotifyOnRefusalTitle: e?.label,
                        leadershipToNotifyOnRefusal: e?.value
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
            {formData?.notifyOnRefusalOption === "designation" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="designation_option">Designation Option</label>
                  <Select
                    options={selectDesignations}
                    isSearchable={true}
                    value={
                      formData?.designationToNotifyOnRefusalTitle
                        ? {
                            label: formData?.designationToNotifyOnRefusalTitle,
                            value: formData?.designationToNotifyOnRefusal
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        designationToNotifyOnRefusalTitle: e?.label,
                        designationToNotifyOnRefusal: e?.value
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
            {formData?.notifyOnRefusalOption === "role" ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="role_option">Role Option</label>
                  <Select
                    options={selectRoles}
                    isSearchable={true}
                    value={
                      formData?.roleToNotifyOnRefusalTitle
                        ? {
                            label: formData?.roleToNotifyOnRefusalTitle,
                            value: formData?.roleToNotifyOnRefusal
                          }
                        : null
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        roleToNotifyOnRefusalTitle: e?.label,
                        roleToNotifyOnRefusal: e?.value
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

          {/* Submit Form */}
          <div className="col-md-12 approval_form_submit_div">
            <button
              type="button"
              className="add_btn_new float-right"
              onClick={handleSubmit}
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* Stages of Approvers*/}
      {isSubmitted && (
        <div className="column approval_builder">
          <h3 className="approval_builder_header">Stages of Approvers</h3>

          <div
            className="column approval_builder_stages"
            style={{
              display: "flex",
              justifyContent: +formData?.stages >= 10 ? "flex-start" : "center"
            }}
          >
            {Array.from({ length: +formData?.stages }).map((_, index) => (
              <div className="stages_container" key={index}>
                <span>{index + 1}</span>
                <p>Stage {index + 1}</p>
                {index < +formData?.stages - 1 && <div className="line"></div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ApprovalModule;
