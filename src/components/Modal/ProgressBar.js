import React from "react";

const ProgressBar = ({ processedPayslips, expectedPayslips }) => {
  if (processedPayslips === null) {
    processedPayslips = 0;
  }

  const progress = (processedPayslips / expectedPayslips) * 100;

  return (
    <>
      <p className="progress-bar-text">
        {processedPayslips === expectedPayslips ? "COMPLETED!" : ""}
      </p>
      <div className="progress-bar">
        <div
          className="progress-bar__fill"
          style={{ width: `${progress}%` }}
        ></div>
        <span className="progress-bar__text">
          {processedPayslips}/{expectedPayslips || "-"}
        </span>
      </div>
    </>
  );
};

export default ProgressBar;
