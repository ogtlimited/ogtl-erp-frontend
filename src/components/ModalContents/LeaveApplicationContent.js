/** @format */

import React from "react";

const LeaveApplicationContent = ({ leaveContent = {} }) => {
  const filteredApplication = {
    ...leaveContent,
    id: undefined,
    manager_id: undefined,
    start_date: undefined,
    end_date: undefined,
    updated_at: undefined,
    created_at: undefined,
    acted_on: undefined,
    hr_stage: undefined,
    status_action: undefined,
    leave: undefined,
    user: undefined,
    rejection_reason:
      leaveContent?.leave?.rejection_reason === null
        ? undefined
        : leaveContent?.leave?.rejection_reason,
  };

  const filteredKeys = Object.keys(filteredApplication).reverse();

  return (
    <div className="row d-flex justify-content-center">
      {filteredKeys.map((key, index) => {
        const value = filteredApplication[key];
        if (typeof value !== "undefined") {
          return (
            <React.Fragment key={index}>
              <div className="col-md-6 mt-3">
                <p className="job-field">{key.split("_").join(" ")}</p>
              </div>
              <div className="col-md-6 mt-3">
                <p className="">
                  {typeof value === "string"
                    ? value
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

export default LeaveApplicationContent;
