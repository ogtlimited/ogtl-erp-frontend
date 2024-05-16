/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import DropdownCheckbox from "../../../components/Forms/DropdownCheckbox";
import EditSurveyFormBuilder from "../../../components/Forms/EditSurveyFormBuilder";
import moment from "moment";

const EditSurveyBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const survey = location?.state;

  const { showAlert, selectDepartments, selectCampaigns, goToTop } =
    useAppContext();
  const [loading, setLoading] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [viewingOffice, setViewingOffice] = useState(false);

  const [title, setTitle] = useState(survey?.title);
  const [from, setFrom] = useState(
    moment(survey?.from, "Do MMMM, YYYY").format("YYYY-MM-DD")
  );
  const [to, setTo] = useState(
    moment(survey?.to, "Do MMMM, YYYY").format("YYYY-MM-DD")
  );
  const [selectedDepartmentOptions, setSelectedDepartmentOptions] = useState(
    survey?.applicable_offices?.offices
      .filter((obj) => obj.type === "department")
      .map((obj) => obj.id)
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    survey?.applicable_offices?.offices
      .filter((obj) => obj.type === "department")
      .map((item) => ({
        label: item.name,
        value: item.id,
        office: item.type,
      }))
  );
  const [selectedCampaignOptions, setSelectedCampaignOptions] = useState(
    survey?.applicable_offices?.offices
      .filter((obj) => obj.type === "campaign")
      .map((obj) => obj.id)
  );
  const [selectedCampaign, setSelectedCampaign] = useState(
    survey?.applicable_offices?.offices
      .filter((obj) => obj.type === "campaign")
      .map((item) => ({
        label: item.name,
        value: item.id,
        office: item.type,
      }))
  );

  const formattedQuestions = survey?.question_details?.questions.map(
    (question) => {
      const options = Object.keys(question.options).map((key) => ({
        type: question.question_type,
        value: question.options[key],
        correct: question.answers.includes(key),
      }));

      return {
        question: question.question,
        options: options,
      };
    }
  );

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
      const response = await axiosInstance.patch(
        `/api/v1/hr_surveys/${survey?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: formattedSurveyData,
        }
      );

      showAlert(
        true,
        `${
          response?.data?.data?.message || "Survey form successfully updated!"
        }`,
        "alert alert-success"
      );

      navigate("/dashboard/hr/survey");
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
            <h3 className="page-title">Edit Survey Form</h3>
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
                closeAll={closeAll}
                setViewingOffice={setViewingOffice}
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
                closeAll={closeAll}
                setViewingOffice={setViewingOffice}
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
            <EditSurveyFormBuilder
              title={title}
              from={from}
              to={to}
              selectedDepartment={selectedDepartment}
              selectedCampaign={selectedCampaign}
              onSubmitSurvey={handleSubmitSurvey}
              loading={loading}
              formattedQuestions={formattedQuestions}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default EditSurveyBuilder;
