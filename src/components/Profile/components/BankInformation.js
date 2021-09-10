import React from "react";

const BankInformation = ({ salaryDetails }) => {
  return (
    <div className="card profile-box flex-fill">
      <div className="card-body">
        <h3 className="card-title">Bank information</h3>
        <ul className="personal-info">
          <li>
            <div className="title">Bank name</div>
            <div className="text">
              {salaryDetails?.bank_name || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Bank account No.</div>
            <div className="text">
              {salaryDetails?.bank_account_number || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Bank Code</div>
            <div className="text">
              {salaryDetails?.bank_code || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Salary Mode</div>
            <div className="text">
              {salaryDetails?.salary_mode || "Not Available"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BankInformation;
