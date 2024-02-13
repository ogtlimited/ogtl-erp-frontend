import React from "react";

const JobApplicationContent = ({ jobApplication = {} }) => {
  const filteredApplication = {
    ...jobApplication,
  };

  const orderedKeys = [
    "full_name",
    "email",
    "application_date",
    "job_title",
    "mobile_number",
    "interview_status",
    "process_status",
    "rep_siever",
    "interview_scheduled_date",
    "highest_qualification",
    "certifications",
  ];

  return (
    <div className="row d-flex justify-content-center">
      {orderedKeys.map((key, index) => {
        const value = filteredApplication[key];
        if (typeof value !== "undefined") {
          return (
            <React.Fragment key={index}>
              <div className="col-md-4 mt-3">
                <p className="job-field">
                  {key
                    .split("_")
                    .join(" ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </p>
              </div>
              <div className="col-md-8 mt-3">
                <p className="" style={{ wordWrap: "break-word" }}>
                  {typeof value === "string"
                    ? value.replace(/\b\w/g, (char) => char.toUpperCase())
                    : "-"}
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
