import React, { useState, useEffect } from "react";
import QuestionInput from "./SurveyQuestionInput";
import { useAppContext } from "../../Context/AppContext";

const EvaluationFormBuilder = ({
  title,
  from,
  to,
  selectedDepartment,
  selectedCampaign,
  onSubmitEvaluation,
  loading,
}) => {
  const { goToBottom } = useAppContext();
  const [questions, setQuestions] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedQuestionWithOptions, setSelectedQuestionWithOptions] =
    useState(null);
  const [questionCorrectOptions, setQuestionCorrectOptions] = useState([]);
  const [editedQuestionIndex, setEditedQuestionIndex] = useState(null);
  const [optionType, setOptionType] = useState("checkbox");
  const [usedOptionTypes, setUsedOptionTypes] = useState([]);

  useEffect(() => {
    if (questions.length) {
      const isFormValid = questions.every((question) => {
        const hasValidQuestion = question.question.trim() !== "";
        const hasValidOptions = question.options.some(
          (option) =>
            option.value.trim() !== "" ||
            option.type === "text" ||
            option.type === "textarea"
        );
        return hasValidQuestion && hasValidOptions;
      });
      setIsFormValid(isFormValid);
    } else {
      setIsFormValid(false);
    }
  }, [questions]);

  const handleAddQuestion = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const handleEditQuestion = (index) => {
    goToBottom();

    const selectedQuestionWithOptions = questions[index];
    setSelectedQuestionWithOptions({ ...selectedQuestionWithOptions, index });
    setQuestionCorrectOptions(
      selectedQuestionWithOptions.options.map((option) => option.correct)
    );
    setOptionType(selectedQuestionWithOptions.options[0]?.type);
    setUsedOptionTypes(
      selectedQuestionWithOptions.options.map((option) => option.type)
    );
    setEditedQuestionIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((question, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestion = (editedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[editedQuestionIndex] = {
      ...editedQuestion,
    };

    setQuestions(updatedQuestions);
    setSelectedQuestionWithOptions(null);
    setQuestionCorrectOptions([]);
  };

  const handleSubmit = () => {
    const surveyData = {
      title: title,
      from: from,
      to: to,
      departments: selectedDepartment,
      campaigns: selectedCampaign,
      questions: questions,
    };

    onSubmitEvaluation(surveyData);
    setQuestions([]);
  };

  return (
    <div className="form_builder_form">
      {questions.length ? (
        <div className="form_builder_form_sample_wrapper">
          <h3>Survey Form</h3>
          {questions.map((question, index) => (
            <div className="form_builder_form_sample" key={index}>
              <div className="form_builder_form_sample_question">
                <button
                  className="delete_form_builder_field"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <button
                  className="edit_form_builder_field"
                  onClick={() => handleEditQuestion(index)}
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <h4>
                  {index + 1}. {question.question}
                </h4>
              </div>

              <div className="col-md-12 form_builder_form_sample_fields">
                {question.options.map((option, index) => (
                  <div
                    className="form_builder_form_sample_fields_inner"
                    key={index}
                  >
                    {option.type === "text" ? (
                      <input
                        className="form-control"
                        type={option.type}
                        placeholder={option.value}
                        readOnly
                      />
                    ) : option.type === "textarea" ? (
                      <textarea
                        className="form-control"
                        placeholder={option.value}
                        readOnly
                      />
                    ) : option.type === "radio" ||
                      option.type === "checkbox" ? (
                      <label className="checkbox_radio_input">
                        <input
                          type={option.type}
                          value={option.value}
                          checked={option.correct}
                          readOnly
                        />
                        {option.value}
                      </label>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <QuestionInput
        onAddQuestion={handleAddQuestion}
        onSaveQuestion={handleSaveQuestion}
        selectedQuestionWithOptions={selectedQuestionWithOptions}
        optionType={optionType}
        setOptionType={setOptionType}
        questionCorrectOptions={questionCorrectOptions}
        usedOptionTypes={usedOptionTypes}
        setUsedOptionTypes={setUsedOptionTypes}
      />

      <div className="submit_que_btn_wrapper">
        <button
          type="submit"
          className={` ${
            isFormValid
              ? "submit_que_btn btn-primary"
              : "submit_que_btn btn-secondary"
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-md"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Create Form"
          )}
        </button>
      </div>
    </div>
  );
};

export default EvaluationFormBuilder;
