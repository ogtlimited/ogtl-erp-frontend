/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import DropdownCheckbox from "../../../components/Forms/DropdownCheckbox";
import SurveyFormBuilder from "../../../components/Forms/SurveyFormBuilder";
import moment from "moment";

const SurveyBuilder = () => {
  const { showAlert, selectDepartments, selectCampaigns, goToTop } =
    useAppContext();
  const [loading, setLoading] = useState(false);
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

  const handleSubmitSurvey = async (surveyData) => {
    // Extract relevant survey information
    const { title, from, to, departments, campaigns } = surveyData;

    // Reorganize questions data
    const questions = surveyData.questions.map((question, index) => {
      const options = question.options.reduce((acc, option, optionIndex) => {
        acc[String.fromCharCode(97 + optionIndex)] = option.value;
        return acc;
      }, {});

      // Find the indices of all correct answers
      const correctIndices = question.options.reduce(
        (acc, option, optionIndex) => {
          if (option.correct) {
            acc.push(optionIndex);
          }
          return acc;
        },
        []
      );

      // Map the indices of correct answers to their corresponding keys
      const correctKeys = correctIndices.map((index) =>
        String.fromCharCode(97 + index)
      );

      return {
        id: index + 1,
        question: question.question,
        question_type: question.options[0].type,
        options,
        answers: correctKeys,
      };
    });

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

    setLoading(true);

    try {
      const response = await axiosInstance.post(`/api/v1/hr_surveys.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: formattedSurveyData,
      });

      showAlert(
        true,
        `${response?.data?.data?.message}`,
        "alert alert-success"
      );

      setTitle("");
      setFrom(today);
      setTo(lastDay);
      setSelectedDepartmentOptions([]);
      setSelectedDepartment([]);
      setSelectedCampaignOptions([]);
      setSelectedCampaign([]);
      setLoading(false);
    } catch (error) {
      goToTop();
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
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
        <div className="col-md-4">
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
          <div className="col-md-4">
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
          <div className="col-md-4">
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
          <div className="col-md-4">
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
          <div className="col-md-4">
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
              loading={loading}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SurveyBuilder;
