/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import {
  selectModuleType,
  officeTypeOptions,
  selectApproverOptions
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
    goToTop
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);

  const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
  const [officeType, setOfficeType] = useState("");

  const [stage, setStage] = useState(0);
  const [arroverSection, setApproverSection] = useState(false);

  const handleOfficeTypeChange = (e) => {
    setFormData({
      ...formData,
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

        {/* Offices */}
        {/* <div className="row" style={{ paddingLeft: "1rem" }}>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="applicable_departments">
                Applicable Departments
              </label>
              <DropdownCheckbox
                office="department"
                options={formattedDepartmentSelection}
                selectedOptions={selectedDepartmentOptions}
                setSelected={setSelectedDepartment}
                closeAll={closeAll}
                setViewingOffice={setViewingOffice}
                onSelectionChange={(updatedSelectedOptions) =>
                  setSelectedDepartmentOptions(updatedSelectedOptions)
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="applicable_campaigns">Applicable Campaign</label>
              <DropdownCheckbox
                office="campaign"
                options={formattedCampaignSelection}
                selectedOptions={selectedCampaignOptions}
                setSelected={setSelectedCampaign}
                closeAll={closeAll}
                setViewingOffice={setViewingOffice}
                onSelectionChange={(updatedSelectedOptions) =>
                  setSelectedCampaignOptions(updatedSelectedOptions)
                }
              />
            </div>
          </div>
        </div> */}

        <div className="col-md-4" style={{ marginTop: "2rem" }}>
          <button
            type="button"
            className="add_btn_new"
            onClick={handleAddApprover}
          >
            <MdOutlineAdd /> <span>Add Approver</span>
          </button>
        </div>
      </div>

      {arroverSection && (
        <div className="column approval_builder">
          <div className="row col-md-12">
            radio goes here
          </div>

        </div>
      )}
    </>
  );
};

export default ApprovalModule;
