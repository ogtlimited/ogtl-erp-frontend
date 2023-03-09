import moment from "moment";
import React from "react";

const InterviewContent = ({ interviewContent = {} }) => {
  const newData = Object.keys(interviewContent).filter((e) => {
    return (
      e !== "_id" &&
      e !== "job_applicant_id" &&
      e !== "interview_date" &&
      e !== "status" &&
      e !== "phone_number" &&
      e !== "interviewer"
    );
  });

  return (
    <div className="row d-flex justify-content-center">
      {newData &&
        newData.length &&
        newData?.map((e) => (
          <>
            <div className="col-md-6 mt-3">
              <p className="job-field">{e?.split("_").join(" ")}</p>
            </div>
            <div className="col-md-6 mt-3">
              {e.includes("date") ? (
                <p>{moment(interviewContent[e]).format("L")}</p>
              ) : (
                <p className="">
                  {interviewContent[e] ? interviewContent[e] : "Not Provided"}
                </p>
              )}
            </div>
          </>
        ))}
    </div>
  );
};

export default InterviewContent;
