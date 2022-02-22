import React from "react";

const JobApplicationContent = ({ jobApplication = {} }) => {
  return (
    <div className="row d-flex justify-content-center">
      {Object.keys(jobApplication).length &&
        Object.keys(jobApplication)
          .reverse()
          .map((e) => (
            <>
              <div className="col-md-6 mt-3">
                <p className="job-field">{e.split("_").join(" ")}</p>
              </div>
              <div className="col-md-6 mt-3">
                {jobApplication[e]?.includes("http") ? (
                  <a href={jobApplication[e]}>{jobApplication[e]}</a>
                ) : (
                  <p className="">
                    {jobApplication[e] ? jobApplication[e] : "Not Provided"}
                  </p>
                )}
              </div>
            </>
          ))}
    </div>
  );
};

export default JobApplicationContent;
