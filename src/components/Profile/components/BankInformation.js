import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import { canView } from "../../../services/canView";
import tokenService from "../../../services/token.service";

const BankInformation = ({
  salaryDetails,
  handleChange,
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
      let obj = {};
      for (const item in formValue) {
        console.log(item);
        if (item !== "Fields" && item !== "title") {
          obj[item] = formValue[item];
        }
      }
      let newFormValue = {
        _id: salaryDetails?.salaryDetails?._id,
        employee_id: id,
        ...obj,
      };
      axiosInstance
        .post("/SalaryDetails", newFormValue)
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
  }, [submitted, formValue, id, salaryDetails?.salaryDetails?._id]);
  return (
    <div className="card profile-box flex-fill">
      <div className="card-body">
        <h3 className="card-title">
          Bank information
          {canView(user, "HR") && (
            <a
              className="edit-icon"
              onClick={() => handleChange("SalaryDetails")}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil"></i>
            </a>
          )}
        </h3>
        <ul className="personal-info">
          <li>
            <div className="title">Bank name</div>
            <div className="text">
              {salaryDetails?.salaryDetails?.bank_name || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Bank account No.</div>
            <div className="text">
              {salaryDetails?.salaryDetails?.bank_account_number ||
                "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Bank Code</div>
            <div className="text">
              {salaryDetails?.salaryDetails?.bank_code || "Not Available"}
            </div>
          </li>
          <li>
            <div className="title">Salary Mode</div>
            <div className="text">
              {salaryDetails?.salaryDetails?.salary_mode || "Not Available"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BankInformation;
