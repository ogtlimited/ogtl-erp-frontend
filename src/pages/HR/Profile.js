/* eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import avater from "../../assets/img/profile.png";
import { ContactDetailJson } from "../../components/FormJSON/HR/Employee/ContactDetails";
import { EmergencyDetailJson } from "../../components/FormJSON/HR/Employee/EmergencyContact";
import { EmployeeEducationJson } from "../../components/FormJSON/HR/Employee/EmployeeEducation";
import { PersonalDetailJson } from "../../components/FormJSON/HR/Employee/PersonalDetails";
import { WorkExperienceJson } from "../../components/FormJSON/HR/Employee/WorkExperience";
import FormModal from "../../components/Modal/Modal";
import ProfileCards from "../../components/Profile/ProfileCards";
import axiosInstance from "../../services/api";
import moment from "moment";
import { historyJson } from "../../components/FormJSON/HR/Employee/history";
import { useAppContext } from "../../Context/AppContext";
import { SalaryDetailJson } from "../../components/FormJSON/HR/Employee/SalaryDetails";
import FormModal2 from "../../components/Modal/FormModal2";
import helper from "../../services/helper";
import ViewModal from "../../components/Modal/ViewModal";
import SocialHandleForm from "../../components/Profile/components/SocialHandleForm";
import tokenService from "../../services/token.service";
import { canView } from "../../services/canView";

const Profile = () => {
  const user = tokenService.getUser();
  const { id } = useParams();
  const { combineRequest, dropDownClicked, setDropDownClicked } =
    useAppContext();
  const [formType, setformType] = useState("");
  const [template, settemplate] = useState(PersonalDetailJson);
  const [userData, setUserdata] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [userID, setUserId] = useState("");
  const [mode, setMode] = useState("");

  const fetchEmployeeShift = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/employee_shifts.json?ogid=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.employee_shifts;
      const employeeShifts = resData;
      console.log("employee shift:", employeeShifts);

      if (!employeeShifts.length) {
        setMode("create");
      } else if (employeeShifts.length) {
        setMode("edit");
        setEmployeeShifts(employeeShifts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Employee Profile Info:
  const fetchEmployeeProfile = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/employees/${id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data;
      setUserdata(resData);

      const userId = resData?.employee?.email;
      setUserId(userId);
    } catch (error) {
      console.log("Get All Employee Profile error:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeShift();
    fetchEmployeeProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dropDownClicked) {
    fetchEmployeeShift();
    fetchEmployeeProfile();
    setDropDownClicked(false);
  }

  useEffect(() => {
    combineRequest().then((res) => {
      const { designations, branches } = res.data.createEmployeeFormSelection;

      const designationsOpts = designations?.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      const branchesOpts = branches?.map((e) => {
        return {
          label: e.branch,
          value: e._id,
        };
      });
      const finalForm = historyJson.Fields.map((field) => {
        if (field.name === "branch_id") {
          field.options = branchesOpts;
          return field;
        } else if (field.name === "designation_id") {
          field.options = designationsOpts;
          return field;
        }
        return field;
      });
      settemplate({
        title: historyJson.title,
        Fields: finalForm,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Profile</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr/all-employees">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Profile</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card mb-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-view">
                <div className="profile-img-wrap">
                  <div className="profile-img">
                    <a href="#">
                      <img alt="" src={userData?.employee?.image || avater} />
                    </a>
                  </div>
                </div>
                <div className="profile-basic">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="profile-info-left">
                        <h3 className="user-name m-t-0 mb-0">
                          {userData?.employee?.full_name}{" "}
                        </h3>
                        <h6 className="text-muted">
                          {userData?.employee?.designation || "Not Available"}
                        </h6>
                        <small className="text-muted">
                          {userData?.office?.title || "Not Available"}
                        </small>
                        <div className="staff-id">
                          Employee ID : {userData?.employee?.ogid}
                        </div>
                        <div className="small doj text-muted">
                          Date Joined :{" "}
                          {userData?.employee?.date_of_joining
                            ? moment(
                                userData?.employee?.date_of_joining
                              ).format("Do MMMM, YYYY")
                            : "Not Available"}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <ul className="personal-info">
                        <li>
                          <div className="title">Phone:</div>
                          <div className="text">
                            {userData?.contactDetails?.mobile ||
                              "Not Available"}
                          </div>
                        </li>

                        <li>
                          <div className="title">Email:</div>
                          <div className="text">
                            {userData?.employee?.email || "Not Available"}
                          </div>
                        </li>

                        <li>
                          <div className="title">Gender:</div>
                          <div className="text">
                            {userData?.employee?.personal_detail?.gender
                              .charAt(0)
                              .toUpperCase() +
                              userData?.employee?.personal_detail?.gender.slice(
                                1
                              ) || "Not Available"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Leave Count:</div>
                          <div className="text">
                            {userData?.employee?.leaveCount || "Not Available"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Branch:</div>
                          <div className="text">
                            {userData?.employee?.branch?.branch ||
                              "Not Available"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Reports to:</div>
                          <div className="text">
                            <a href={userData?.employee?.reports_to?.ogid}>
                              {userData?.employee?.reports_to?.full_name ||
                                "Not Available"}
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileCards
        setformType={setformType}
        userData={userData}
        submitted={submitted}
        formValue={formValue}
        setFormValue={setFormValue}
        mode={mode}
        setMode={setMode}
        employeeShifts={employeeShifts}
        setEmployeeShifts={setEmployeeShifts}
        userID={userID}
        userOgid={id}
        fetchEmployeeProfile={fetchEmployeeProfile}
      />
    </>
  );
};

export default Profile;
