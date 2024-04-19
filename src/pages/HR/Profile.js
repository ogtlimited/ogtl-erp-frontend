// *IN USE - FIXED!

/* eslint-disable jsx-a11y/anchor-is-valid*/
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import malePlaceholder from "../../assets/img/male-placeholder.jpeg";
import femalePlaceholder from "../../assets/img/female-placeholder.jpg";
import { ReportToModal } from "../../components/Modal/ReportToModal";
import ProfileCards from "../../components/Profile/ProfileCards";
import axiosInstance from "../../services/api";
import moment from "moment";
import { useAppContext } from "../../Context/AppContext";

const Profile = () => {
  const { id } = useParams();
  const { dropDownClicked, setDropDownClicked, user, ErrorHandler } =
    useAppContext();
  const [userData, setUserdata] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [employeeRemoteShifts, setEmployeeRemoteShifts] = useState([]);
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [userID, setUserId] = useState("");
  const [employeeID, setEmployeeId] = useState("");
  const [officeID, setOfficeId] = useState("");
  const [mode, setMode] = useState("");
  const [remoteMode, setRemoteMode] = useState("");
  const [gender, setGender] = useState("");

  const [hideReportToModal, setHideReportToModal] = useState(false);
  const [hideAttendanceComponent, setHideAttendanceComponent] = useState(false);
  const [hideRemoteShiftComponent, setHideRemoteShiftComponent] =
    useState(false);

  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");
  const [today, setToday] = useState(today_date);

  const [employeeOgid, setEmployeeOgid] = useState(id);

  const CurrentUserRoles = user?.employee_info?.roles;
  const CurrentUserIsRemoteLead = user?.employee_info?.remote;
  const CurrentUserIsLead = user?.employee_info?.is_lead;

  const canEditReportTo = [
    "hr_manager",
    "hr_associate",
    "team_lead",
    "supervisor",
  ];

  const CurrentUserCanEditReportTo = CurrentUserRoles.some((role) =>
    canEditReportTo.includes(role)
  );

  // Employee Shifts:
  const fetchEmployeeShift = useCallback(async () => {
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
      const component = "Employee Shifts Error:";
      ErrorHandler(error, component);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Employee Profile Info:
  const fetchEmployeeProfile = useCallback(
    async (newOgid) => {
      if (newOgid) {
        try {
          const response = await axiosInstance.get(
            `/api/v1/employees/${newOgid}.json`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );
          const resData = response?.data?.data;
          console.log("Employee Profile:", resData);
          setUserdata(resData);

          const userId = resData?.employee?.email;
          const employeeId = resData?.employee?.personal_detail?.id;
          const officeId = resData?.office?.id;
          const gender = resData?.employee?.personal_detail?.gender;

          setUserId(userId);
          setEmployeeId(employeeId);
          setOfficeId(officeId);
          setGender(gender);
        } catch (error) {
          const component = "Employee Profile Error:";
          ErrorHandler(error, component);
        }
      } else {
        try {
          const response = await axiosInstance.get(
            `/api/v1/employees/${employeeOgid}.json`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );
          const resData = response?.data?.data;
          setUserdata(resData);
          console.log("Employee Profile:", resData);

          const userId = resData?.employee?.email;
          const employeeId = resData?.employee?.personal_detail?.id;
          const officeId = resData?.office?.id;
          const gender = resData?.employee?.personal_detail?.gender;

          setUserId(userId);
          setEmployeeId(employeeId);
          setOfficeId(officeId);
          setGender(gender);
        } catch (error) {
          const component = "Employee Profile Error:";
          ErrorHandler(error, component);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [employeeOgid]
  );

  // Employee Attendance - Today:
  const fetchEmployeeAttendance = useCallback(
    async (date) => {
      if (date) {
        try {
          const response = await axiosInstance.get(
            `/api/v1/employee_attendances/${id}.json?start_date=${date}&end_date=${date}&limit=400`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );

          const resData =
            response?.data?.data?.result === "no record for date range"
              ? []
              : response?.data?.data?.result;

          setEmployeeAttendance(resData);
        } catch (error) {
          const component = "Employee Attendance Error:";
          ErrorHandler(error, component);

          if (error?.response?.status === 403) {
            return setHideAttendanceComponent(true);
          }
        }
      } else {
        try {
          const response = await axiosInstance.get(
            `/api/v1/employee_attendances/${id}.json?start_date=${today}&end_date=${today}&limit=400`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );

          const resData =
            response?.data?.data?.result === "no record for date range"
              ? []
              : response?.data?.data?.result;

          setEmployeeAttendance(resData);
        } catch (error) {
          const component = "Employee Attendance Error:";
          ErrorHandler(error, component);

          if (error?.response?.status === 403) {
            return setHideAttendanceComponent(true);
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, today]
  );

  // Employee Remote Shifts:
  const fetchEmployeeRemoteShift = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/employee_remote_shifts.json?ogid=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.employee_remote_shifts;
      const employeeRemoteShifts = resData;

      if (!employeeRemoteShifts.length) {
        setRemoteMode("create");
      } else if (employeeRemoteShifts.length) {
        setRemoteMode("edit");
        setEmployeeRemoteShifts(employeeRemoteShifts);
      }
    } catch (error) {
      const component = "Remote Employee Shift Error:";
      ErrorHandler(error, component);

      if (error?.response?.status === 403) {
        return setHideRemoteShiftComponent(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchEmployeeShift();
    fetchEmployeeProfile();

    if (
      (CurrentUserIsLead && CurrentUserIsRemoteLead) ||
      CurrentUserRoles.includes("wfh_lead")
    ) {
      fetchEmployeeRemoteShift();
    }

    if (
      CurrentUserRoles.includes("hr_manager") ||
      CurrentUserRoles.includes("senior_hr_associate")
    ) {
      fetchEmployeeRemoteShift();
      fetchEmployeeAttendance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dropDownClicked) {
      fetchEmployeeShift();
      fetchEmployeeProfile();

      if (
        (CurrentUserIsLead && CurrentUserIsRemoteLead) ||
        CurrentUserRoles.includes("wfh_lead")
      ) {
        fetchEmployeeRemoteShift();
      }

      if (
        CurrentUserRoles.includes("hr_manager") ||
        CurrentUserRoles.includes("senior_hr_associate")
      ) {
        fetchEmployeeRemoteShift();
        fetchEmployeeAttendance();
      }

      return setDropDownClicked(false);
    }
  }, [
    CurrentUserIsLead,
    CurrentUserIsRemoteLead,
    CurrentUserRoles,
    dropDownClicked,
    fetchEmployeeAttendance,
    fetchEmployeeProfile,
    fetchEmployeeRemoteShift,
    fetchEmployeeShift,
    setDropDownClicked,
  ]);

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Profile</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Employee</li>
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
                      {gender === "male" ? (
                        <img
                          alt=""
                          src={userData?.employee?.image || malePlaceholder}
                        />
                      ) : gender === "female" ? (
                        <img
                          alt=""
                          src={userData?.employee?.image || femalePlaceholder}
                        />
                      ) : (
                        <img
                          src="https://res.cloudinary.com/dhantey/image/upload/v1679528249/unknown-user-images_k0jjaq.png"
                          alt="No Employee"
                        />
                      )}
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
                        <div className="staff-id">
                          OGID: {userData?.employee?.ogid || "Not Available"}
                        </div>
                        <div className="staff-id">
                          {userData?.office?.office_type.replace(
                            /\b\w/g,
                            (char) => char.toUpperCase()
                          ) || "Office"}
                          :{" "}
                          {userData?.office?.title.toUpperCase() ||
                            "Not Available"}
                        </div>
                        <div className="small doj text-muted">
                          Date Joined:{" "}
                          {userData?.employee?.date_of_joining
                            ? moment(
                                userData?.employee?.date_of_joining
                              ).format("Do MMMM, YYYY")
                            : "Not Available"}
                        </div>
                        <div className="small doj text-muted">
                          Tenure:{" "}
                          {userData?.employee?.tenure || "Not Available"}
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
                            {userData?.employee?.personal_detail?.gender?.replace(
                              /\b\w/g,
                              (char) => char?.toUpperCase()
                            ) || "Not Available"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Leave balance:</div>
                          {userData?.employee?.leave_count ? (
                            <div className="text">
                              {userData?.employee?.leave_count > 1
                                ? userData?.employee?.leave_count +
                                  " days remaining"
                                : userData?.employee?.leave_count +
                                  " day remaining"}
                            </div>
                          ) : (
                            <div className="text">Not Available</div>
                          )}
                        </li>
                        {CurrentUserIsLead ||
                        CurrentUserRoles.includes("hr_manager") ||
                        CurrentUserRoles.includes("senior_hr_associate") ? (
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
                              {CurrentUserCanEditReportTo &&
                              !hideReportToModal ? (
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
                        ) : (
                          <li>
                            <div className="title">Reports to:</div>
                            <div className="text">
                              {userData?.employee?.reports_to?.full_name ||
                                "No Lead"}
                            </div>
                          </li>
                        )}
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
        remoteMode={remoteMode}
        setRemoteMode={setRemoteMode}
        today={today}
        setToday={setToday}
        employeeAttendance={employeeAttendance}
        employeeShifts={employeeShifts}
        setEmployeeShifts={setEmployeeShifts}
        employeeRemoteShifts={employeeRemoteShifts}
        setEmployeeRemoteShifts={setEmployeeRemoteShifts}
        userID={userID}
        employeeID={employeeID}
        userOgid={id}
        officeID={officeID}
        fetchEmployeeShift={fetchEmployeeShift}
        fetchEmployeeRemoteShift={fetchEmployeeRemoteShift}
        fetchEmployeeProfile={fetchEmployeeProfile}
        fetchEmployeeAttendance={fetchEmployeeAttendance}
        setEmployeeOgid={setEmployeeOgid}
        hideAttendanceComponent={hideAttendanceComponent}
        hideRemoteShiftComponent={hideRemoteShiftComponent}
      />

      <ReportToModal
        data={userData}
        fetchEmployeeProfile={fetchEmployeeProfile}
        setHideReportToModal={setHideReportToModal}
      />
    </>
  );
};

export default Profile;
