import React from "react";
import moment from "moment";

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

  console.log("Content", Content);

  const surveyData = Content.survey_answer?.answer?.answers || [];
  const feedbacks = Content?.feedback || [];
  const HrManagerFeedback = Content?.survey_answer?.feedback;

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

      {/* Display Operations & HR Staff Feedback */}
      {feedbacks?.length ? (
        <div className="col-md-12 mt-3 survey_answers_view">
          {feedbacks.map((item, index) => {
            return (
              <div key={index} className="mt-2">
                <p className="font-weight-bold" style={{ marginBottom: "0px" }}>
                  {item?.stage === "operations"
                    ? "Operations Feedback"
                    : item?.stage === "hr_staff"
                    ? "HR Staff Feedback"
                    : item?.stage === "hr_manager"
                    ? "HR Manager Feedback"
                    : null}{" "}
                  <span className="feedback_subInfo">
                    |{" "}
                    {item?.entered_by?.first_name +
                      " " +
                      item?.entered_by?.last_name}{" "}
                    -{" "}
                    {moment(item?.date_added)
                      .utc()
                      .format("Do MMM, YYYY [at] h:mmA")} 
                  </span>
                </p>
                <p>{item?.feedback}</p>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Display HR Manager Feedback */}
      {HrManagerFeedback ? (
        <div className="col-md-12 mt-2">
          <p className="font-weight-bold" style={{ marginBottom: "0px" }}>
            HR Manager Feedback
          </p>
          <p>{HrManagerFeedback}</p>
        </div>
      ) : null}

      {/* Display Survey Questions and Answers */}
      {surveyData.length ? (
        <div className="col-md-12 mt-3 survey_answers_view">
          <p className="job-field">Exit Interview</p>
          {surveyData.map((item, index) => {
            if (item?.question === "hr_staff_resignation_feedbacks") {
              return null;
            }

            return (
              <div key={index} className="mt-2">
                <p className="font-weight-bold">Q: {item?.question}</p>
                <p>A: {item?.answer}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ResignationContent;
