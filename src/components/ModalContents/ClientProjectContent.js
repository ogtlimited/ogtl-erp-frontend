import React from "react";

const ClientProjectContent = ({ clientProject = {} }) => {
  delete clientProject.updatedAt;
  delete clientProject.createdAt;
  delete clientProject.__v;
  delete clientProject._id;

  return (
    <div className="row d-flex justify-content-center">
      {/* {clientProject['rep_sieving_call']?.first_name} */}
      {Object.keys(clientProject).length &&
        Object.keys(clientProject)
          .reverse()
          .map((e) => (
            <>
              <div className="col-md-6 ">
                <p className="job-field">
                  {e === "default_job_opening_id" || e === "job_opening_id"
                    ? "Job Opening"
                    : e.split("_").join(" ")}
                </p>
              </div>
              <div className="col-md-6 ">
                {e === "default_job_opening_id" || e === "job_opening_id" ? (
                  {
                    /* <p>{job?.job_title}</p> */
                  }
                ) : e === "rep_sieving_call" ? (
                  <p>
                    {clientProject[e]?.first_name} {clientProject[e]?.last_name}
                  </p>
                ) : (
                  <p className="">
                    {typeof clientProject[e] === "string"
                      ? clientProject[e]
                      : clientProject[e] === null
                      ? "Not Provided"
                      : "None"}
                  </p>
                )}
              </div>
            </>
          ))}
    </div>
  );
};

export default ClientProjectContent;
