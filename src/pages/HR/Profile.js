// *IN USE!

/* eslint-disable jsx-a11y/anchor-is-valid*/
import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import avater from "../../assets/img/profile.png";
import { ReportToModal } from "../../components/Modal/ReportToModal";
import ProfileCards from "../../components/Profile/ProfileCards";
import axiosInstance from "../../services/api";
import moment from "moment";
import { useAppContext } from "../../Context/AppContext";

const Profile = () => {
  const { id } = useParams();
  const { dropDownClicked, setDropDownClicked, user, showAlert } =
    useAppContext();
  const [userData, setUserdata] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [userID, setUserId] = useState("");
  const [employeeID, setEmployeeId] = useState("");
  const [officeID, setOfficeId] = useState("");
  const [mode, setMode] = useState("");

  const [employeeOgid, setEmployeeOgid] = useState(id);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canEdit = ["hr_manager", "hr_associate"];

  // Employee Shifts:
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

      if (!employeeShifts.length) {
        setMode("create");
      } else if (employeeShifts.length) {
        setMode("edit");
        setEmployeeShifts(employeeShifts);
      }
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
  };

  // Employee Profile Info:
  const fetchEmployeeProfile = async (newOgid) => {
    if (newOgid) {
      try {
        const response = await axiosInstance.get(`/api/v1/employees/${newOgid}.json`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const resData = response?.data?.data;
        setUserdata(resData);
  
        const userId = resData?.employee?.email;
        const employeeId = resData?.employee?.personal_detail?.id;
        const officeId = resData?.office?.id;

        setUserId(userId);
        setEmployeeId(employeeId);
        setOfficeId(officeId);
      } catch (error) {
        console.log("This error:", error?.response?.status);
        if (error?.response?.status === 500) {
          showAlert(
            true,
            "Error fetching Employee Profile",
            "alert alert-warning"
          );
        }
        showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      }
    } else {
      try {
        const response = await axiosInstance.get(`/api/v1/employees/${employeeOgid}.json`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const resData = response?.data?.data;
        setUserdata(resData);
  
        const userId = resData?.employee?.email;
        const employeeId = resData?.employee?.personal_detail?.id;
        const officeId = resData?.office?.id;

        setUserId(userId);
        setEmployeeId(employeeId);
        setOfficeId(officeId);
      } catch (error) {
        console.log("This error:", error?.response?.status);
        if (error?.response?.status === 500) {
          showAlert(
            true,
            "Error fetching Employee Profile",
            "alert alert-warning"
          );
        }
        showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      }
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
                          {userData?.employee?.designation?.title ||
                            "Not Available"}
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
                          <div className="title">Birthday:</div>
                          <div className="text">
                            {userData?.employee?.personal_detail?.DOB
                              ? moment(
                                  userData?.employee?.personal_detail?.DOB
                                ).format("Do MMMM, YYYY")
                              : "Not Available"}
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
                            {userData?.employee?.leave_count || "Not Available"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Reports to:</div>
                          <div className="text">
                            <a
                              href={userData?.employee?.reports_to?.ogid}
                              className="report-to-link"
                            >
                              {userData?.employee?.reports_to?.full_name ||
                                "No Lead"}
                            </a>
                            {canEdit.includes(...CurrentUserRoles) ? (
                              <a
                                className="edit-icon"
                                data-toggle="modal"
                                data-target="#ReportToModal"
                              >
                                <i className="fa fa-pencil"></i>
                              </a>
                            ) : null}
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
        userData={userData}
        formValue={formValue}
        setFormValue={setFormValue}
        mode={mode}
        setMode={setMode}
        employeeShifts={employeeShifts}
        setEmployeeShifts={setEmployeeShifts}
        userID={userID}
        employeeID={employeeID}
        userOgid={id}
        officeID={officeID}
        fetchEmployeeShift={fetchEmployeeShift}
        fetchEmployeeProfile={fetchEmployeeProfile}
        setEmployeeOgid={setEmployeeOgid}
      />

      <ReportToModal
        data={userData}
        fetchEmployeeProfile={fetchEmployeeProfile}
      />
    </>
  );
};

export default Profile;
