/*eslint-disable jsx-a11y/anchor-is-valid*/

import React from "react";
import { useAppContext } from "../../../Context/AppContext";
import { BankDetailsModal } from "../../Modal/BankDetailsModal";

const BankInformation = ({ bankDetails, fetchEmployeeProfile }) => {
  const { user } = useAppContext();

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["accounts_manager"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreate.includes(role)
  );

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">
            Bank Details
            {CurrentUserCanCreateAndEdit ? (
              <a
                className="edit-icon"
                data-toggle="modal"
                data-target="#BankInfoFormModal"
              >
                <i className="fa fa-pencil"></i>
              </a>
            ) : null}
          </h3>

          <ul className="personal-info">
            <li>
              <div className="title">Bank name</div>
              <div className="text">
                {bankDetails?.employee?.personal_detail?.bank_details
                  ?.bank_name || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Bank account No.</div>
              <div className="text">
                {bankDetails?.employee?.personal_detail?.bank_details
                  ?.bank_account || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Bank Code</div>
              <div className="text">
                {bankDetails?.employee?.personal_detail?.bank_details
                  ?.bank_code || "Not Available"}
              </div>
            </li>
            {/* <li>
              <div className="title">Salary Mode</div>
              <div className="text">
                {bankDetails?.employee?.personal_detail?.bank_details
                  ?.salary_mode || "Not Available"}
              </div>
            </li> */}
          </ul>
        </div>
      </div>

      <BankDetailsModal
        data={bankDetails?.employee?.personal_detail?.bank_details}
        fetchEmployeeProfile={fetchEmployeeProfile}
        CurrentUserCanCreateAndEdit={CurrentUserCanCreateAndEdit}
      />
    </>
  );
};

export default BankInformation;
