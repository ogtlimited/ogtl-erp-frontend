/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import tokenService from "../../../services/token.service";
import { canView } from "../../../services/canView";

const PersonalInfo = ({
  handleChange,
  personalDetails,
  formValue,
  submitted,
  setFormValue,
  fetchUserInfo,
}) => {
  const { id } = useParams();
  const { showAlert } = useAppContext();
  const user = tokenService.getUser();

  useEffect(() => {
    if (submitted === true) {
      let obj = {};
      console.log(formValue, "FORM VALUE");
      for (const item in formValue) {
        console.log(item);
        if (item !== "Fields" && item !== "title") {
          obj[item] = formValue[item];
        }
      }
      console.log(obj, "OBJECT");
      let newFormValue = {
        _id: personalDetails?.personalDetails?._id,
        employee_id: id,
        ...obj,
      };
      axiosInstance
        .post("/PersonalDetails", newFormValue)
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
  }, [submitted, formValue, id, personalDetails?.personalDetails?._id]);

  return (
    <div className="card profile-box flex-fill">
      <div className="card-body">
        <h3 className="card-title">
          Personal Information{" "}
          {canView(user, "hr") && (
            <a
              onClick={() => handleChange("PersonalDetails")}
              className="edit-icon"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil"></i>
            </a>
          )}
        </h3>

        <ul className="personal-info">
          <li>
            <div className="title">Date of birth</div>
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
              {personalDetails?.employee?.personal_detail?.blood_group || "Not Available"}
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
              {personalDetails?.employee?.personal_detail?.means_of_identification ||
                "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">ID Number</div>
            <div className="text">
              {personalDetails?.employee?.personal_detail?.id_number || "Not Available"}
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
  );
};

export default PersonalInfo;
