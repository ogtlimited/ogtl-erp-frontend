import React from "react";

const ResignationContent = ({ Content = {} }) => {
  const filteredApplication = {
    ...Content,
    id: undefined,
  };

  const orderedKeys = [
    "full_name",
    "office",
    "date_applied",
    "status",
    "last_day_at_work",
    "reason_for_resignation",
  ];

  const surveyData = Content.survey_answer?.answer?.answers || [];
  const surveyFeedback = Content?.survey_answer?.feedback;

  return (
    <div className="row d-flex justify-content-center">
      {orderedKeys.map((key, index) => {
        const value = filteredApplication[key];
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
                  {key === "reason_for_resignation"
                    ? value
                    : typeof value === "string"
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

      {/* Display Survey Feedback */}
      {surveyFeedback ? (
        <div className="col-md-12 mt-3 survey_answers_view">
          <p className="job-field">Feedback</p>
          <div className="mt-2">
            <p>{surveyFeedback}</p>
          </div>
        </div>
      ) : null}

      {/* Display Survey Questions and Answers */}
      {surveyData.length ? (
        <div className="col-md-12 mt-3 survey_answers_view">
          <p className="job-field">Survey</p>
          {surveyData.map((item, index) => (
            <div key={index} className="mt-2">
              <p className="font-weight-bold">Q: {item?.question}</p>
              <p>A: {item?.answer}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ResignationContent;
