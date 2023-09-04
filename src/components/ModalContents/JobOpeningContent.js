/** @format */

import React from "react";

const JobOpeningContent = ({ Content = {} }) => {
  const filteredApplication = {
    ...Content,
    id: undefined,
    created_at: undefined,
    updated_at: undefined,
    operation_branch: undefined,
    operation_office: undefined,
    title: undefined,
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

export default JobOpeningContent;
