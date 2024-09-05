import React, { useState, useEffect } from "react";
import Select from "react-select";
import { MdDelete } from "react-icons/md";



const EvaluationQuestionInput = ({
  onAddQuestion,
  onSaveQuestion,
  selectedQuestionWithOptions,
  optionType,
  setOptionType,
  usedOptionTypes,
  setUsedOptionTypes,
}) => {
  const [questionTitle, setQuestionTitle] = useState(
    selectedQuestionWithOptions ? selectedQuestionWithOptions.question_title : ""
  );
  const [questions, setQuestions] = useState(
    selectedQuestionWithOptions ? selectedQuestionWithOptions.questions : []
  );
  const [optionAdded, setOptionAdded] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [instruction, setInstruction] = useState("");

  useEffect(() => {
    if (selectedQuestionWithOptions) {
      setQuestionTitle(selectedQuestionWithOptions.question_title);
      setQuestions(selectedQuestionWithOptions.questions);
    }
  }, [selectedQuestionWithOptions]);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { title: "", weight: "" },
    ]);

    setUsedOptionTypes((prevUsedOptionTypes) => [
      ...prevUsedOptionTypes,
      optionType,
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index][field] = value;
      return newQuestions;
    });
  };

  const handleDeleteQuestion = (index) => () => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(index, 1);
      if (!newQuestions.length) {
        setOptionAdded(false);
        setUsedOptionTypes([]);
      }
      return newQuestions;
    });
  };

  const handleQuestionAction = (mode) => {
    // Validate Question Title:
    if (questionTitle.trim() === "") {
      setShowInstruction(true);
      setInstruction("Question Title cannot be empty");
      return;
    } else {
      setShowInstruction(false);
    }

    // Validate Questions:
    if (questions.length === 0) {
      setShowInstruction(true);
      setInstruction("At least one question is required");
      return;
    }

    if (questions.some((question) => question.title.trim() === "" || question.weight.trim() === "")) {
      setShowInstruction(true);
      setInstruction("All questions must have a title and weight");
      return;
    } else {
      setShowInstruction(false);
    }

    if (questions.some((question) => isNaN(question.weight) || question.weight <= 0)) {
      setShowInstruction(true);
      setInstruction("Weight must be a positive number");
      return;
    } else {
      setShowInstruction(false);
    }

    if (mode === "add") {
      onAddQuestion({ question_title: questionTitle, questions });
    }

    if (mode === "save") {
      onSaveQuestion({ question_title: questionTitle, questions });
    }

    setQuestionTitle("");
    setQuestions([]);
    setOptionAdded(false);
    setShowInstruction(false);
    setInstruction("");
    setUsedOptionTypes([]);
  };

  const renderQuestionInput = (question, index) => (
    <div className="question_input_div" key={index}>
      <div className="checkbox_radio_wrapper">
        <input
          className="col-md-12 form-control "
          type="text"
          value={question.title}
          onChange={(e) => handleQuestionChange(index, "title", e.target.value)}
          placeholder="Title"
        />
      </div>

      <div className="checkbox_radio_wrapper">
        <input
          className="col-md-2 form-control mt-3"
          type="number"
          value={question.weight}
          onChange={(e) => handleQuestionChange(index, "weight", e.target.value)}
          min={0}
          placeholder="Weight"
        />
        <MdDelete
          className="form_builder_input_delete mt-2"
          onClick={handleDeleteQuestion(index)}
        />
      </div>

    </div>
  );

  return (
    <div className="form_builder_wrapper">
      <h4>Question Title</h4>
      <textarea
        className="form-control"
        style={{ marginBottom: "1rem" }}
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
        placeholder="Enter question Title"
        required
      />
      {questions.length > 1 ? (
        <h5>Questions</h5>
      ) : questions.length === 1 ? (
        <h5>Question</h5>
      ) : null}
      {questions.map((question, index) => (
        <div className="question_input_div" key={index}>
          {renderQuestionInput(question, index)}
        </div>
      ))}
      {showInstruction && (
        <div className="correct_ans_instruction">{instruction}</div>
      )}
      <div className="form_builder_actions">

        <button
          className="btn btn-dark"
          disabled={optionAdded}
          onClick={handleAddQuestion}
        >
          Add Question
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
        {selectedQuestionWithOptions ? "Save to Survey" : "Add to Survey"}
      </button>
    </div>
  );
};

export default EvaluationQuestionInput;
