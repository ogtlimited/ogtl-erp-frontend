/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import { PersonalDetailsModal } from "../../Modal/PersonalDetailsModal";

const PersonalInfo = ({
  personalDetails,
  fetchEmployeeProfile,
}) => {
  const { user } = useAppContext();
  
  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["hr_manager", "hr_associate"]

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">
            Personal Details{" "}
            {canCreate.includes(...CurrentUserRoles) ? (
              <a
                className="edit-icon"
                data-toggle="modal"
                data-target="#PersonalDetailsModal"
              >
                <i className="fa fa-pencil"></i>
              </a>
            ) : null}
          </h3>

          <ul className="personal-info">
            <li>
              <div className="title">Date of Birth</div>
              <div className="text">
                {personalDetails?.employee?.personal_detail?.DOB
                  ? moment(
                      personalDetails?.employee?.personal_detail?.DOB
                    ).format("Do MMMM, YYYY")
                  : "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Blood Group</div>
              <div className="text">
                {personalDetails?.employee?.personal_detail?.blood_group ||
                  "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Marital status</div>
              <div className="text">
                {personalDetails?.employee?.personal_detail?.marital_status ||
                  "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Means of Identification</div>
              <div className="text">
                {personalDetails?.employee?.personal_detail
                  ?.means_of_identification || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">ID Number</div>
              <div className="text">
                {personalDetails?.employee?.personal_detail?.id_number ||
                  "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">ID Issue Date</div>
              <div className="text">
                {personalDetails?.employee?.personal_detail?.id_issue_date
                  ? moment(
                      personalDetails?.employee?.personal_detail?.id_issue_date
                    ).format("Do MMMM, YYYY")
                  : "Not Available"}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <PersonalDetailsModal data={personalDetails} fetchEmployeeProfile={fetchEmployeeProfile} />
    </>
  );
};

export default PersonalInfo;
