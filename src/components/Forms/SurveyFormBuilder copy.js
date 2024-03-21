import "./surveyFormBuilder.css";
import React, { useState } from "react";
import Select from "react-select";

const formInputTypes = [
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Textarea",
    value: "textarea",
  },
  {
    label: "Checkbox",
    value: "checkbox",
  },
  {
    label: "Radio",
    value: "radio",
  },
];

const QuestionInput = ({ onAddQuestion, initialQuestion }) => {
  const [question, setQuestion] = useState(
    initialQuestion ? initialQuestion.question : ""
  );
  const [options, setOptions] = useState(
    initialQuestion ? initialQuestion.options : []
  );
  const [optionType, setOptionType] = useState("text");
  const [correctOptions, setCorrectOptions] = useState([]);
  const [optionAdded, setOptionAdded] = useState(false);

  const handleAddOption = () => {
    if (optionType === "radio") {
      setOptions((prevOptions) => [
        ...prevOptions,
        { type: optionType, value: "", correct: false },
      ]);
      setCorrectOptions((prevCorrectOptions) => [...prevCorrectOptions, false]);
    } else if (optionType === "checkbox") {
      setOptions((prevOptions) => [
        ...prevOptions,
        { type: optionType, value: "", correct: false },
      ]);
      setCorrectOptions((prevCorrectOptions) => [...prevCorrectOptions, false]);
    } else {
      setOptions((prevOptions) => [
        ...prevOptions,
        { type: optionType, value: "", correct: null },
      ]);
      setOptionAdded(true);
    }
  };

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index].value = value;
      return newOptions;
    });
  };

  const handleCorrectOptionChange = (index) => {
    if (optionType === "radio") {
      setCorrectOptions((prevCorrectOptions) =>
        prevCorrectOptions.map((value, i) => i === index)
      );
    } else if (optionType === "checkbox") {
      setCorrectOptions((prevCorrectOptions) => {
        const newCorrectOptions = [...prevCorrectOptions];
        newCorrectOptions[index] = !newCorrectOptions[index];
        return newCorrectOptions;
      });
    }
  };

  const handleAddQuestion = () => {
    if (question.trim() === "") return;

    const filteredOptions = options.filter(
      (option) =>
        option.value.trim() !== "" ||
        option.type === "text" ||
        option.type === "textarea"
    );

    const optionsWithCorrectness = filteredOptions.map((option, index) => ({
      ...option,
      correct:
        option.type === "text" || option.type === "textarea"
          ? null
          : correctOptions[index],
    }));

    onAddQuestion({ question, options: optionsWithCorrectness });
    setQuestion("");
    setOptions([]);
    setCorrectOptions([]);
    setOptionAdded(false);
  };

  const renderOptionInput = (option, index) => {
    if (optionType === "text" || optionType === "textarea") {
      return (
        <input
          className="col-md-6 form-control"
          type={optionType}
          value={option.value}
          placeholder="You may provide a hint or guide for this option"
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      );
    } else if (optionType === "radio" || optionType === "checkbox") {
      return (
        <div className="checkbox_radio_wrapper">
          <input
            className="col-md-6 form-control"
            type="text"
            value={option.value}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Enter an option... Select ${optionType} to mark as correct`}
          />
          {(optionType === "radio" || optionType === "checkbox") && (
            <input
              type={optionType}
              checked={correctOptions[index]}
              onChange={() => handleCorrectOptionChange(index)}
            />
          )}
        </div>
      );
    }
  };

  return (
    <div className="form_builder_wrapper">
      <h4>Question</h4>
      <textarea
        className="form-control"
        style={{ marginBottom: "1rem" }}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter question"
      />
      {options.length > 1 ? (
        <h5>Options</h5>
      ) : options.length === 1 ? (
        <h5>Option</h5>
      ) : null}
      {options.map((option, index) => (
        <div className="option_input_div" key={index}>
          {renderOptionInput(option, index)}
        </div>
      ))}
      <div className="form_builder_actions">
        <Select
          className="formInputTypeSelect"
          options={formInputTypes}
          value={formInputTypes.find((option) => option.value === optionType)}
          onChange={(option) => setOptionType(option.value)}
        />
        <button
          className="btn btn-dark"
          disabled={optionAdded}
          onClick={handleAddOption}
        >
          Add Option
        </button>
      </div>
      <button className="add_que_btn btn-info" onClick={handleAddQuestion}>
        Add Question
      </button>
    </div>
  );
};

const SurveyFormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

  const handleAddQuestion = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const handleEditQuestion = (index) => {
    setEditingQuestionIndex(index);
  };

  const handleUpdateQuestion = (updatedQuestion, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
    setEditingQuestionIndex(null);
  };

  const handleSubmit = () => {
    // Handle submission of questions
    console.log(questions);
  };

  return (
    <div className="form_builder_form">
      {questions.length ? (
        <div className="form_builder_form_sample_wrapper">
          {questions.map((question, index) => (
            <div className="form_builder_form_sample" key={index}>
              <h4>
                {index + 1}. {question.question}
              </h4>
              <button onClick={() => handleEditQuestion(index)}>Edit</button>
              <div className="col-md-12 form_builder_form_sample_fields">
                {question.options.map((option, optionIndex) => (
                  <div className="form_builder_form_sample_fields_inner" key={optionIndex}>
                    {/* Render editable inputs based on option type */}
                    {option.type === "text" ? (
                      <input
                        className="form-control"
                        type="text"
                        value={option.value}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].options[optionIndex].value = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                    ) : option.type === "textarea" ? (
                      <textarea
                        className="form-control"
                        value={option.value}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].options[optionIndex].value = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                    ) : option.type === "radio" || option.type === "checkbox" ? (
                      <div className="checkbox_radio_wrapper">
                        <input
                          type={option.type}
                          value={option.value}
                          checked={option.correct}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].options[optionIndex].correct = e.target.checked;
                            setQuestions(updatedQuestions);
                          }}
                        />
                        {option.value}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {editingQuestionIndex !== null ? (
        <QuestionInput
          initialQuestion={questions[editingQuestionIndex]}
          onAddQuestion={(updatedQuestion) =>
            handleUpdateQuestion(updatedQuestion, editingQuestionIndex)
          }
        />
      ) : (
        <QuestionInput onAddQuestion={handleAddQuestion} />
      )}

      <div className="submit_que_btn_wrapper">
        <button className="submit_que_btn btn-primary" onClick={handleSubmit}>
          Create Form
        </button>
      </div>
    </div>
  );
};

export default SurveyFormBuilder;
