/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import DropdownCheckbox from "../../../components/Forms/DropdownCheckbox";
import QuestionInput from "../../../components/Forms/SurveyFormBuilder";
import moment from "moment";

const SurveyBuilder = () => {
  const navigate = useNavigate();
  const { user, ErrorHandler, selectDepartments, selectCampaigns } = useAppContext();
  const [allSurveys, setAllSurveys] = useState([]);
  const [errorIndicator, setErrorIndicator] = useState("");
  const [selectedDepartmentOptions, setSelectedDepartmentOptions] = useState([]);
  const [selectedCampaignOptions, setSelectedCampaignOptions] = useState([]);

  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [from, setFrom] = useState(firstDay);
  const [to, setTo] = useState(lastDay);


  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Create Survey Form</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Survey</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="column survey_builder">
        {/* Title */}
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              name="title"
              type="text"
            />
          </div>
        </div>

        {/* From & To */}
        <div className="row" style={{ paddingLeft: "1rem" }}>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <input
                type="date"
                name="from"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                }}
                className="form-control "
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="to">To</label>
              <input
                type="date"
                name="to"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
                className="form-control "
              />
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="row" style={{ paddingLeft: "1rem" }}>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="applicable_departments">Applicable Departments</label>
              <DropdownCheckbox
                office="Departments"
                options={selectDepartments}
                selectedOptions={selectedDepartmentOptions}
                onSelectionChange={
                  (updatedSelectedOptions) =>
                    setSelectedDepartmentOptions(updatedSelectedOptions)
                }
                errorIndicator={errorIndicator}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="applicable_campaigns">Applicable Campaign</label>
              <DropdownCheckbox
                office="Campaigns"
                options={selectCampaigns}
                selectedOptions={selectedCampaignOptions}
                onSelectionChange={
                  (updatedSelectedOptions) =>
                    setSelectedCampaignOptions(updatedSelectedOptions)
                }
                errorIndicator={errorIndicator}
              />
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="column survey_builder_container">
          <QuestionInput />
        </div>
      </div>
    </>
  );
};

export default SurveyBuilder;
