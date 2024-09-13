import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import EvaluationQuestionInput from "./EvaluationQuestionInput";

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
  const [selectedQuestionWithOptions, setSelectedQuestionWithOptions] = useState(null);
  const [editedQuestionIndex, setEditedQuestionIndex] = useState(null);
  const [optionType, setOptionType] = useState("checkbox");
  const [usedOptionTypes, setUsedOptionTypes] = useState([]);

  useEffect(() => {
    // Validate the form
    const isFormValid = questions.every((question) => {
      const hasValidTitle = question.question_title.trim() !== "";
      const hasValidQuestions = question.questions.every(
        (q) => q.title.trim() !== "" && !isNaN(q.weight) && q.weight > 0
      );
      return hasValidTitle && hasValidQuestions;
    });
    setIsFormValid(isFormValid);
  }, [questions]);

  const handleAddQuestion = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const handleEditQuestion = (index) => {
    goToBottom();
    const selectedQuestion = questions[index];
    setSelectedQuestionWithOptions({ ...selectedQuestion, index });
    setEditedQuestionIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestion = (editedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[editedQuestionIndex] = editedQuestion;
    setQuestions(updatedQuestions);
    setSelectedQuestionWithOptions(null);
  };

  const handleSubmit = () => {
    const evaluationData = {
      title: title,
      from: from,
      to: to,
      departments: selectedDepartment,
      campaigns: selectedCampaign,
      questions: questions,
    };


    console.log("eval data: ", evaluationData)
    onSubmitEvaluation(evaluationData);
    setQuestions([]);
  };

  return (
    <div className="form_builder_form">
      {questions.length ? (
        <div className="form_builder_form_sample_wrapper">
          <h3>Evaluations</h3>
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
                  {index + 1}. {question.question_title}
                </h4>
              </div>

              <div className="col-md-12 form_builder_form_sample_fields">
                {question.questions.map((q, qIndex) => (
                  <div
                    className="form_builder_form_sample_fields_inner"
                    key={qIndex}
                  >
                    <div>{q.title}</div>
                    <div>Weight: {q.weight}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <EvaluationQuestionInput
        onAddQuestion={handleAddQuestion}
        onSaveQuestion={handleSaveQuestion}
        selectedQuestionWithOptions={selectedQuestionWithOptions}
        optionType={optionType}
        setOptionType={setOptionType}
        usedOptionTypes={usedOptionTypes}
        setUsedOptionTypes={setUsedOptionTypes}
      />

      <div className="submit_que_btn_wrapper">
        <button
          type="submit"
          className={` ${isFormValid
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
