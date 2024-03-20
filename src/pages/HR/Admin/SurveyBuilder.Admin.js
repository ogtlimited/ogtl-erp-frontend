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
  const { showAlert, user, ErrorHandler, selectDepartments, selectCampaigns } =
    useAppContext();
  const [allSurveys, setAllSurveys] = useState([]);
  const [errorIndicatorForDept, setErrorIndicatorForDept] = useState("");
  const [errorIndicatorForCamp, setErrorIndicatorForCamp] = useState("");
  const today = moment().format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [formQuestions, setFormQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(lastDay);
  const [selectedDepartmentOptions, setSelectedDepartmentOptions] = useState(
    []
  );
  const [selectedCampaignOptions, setSelectedCampaignOptions] = useState([]);

  const handleCreateSurveyForm = (e) => {
    e.preventDefault();

    if (isSubmitted) {
      if (!selectedDepartmentOptions.length) {
        setErrorIndicatorForDept("office-not-ok");
        return;
      }
      if (!selectedCampaignOptions.length) {
        setErrorIndicatorForCamp("office-not-ok");
        return;
      }
      if (!formQuestions.length) {
        showAlert(
          true,
          `You can not ereate an empty survey form`,
          "alert alert-info"
        );
        return;
      }

      const survey = {
        title: title,
        from: from,
        to: to,
        departments: selectedDepartmentOptions,
        campaigns: selectedCampaignOptions,
        questions: formQuestions,
      };

      console.log("payload", survey);
    }
  };

  // useEffect(() => {
  //   if (isSubmitted) {
  //     const survey = {
  //       title: title,
  //       from: from,
  //       to: to,
  //       departments: selectedDepartmentOptions,
  //       campaigns: selectedCampaignOptions,
  //       questions: formQuestions,
  //     };

  //     console.log("payload", survey)
  //   }
  // }, [formQuestions, from, isSubmitted, selectedCampaignOptions, selectedDepartmentOptions, title, to]);

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
      <form className="column survey_builder" onSubmit={handleCreateSurveyForm}>
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
                office="Departments"
                options={selectDepartments}
                selectedOptions={selectedDepartmentOptions}
                onSelectionChange={(updatedSelectedOptions) =>
                  setSelectedDepartmentOptions(updatedSelectedOptions)
                }
                errorIndicator={errorIndicatorForDept}
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
                onSelectionChange={(updatedSelectedOptions) =>
                  setSelectedCampaignOptions(updatedSelectedOptions)
                }
                errorIndicator={errorIndicatorForCamp}
              />
            </div>
          </div>
        </div>

        {/* Form Container */}
        {selectedDepartmentOptions.length && selectedCampaignOptions.length ? (
          <div className="column survey_builder_container">
            <SurveyFormBuilder
              setFormQuestions={setFormQuestions}
              setIsSubmitted={setIsSubmitted}
            />
          </div>
        ) : null}
      </form>
    </>
  );
};

export default SurveyBuilder;
