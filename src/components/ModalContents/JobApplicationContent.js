import React from "react";

const JobApplicationContent = ({ jobApplication = {} }) => {
  const filteredApplication = {
    ...jobApplication,
    rep_sieving_call_id: undefined,
    updated_at: undefined,
    referrer_id: undefined,
    old_job_opening_id: undefined,
    old_default_job_opening_id: undefined,
    job_opening: undefined,
    id: undefined,
    created_at: undefined,
    hr_job_opening_id: undefined,
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
                  {typeof value === "string" ? value : "Not Provided"}
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

export default JobApplicationContent;
