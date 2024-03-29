import React from "react";

const SurveyContent = ({ Content = {} }) => {
  const filteredSurvey = {
    ...Content,
  };

  const orderedKeys = ["title", "created_at", "from", "to"];

  const applicable_offices = Content?.applicable_offices?.offices || [];
  const questions_details = Content?.question_details?.questions || [];

  return (
    <div className="row d-flex justify-content-center">
      {orderedKeys.map((key, index) => {
        const value = filteredSurvey[key];
        if (typeof value !== "undefined") {
          return (
            <React.Fragment key={index}>
              <div className="col-md-6 mt-3">
                <p className="job-field">
                  {key
                    .split("_")
                    .join(" ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </p>
              </div>
              <div className="col-md-6 mt-3">
                <p className="">
                  {typeof value === "string"
                    ? value.replace(/\b\w/g, (char) => char.toUpperCase())
                    : value === null
                    ? "Not Provided"
                    : typeof value === "number"
                    ? value
                    : typeof value === "boolean" && value === true
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </React.Fragment>
          );
        } else {
          return null;
        }
      })}

      {applicable_offices?.length ? (
        <div className="col-md-12 mt-3 app_offices_view">
          <p className="font-weight-bold" style={{ margin: "0 0 10px 20px" }}>
            Applicable Offices
          </p>
          <ul>
            {applicable_offices.map((item, index) => {
              return (
                <li key={index} className="mt-2">
                  <p style={{ marginBottom: "0px" }}>
                    {item?.name}{" "}
                    <span className="feedback_subInfo">
                      |{" "}
                      {item?.type.replace(/\b\w/g, (char) =>
                        char.toUpperCase()
                      )}{" "}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {questions_details?.length ? (
        <div className="col-md-12 mt-3 survey_answers_view">
          <p className="font-weight-bold" style={{ marginBottom: "10px" }}>
            Survey Questions and Correct Answers
          </p>
          {questions_details.map((question, index) => (
            <div key={index}>
              <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                {index + 1}. {question.question}
              </div>
              <div className="col-md-12 survey_form_content_sample_fields">
                {question.question_type === "checkbox" ? (
                  <div className="form_builder_form_sample_fields_inner">
                    {Object.keys(question.options).map(
                      (optionKey, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="checkbox_radio_input"
                        >
                          <input
                            type="checkbox"
                            value={optionKey}
                            checked={question.answers.includes(optionKey)}
                            readOnly
                          />
                          {question.options[optionKey]}
                        </label>
                      )
                    )}
                  </div>
                ) : question.question_type === "radio" ? (
                  <div className="form_builder_form_sample_fields_inner">
                    {Object.keys(question.options).map(
                      (optionKey, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="checkbox_radio_input"
                        >
                          <input
                            type="radio"
                            name={`radio_${index}`}
                            value={optionKey}
                            checked={question.answers[0] === optionKey}
                            readOnly
                          />
                          {question.options[optionKey]}
                        </label>
                      )
                    )}
                  </div>
                ) : question.question_type === "text" ? (
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      placeholder={Object.values(question.options)}
                      readOnly
                    />
                  </div>
                ) : question.question_type === "textarea" ? (
                  <div>
                    <textarea
                      className="form-control"
                      placeholder={Object.values(question.options)}
                      readOnly
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SurveyContent;
