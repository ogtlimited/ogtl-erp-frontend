import React from "react";

const JobApplicationContent = ({ jobApplication = {} }) => {
  console.log(jobApplication)
  delete jobApplication.__v
  delete jobApplication._id
  delete jobApplication.__updatedAt
  const job = jobApplication.default_job_opening_id ? jobApplication.default_job_opening_id : jobApplication.job_opening_id
  return (
    <div className="row d-flex justify-content-center">
      {/* kkk{jobApplication['rep_sieving_call']?.first_name} */}
      {Object.keys(jobApplication).length &&
        Object.keys(jobApplication)
          .reverse()
          .map((e) => (
            <>
              <div className="col-md-6 mt-3">
                <p className="job-field">{
                  (e == 'default_job_opening_id' || e === 'job_opening_id') ? 'Job Opening' :
                e.split("_").join(" ")}</p>
              </div>
              <div className="col-md-6 mt-3">
              {
                e == 'default_job_opening_id' || e === 'job_opening_id' ? (
                  <p>{job?.job_title}</p>
                ) :
                e == 'rep_sieving_call' ? (
                <p>{jobApplication[e]?.first_name} {jobApplication[e]?.last_name}</p>
                ) :
                 (
                  <p className="">
                    {typeof jobApplication[e] === 'string' ? jobApplication[e] : "Not Provided"}
                  </p>
                )}
              </div>
            </>
          ))}
    </div>
  );
};

export default JobApplicationContent;
