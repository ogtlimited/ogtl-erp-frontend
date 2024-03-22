import React, { useState, useEffect } from "react";
import Select from "react-select";
import { MdDelete } from "react-icons/md";

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

const QuestionInput = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [optionType, setOptionType] = useState("text");
  const [correctOptions, setCorrectOptions] = useState([]);
  const [optionAdded, setOptionAdded] = useState(false);
  const [showOptionInstruction, setShowOptionInstruction] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [usedOptionTypes, setUsedOptionTypes] = useState([]);

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
    setUsedOptionTypes((prevUsedOptionTypes) => [
      ...prevUsedOptionTypes,
      optionType,
    ]);
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
    if (
      (optionType === "checkbox" || optionType === "radio") &&
      !correctOptions.includes(true)
    ) {
      setShowInstruction(true);
      return;
    } else {
      setShowInstruction(false);
    }

    if (question.trim() === "") {
      return;
    }

    if (
      (optionType === "checkbox" || optionType === "radio") &&
      options.length === 0
    ) {
      setShowOptionInstruction(true);
      return;
    } else {
      setShowOptionInstruction(false);
    }

    if (
      (optionType === "checkbox" || optionType === "radio") &&
      options.some((option) => option.value.trim() === "")
    ) {
      setShowOptionInstruction(true);
      return;
    } else {
      setShowOptionInstruction(false);
    }

    if (options.length === 0) {
      setOptionAdded(false);
      return;
    }

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
    setShowOptionInstruction(false);
    setShowInstruction(false);
    setUsedOptionTypes([]);
  };

  const renderOptionInput = (option, index) => {
    if (optionType === "text" || optionType === "textarea") {
      return (
        <div className="checkbox_radio_wrapper">
          <input
            className="col-md-6 form-control"
            type={optionType}
            value={option.value}
            placeholder="You may provide a hint or guide for this option"
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <MdDelete
            className="form_builder_input_delete"
            onClick={() => {
              setOptions((prevOptions) => {
                const newOptions = [...prevOptions];
                newOptions.splice(index, 1);
                return newOptions;
              });
            }}
          />
        </div>
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
          <MdDelete
            className="form_builder_input_delete"
            onClick={() => {
              setOptions((prevOptions) => {
                const newOptions = [...prevOptions];
                newOptions.splice(index, 1);
                return newOptions;
              });
            }}
          />
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
        required
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
      {showOptionInstruction ? (
        <div className="correct_ans_instruction">Option cannot be empty</div>
      ) : null}
      {showInstruction ? (
        <div className="correct_ans_instruction">
          Select atleast one correct option
        </div>
      ) : null}
      <div className="form_builder_actions">
        <Select
          className="formInputTypeSelect"
          options={!usedOptionTypes.length ? formInputTypes : []}
          value={formInputTypes.find((option) => option.value === optionType)}
          onChange={(option) => setOptionType(option.value)}
          isDisabled={usedOptionTypes.length}
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

const SurveyFormBuilder = ({
  title,
  from,
  to,
  selectedDepartment,
  selectedCampaign,
  onSubmitSurvey,
  loading,
}) => {
  const [questions, setQuestions] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleSubmit = () => {
    const surveyData = {
      title: title,
      from: from,
      to: to,
      departments: selectedDepartment,
      campaigns: selectedCampaign,
      questions: questions,
    };

    onSubmitSurvey(surveyData);
    setQuestions([]);
  };

  return (
    <div className="form_builder_form">
      {questions.length ? (
        <div className="form_builder_form_sample_wrapper">
          <h3>Survey Form</h3>
          {questions.map((question, index) => (
            <div className="form_builder_form_sample" key={index}>
              <h4>
                {index + 1}. {question.question}
              </h4>
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

      <QuestionInput onAddQuestion={handleAddQuestion} />

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

export default SurveyFormBuilder;
