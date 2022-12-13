/** @format */

import React from 'react';

const PayrollBatchesContent = ({ payrollBatch = {} }) => {
  delete payrollBatch.__v;
  delete payrollBatch._id;
  delete payrollBatch.updatedAt;
  delete payrollBatch.createdAt;

  return (
    <div className="row d-flex justify-content-center">
      {Object.keys(payrollBatch).length &&
        Object.keys(payrollBatch)
          .reverse()
          .map((e) => (
            <>
              <div className="col-md-6 ">
                <p className="job-field">
                  {e === 'default_default_batch_id' || e === 'default_batch_id'
                    ? 'Payroll Batches'
                    : e.split('_').join(' ')}
                </p>
              </div>
              <div className="col-md-6 ">
              <p className="">
                    {typeof payrollBatch[e] === 'boolean' ? 
                    payrollBatch[e] ? 'Yes' : 'No' : payrollBatch[e]}
                  </p>
              </div>
            </>
          ))}
    </div>
  );
};

export default PayrollBatchesContent;
