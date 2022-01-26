import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import { canView } from "../../../services/canView";
import tokenService from "../../../services/token.service";

const ContactDetails = ({
  handleChange,
  contactDetails,
  formValue,
  submitted,
  fetchUserInfo,
  setFormValue,
}) => {
  const { id } = useParams();
  const { showAlert } = useAppContext();
  const user = tokenService.getUser();

  useEffect(() => {
    if (submitted === true) {
      let newFormValue = {
        _id: contactDetails?.contactDetails?._id,
        employee_id: id,
        ...formValue,
      };
      axiosInstance
        .post("/ContactDetails", newFormValue)
        .then((res) => {
          fetchUserInfo();
          setFormValue(null);
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
  }, [submitted, formValue, id, contactDetails?.contactDetails?._id]);
  return (
    <div className="card profile-box flex-fill">
      <div className="card-body">
        <h3 className="card-title">
          Contact Details
          {canView(user, "HR") && (
            <a
              className="edit-icon"
              onClick={() => handleChange("ContactDetails")}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil"></i>
            </a>
          )}
        </h3>
        <ul className="personal-info">
          <li>
            <div className="title">Mobile Number</div>
            <div className="text">
              {contactDetails?.contactDetails?.mobile || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Personal Email</div>
            <div className="text">
              {contactDetails?.contactDetails?.personal_email ||
                "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Permanent Address Is</div>
            <div className="text">
              {contactDetails?.contactDetails?.permanent_address_is ||
                "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Permanent Address</div>
            <div className="text">
              {contactDetails?.contactDetails?.permanent_address ||
                "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Current Address Is</div>
            <div className="text">
              {contactDetails?.contactDetails?.current_address_is ||
                "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Current Address</div>
            <div className="text">
              {contactDetails?.contactDetails?.current_address ||
                "Not Available"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactDetails;
