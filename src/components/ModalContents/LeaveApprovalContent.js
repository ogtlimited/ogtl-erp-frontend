/** @format */

import React from 'react';

const LeaveApprovalContent = ({ leaveApprovalContent = {} }) => {
  delete leaveApprovalContent.__v;
  delete leaveApprovalContent.updatedAt;
  delete leaveApprovalContent.createdAt;
  delete leaveApprovalContent.slug;
  delete leaveApprovalContent._id;

  return (
    <div className="row d-flex justify-content-center">
      {Object.keys(leaveApprovalContent).length &&
        Object.keys(leaveApprovalContent)
          .map((e) => (
            <>
              <div className="col-md-6 ">
                <p className="job-field">
                  {e === 'default_job_opening_id' || e === 'job_opening_id'
                    ? 'Job Opening'
                    : e.split('_').join(' ')}
                </p>
              </div>
              <div className="col-md-6 ">
                {e === 'default_job_opening_id' || e === 'job_opening_id' ? (
                  {
                    /* <p>{job?.job_title}</p> */
                  }
                ) : e === 'rep_sieving_call' ? (
                  <p>
                    {leaveApprovalContent[e]?.first_name} {leaveApprovalContent[e]?.last_name}
                  </p>
                ) : (
                  <p className="">
                    {typeof leaveApprovalContent[e] === 'string'
                      ? leaveApprovalContent[e]
                      : leaveApprovalContent[e] === null
                      ? 'Not Provided'
                      : leaveApprovalContent[e]}
                  </p>
                )}
              </div>
            </>
          ))}
    </div>
  );
};

export default LeaveApprovalContent;
