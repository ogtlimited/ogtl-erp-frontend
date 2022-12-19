/** @format */

import React from 'react';

const LeaveApplicationContent = ({ leaveContent = {} }) => {
  delete leaveContent.__v;
  delete leaveContent.updatedAt;
  delete leaveContent.createdAt;
  delete leaveContent.acted_on;
  delete leaveContent.hr_stage;
  delete leaveContent.approval_level;
  delete leaveContent.leave_approver;
  delete leaveContent.department_id;
  delete leaveContent.employee_id;
  delete leaveContent.project_id;
  delete leaveContent.employee;
  delete leaveContent.emp_department;
  delete leaveContent._id;
  delete leaveContent.leave_type_id;

  return (
    <div className="row d-flex justify-content-center">
      {Object.keys(leaveContent).length &&
        Object.keys(leaveContent)
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
                    {leaveContent[e]?.first_name} {leaveContent[e]?.last_name}
                  </p>
                ) : (
                  <p className="">
                    {typeof leaveContent[e] === 'string'
                      ? leaveContent[e]
                      : leaveContent[e] === null
                      ? 'Not Provided'
                      : leaveContent[e]}
                  </p>
                )}
              </div>
            </>
          ))}
    </div>
  );
};

export default LeaveApplicationContent;
