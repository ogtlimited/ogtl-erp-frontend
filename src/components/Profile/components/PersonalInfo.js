import React from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const PersonalInfo = ({ handleChange, personalDetails }) => {
  const { id } = useParams();
  return (
    <div className="card profile-box flex-fill">
      <div className="card-body">
        <h3 className="card-title">
          Personal Informations{" "}
          {id === personalDetails?.employee_id && (
            <Link
              onClick={() => handleChange("PersonalDetails")}
              className="edit-icon"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          )}
        </h3>
        <ul className="personal-info">
          <li>
            <div className="title">Date of birth</div>
            <div className="text">
              {personalDetails?.date_of_birth
                ? moment(personalDetails?.date_of_birth).format("L")
                : "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Passport No.</div>
            <div className="text">
              {personalDetails?.passport_number || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Passport Exp Date.</div>
            <div className="text">
              {personalDetails?.valid_upto
                ? moment(personalDetails?.valid_upto).format("L")
                : "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Passport Issue Date</div>
            <div className="text">
              {personalDetails?.date_of_issue
                ? moment(personalDetails?.date_of_issue).format("L")
                : "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Place of Issue</div>
            <div className="text">
              {personalDetails?.place_of_issue || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Blood Group</div>
            <div className="text">
              {personalDetails?.blood_group || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Marital status</div>
            <div className="text">
              {personalDetails?.marital_status || "Not Available"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfo;
