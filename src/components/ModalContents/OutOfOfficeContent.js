import React from "react";

const OutOfOfficeContent = ({ Content = {} }) => {
  const filteredApplication = {
    ...Content,
    id: undefined
  };

  console.log("show this content", Content);

  const orderedKeys = [
    "full_name",
    "ogid",
    "office",
    "reason",
    "from",
    "to",
    "called_in",
    "caller_is_employee",
    "caller",
    "note",
    "daily_follow_up",
    "approved",
    "dateCreated",
    "enteredBy"
  ];

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
                    .replace(/([a-z])([A-Z])/g, "$1 $2")
                    .replace(/^./, (match) => match.toUpperCase())
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
    </div>
  );
};

export default OutOfOfficeContent;
