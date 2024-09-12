/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import DropdownCheckbox from "../../../components/Forms/DropdownCheckbox";
import EvaluationFormBuilder from "../../../components/Forms/EvaluationFormBuilder";
import moment from "moment";

const EvaluationBuilder = () => {
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
  const [closeAll, setCloseAll] = useState(false);
  const [viewingOffice, setViewingOffice] = useState(false);

  const formattedDepartmentSelection = [
    { label: "All", value: "all" },
    ...selectDepartments
  ];
  const formattedCampaignSelection = [
    { label: "All", value: "all" },
    ...selectCampaigns
  ];

  const handleSubmitEvaluation = async (evaluationData) => {
    // Extract relevant evaluation information
    const { title, from, to, departments, campaigns } = evaluationData;

    // Reorganize questions data
    const questions = evaluationData.questions.map((category, categoryIndex) => {
      return category.questions.map((question, questionIndex) => {
        return {
          id: categoryIndex + 1,
          question_title: category.question_title,
          question: question.title,
          weight: question.weight, // Use 'weight' field for additional data
          question_type: 'evaluation',
          options: {},
          answers: []
        };
      });
    }).flat(); // Flatten the array to get all questions in a single array

    // Reorganize applicable offices data
    const applicable_offices = [];
    if (departments?.length > 0) {
      applicable_offices.push(
        ...departments.map((department) => ({
          id: department.value,
          type: "department",
          name: department.label
        }))
      );
    }

    if (campaigns?.length > 0) {
      applicable_offices.push(
        ...campaigns.map((campaign) => ({
          id: campaign.value,
          type: "campaign",
          name: campaign.label
        }))
      );
    }

    // Construct the final evaluation data object
    const formattedEvaluationData = {
      title,
      question_details: {
        questions
      },
      applicable_offices: {
        offices: applicable_offices
      },
      from,
      to
    };

    setLoading(true);

    try {
      const response = await axiosInstance.post(`/api/v1/evaluation_config.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        payload: formattedEvaluationData
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
            <h3 className="page-title">Create Evaluation Form</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">QA</li>
              <li className="breadcrumb-item active">Evaluation</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="column survey_builder">
        {/* Title */}
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="title">Evaluation </label>
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

        {/* From & To
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
        </div> */}

        {/* Offices */}
        <div className="row" style={{ paddingLeft: "1rem" }}>
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
        </div>

        {(selectedDepartmentOptions.length || selectedCampaignOptions.length) &&
          title.length ? (
          <div className="column survey_builder_container">
            <EvaluationFormBuilder
              title={title}
              from={from}
              to={to}
              selectedDepartment={selectedDepartment}
              selectedCampaign={selectedCampaign}
              onSubmitEvaluation={handleSubmitEvaluation}
              loading={loading}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default EvaluationBuilder;
