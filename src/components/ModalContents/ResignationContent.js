/** @format */

import React from 'react';

const ResignationContent = ({ Content = {} }) => {
  delete Content.__v;
  delete Content.updatedAt;
  delete Content.createdAt;
  delete Content.employee_id;
  delete Content._id;
  delete Content.resignation_letter_date
  delete Content.relieving_date

  return (
    <div className="row d-flex justify-content-center">
      {Object.keys(Content).length &&
        Object.keys(Content)
          .map((e) => (
            <>
              <div className="col-md-6 ">
                <p className="job-field">
                  {e === 'effective_date' 
                    ? "Effective Date" : e === 'reason_for_resignation' 
                    ? "Reason for Resignation" : e.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}
                </p>
              </div>
              <div className="col-md-6 ">
                  <p className="">
                    {typeof Content[e] === 'string'
                      ? Content[e] : typeof Content[e] === "boolean" ? Content[e] ? 'Yes' : 'No'
                      : Content[e] === null
                      ? 'Not Provided'
                      : Content[e]}
                  </p>
              </div>
            </>
          ))}
    </div>
  );
};

export default ResignationContent;
