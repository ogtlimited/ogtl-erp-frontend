/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import DropdownCheckbox from "../../../components/Forms/DropdownCheckbox";
import SurveyFormBuilder from "../../../components/Forms/SurveyFormBuilder";
import moment from "moment";

const SurveyBuilder = () => {
  const navigate = useNavigate();
  const {
    showAlert,
    user,
    ErrorHandler,
    selectDepartments,
    selectCampaigns,
    goToTop,
  } = useAppContext();
  const [allSurveys, setAllSurveys] = useState([]);
  const today = moment().format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");

  const [title, setTitle] = useState("");
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(lastDay);
  const [selectedDepartmentOptions, setSelectedDepartmentOptions] = useState(
    []
  );
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedCampaignOptions, setSelectedCampaignOptions] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState([]);

  const handleSubmitSurvey = (surveyData) => {
    // Extract relevant survey information
    const { title, from, to, departments, campaigns } =
      surveyData;

    // Reorganize questions data
    const questions = surveyData.questions.map((question, index) => ({
      id: index + 1,
      question: question.question,
      question_type: question.options[0].type,
      options: question.options.reduce((acc, option, optionIndex) => {
        acc[String.fromCharCode(97 + optionIndex)] = option.value;
        return acc;
      }, {}),
      answers: question.options
        .filter((option) => option.correct)
        .map((option) => String.fromCharCode(97 + option.index)),
    }));

    // Reorganize applicable offices data
    const applicable_offices = [];
    if (departments?.length > 0) {
      applicable_offices.push(
        ...departments.map((department) => ({
          id: department.value,
          type: "department",
          name: department.label,
        }))
      );
    }
    
    if (campaigns?.length > 0) {
      applicable_offices.push(
        ...campaigns.map((campaign) => ({
          id: campaign.value,
          type: "campaign",
          name: campaign.label,
        }))
      );
    }

    // Construct the final survey data object
    const formattedSurveyData = {
      title,
      question_details: {
        questions,
      },
      applicable_offices: {
        offices: applicable_offices,
      },
      from,
      to,
    };

    console.log("Submitting formatted survey data:", formattedSurveyData);

    // Clear form fields after submission
    setTitle("");
    setFrom(today);
    setTo(lastDay);
    setSelectedDepartmentOptions([]);
    setSelectedDepartment([]);
    setSelectedCampaignOptions([]);
    setSelectedCampaign([]);
  };

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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
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
                required
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
                required
              />
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="row" style={{ paddingLeft: "1rem" }}>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="applicable_departments">
                Applicable Departments
              </label>
              <DropdownCheckbox
                office="department"
                options={selectDepartments}
                selectedOptions={selectedDepartmentOptions}
                setSelected={setSelectedDepartment}
                onSelectionChange={(updatedSelectedOptions) =>
                  setSelectedDepartmentOptions(updatedSelectedOptions)
                }
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="applicable_campaigns">Applicable Campaign</label>
              <DropdownCheckbox
                office="campaign"
                options={selectCampaigns}
                selectedOptions={selectedCampaignOptions}
                setSelected={setSelectedCampaign}
                onSelectionChange={(updatedSelectedOptions) =>
                  setSelectedCampaignOptions(updatedSelectedOptions)
                }
              />
            </div>
          </div>
        </div>

        {/* Form Container */}
        {(selectedDepartmentOptions.length || selectedCampaignOptions.length) &&
        title.length ? (
          <div className="column survey_builder_container">
            <SurveyFormBuilder
              title={title}
              from={from}
              to={to}
              selectedDepartment={selectedDepartment}
              selectedCampaign={selectedCampaign}
              onSubmitSurvey={handleSubmitSurvey}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SurveyBuilder;
