import React, { useState, useEffect } from "react";
import Select from "react-select";
import { MdDelete } from "react-icons/md";

const formInputTypes = [
  {
    label: "Checkbox",
    value: "checkbox",
  },
  {
    label: "Radio",
    value: "radio",
  },
];

const QuestionInput = ({
  onAddQuestion,
  onSaveQuestion,
  selectedQuestionWithOptions,
  optionType,
  setOptionType,
  questionCorrectOptions,
  usedOptionTypes,
  setUsedOptionTypes,
}) => {
  const [question, setQuestion] = useState(
    selectedQuestionWithOptions ? selectedQuestionWithOptions : ""
  );
  const [options, setOptions] = useState(
    selectedQuestionWithOptions ? selectedQuestionWithOptions : []
  );
  const [correctOptions, setCorrectOptions] = useState(
    questionCorrectOptions.length ? questionCorrectOptions : []
  );
  const [optionAdded, setOptionAdded] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [instruction, setInstruction] = useState("");

  useEffect(() => {
    if (selectedQuestionWithOptions) {
      setQuestion(selectedQuestionWithOptions.question);
      setOptions(selectedQuestionWithOptions.options);
      setCorrectOptions(questionCorrectOptions);
    }
  }, [questionCorrectOptions, selectedQuestionWithOptions]);

  const handleAddOption = () => {
    if (optionType === "radio" || optionType === "checkbox") {
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

  const handleDeleteOption = (index) => () => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];

      newOptions.splice(index, 1);
      if (!newOptions.length) {
        setOptionAdded(false);
        setUsedOptionTypes([]);
      }

      return newOptions;
    });

    setCorrectOptions((prevCorrectOptions) => {
      const newOptions = [...prevCorrectOptions];
      correctOptions.splice(index, 1);
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

  const handleQuestionAction = (mode) => {
    // Validate Question:
    if (question.trim() === "") {
      setShowInstruction(true);
      setInstruction("Question cannot be empty");
      return;
    } else {
      setShowInstruction(false);
    }

    // Validate Options:
    if (
      (optionType === "checkbox" || optionType === "radio") &&
      options.length === 0
    ) {
      setShowInstruction(true);
      setInstruction("Option cannot be empty");
      return;
    } else {
      setShowInstruction(false);
    }

    if (
      (optionType === "checkbox" || optionType === "radio") &&
      options.some((option) => option.value.trim() === "")
    ) {
      setShowInstruction(true);
      setInstruction("Option cannot be empty");
      return;
    } else {
      setShowInstruction(false);
    }

    // Validate Correct Options:
    if (
      (optionType === "checkbox" || optionType === "radio") &&
      !correctOptions.includes(true)
    ) {
      setShowInstruction(true);
      setInstruction("Please select at least one correct option");
      return;
    } else {
      setShowInstruction(false);
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

    if (mode === "add") {
      onAddQuestion({ question, options: optionsWithCorrectness });
    }

    if (mode === "save") {
      onSaveQuestion({ question, options: optionsWithCorrectness });
    }

    setQuestion("");
    setOptions([]);
    setCorrectOptions([]);
    setOptionAdded(false);
    setShowInstruction(false);
    setInstruction("");
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
            onClick={handleDeleteOption(index)}
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
              style={{ cursor: "pointer" }}
            />
          )}
          <MdDelete
            className="form_builder_input_delete"
            onClick={handleDeleteOption(index)}
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
      {showInstruction && (
        <div className="correct_ans_instruction">{instruction}</div>
      )}
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
      <button
        className="add_que_btn btn-info"
        onClick={() =>
          selectedQuestionWithOptions
            ? handleQuestionAction("save")
            : handleQuestionAction("add")
        }
      >
        {selectedQuestionWithOptions ? "Save Question" : "Add Question"}
      </button>
    </div>
  );
};

export default QuestionInput;
