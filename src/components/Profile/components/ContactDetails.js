import React from "react";
import { Link, useParams } from "react-router-dom";

const ContactDetails = ({ handleChange, contactDetails }) => {
  const { id } = useParams();

  return (
    <div className="card profile-box flex-fill">
      <div className="card-body">
        <h3 className="card-title">
          Contact Details
          {id === contactDetails?.employee_id && (
            <Link
              className="edit-icon"
              onClick={() => handleChange("ContactDetails")}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          )}
        </h3>
        <ul className="personal-info">
          <li>
            <div className="title">Mobile Number</div>
            <div className="text">
              {contactDetails?.mobile || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Personal Email</div>
            <div className="text">
              {contactDetails?.personal_email || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Permanent Address Is</div>
            <div className="text">
              {contactDetails?.permanent_address_is || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Permanent Address</div>
            <div className="text">
              {contactDetails?.permanent_address || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Current Address Is</div>
            <div className="text">
              {contactDetails?.current_address_is || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Current Address</div>
            <div className="text">
              {contactDetails?.current_address || "Not Available"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactDetails;
