/* eslint-disable jsx-a11y/anchor-is-valid */
import "./profileCard.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import PersonalInfo from "./components/PersonalInfo";
import EmployeeInfo from "./components/EmployeeInfo";
// import ContactDetails from "./components/ContactDetails";
import FrontVirtualID from "../../pages/In-Apps/FrontVirtualID";
import BackVirtualID from "../../pages/In-Apps/BackVirtualID";
import { EditEmployeeShiftModal } from "../Modal/EditEmployeeShiftModal";
import { EditRemoteEmployeeShiftModal } from "../Modal/EditRemoteEmployeeShiftModal";
import { CreateEmployeeShiftModal } from "../Modal/CreateEmployeeShiftModal";
import { CreateRemoteEmployeeShiftModal } from "../Modal/CreateRemoteEmployeeShiftModal";
import { ManualAttendanceModal } from "../Modal/ManualAttendanceModal";
import { ViewManualAttendanceModal } from "../Modal/ViewManualAttendanceModal";
import { ViewEmployeeShift } from "../Modal/ViewEmployeeShift";
import { ViewRemoteEmployeeShift } from "../Modal/ViewRemoteEmployeeShift";
import { useAppContext } from "../../Context/AppContext";
import { BsFillPrinterFill } from "react-icons/bs";
import AttendanceChart from "../charts/attendance-tardiness";
import axiosInstance from "../../services/api";

const ProfileCards = ({
  setformType,
  userData,
  submitted,
  formValue,
  setFormValue,
  fetchUserInfo,
  today,
  setToday,
  employeeAttendance,
  employeeShifts,
  setEmployeeShifts,
  employeeRemoteShifts,
  setEmployeeRemoteShifts,
  userID,
  userOgid,
  employeeID,
  officeID,
  mode,
  setMode,
  remoteMode,
  setRemoteMode,
  fetchEmployeeShift,
  fetchEmployeeRemoteShift,
  fetchEmployeeProfile,
  fetchEmployeeAttendance,
  setEmployeeOgid,
  hideAttendanceComponent,
  hideRemoteShiftComponent,
}) => {
  const [employeeDetails, setemployeeDetails] = useState({});
  const { user, isFromBiometrics, isFromBiometricsClockIn, ErrorHandler } =
    useAppContext();
  const [employeeTardiness, setEmployeeTardiness] = useState([]);

  const canView = ["hr_manager", "senior_hr_associate", "hr_associate"];
  const CurrentUserRoles = user?.employee_info?.roles;

  const CurrentUserCanEdit = CurrentUserRoles.some((role) =>
    canView.includes(role)
  );

  const ogid = user?.employee_info?.ogid;

  const FrontVirtualIDRef = useRef();
  const handlePrintFront = useReactToPrint({
    content: () => FrontVirtualIDRef.current,
  });

  const BackVirtualIDRef = useRef();
  const handlePrintBack = useReactToPrint({
    content: () => BackVirtualIDRef.current,
  });

  // Fetch Employee Weekly Attendance Tardiness:
  const fetchEmployeeAttendanceTardiness = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/attendance_tardiness/${userOgid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.result;

      function formatDataKeys(data) {
        const formattedData = {};
        for (const day in data) {
          const formattedDay = {};
          for (const key in data[day]) {
            const formattedKey = key.replace(/_/g, " ");
            formattedDay[
              formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)
            ] = data[day][key];
          }
          formattedData[day] = formattedDay;
        }
        return formattedData;
      }

      const formattedData = formatDataKeys(resData);

      setEmployeeTardiness(formattedData);
    } catch (error) {
      const component = "Weekly Attendance Record | ";
      ErrorHandler(error, component);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ogid]);

  useEffect(() => {
    fetchEmployeeAttendanceTardiness();
    setemployeeDetails(userData?.employee);
  }, [fetchEmployeeAttendanceTardiness, userData]);

  return (
    <>
      <div className="card tab-box">
        <div className="row user-tabs">
          <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  href="#emp_profile"
                  data-toggle="tab"
                  className={isFromBiometrics ? "nav-link" : "nav-link active"}
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a href="#emp_virtualID" data-toggle="tab" className="nav-link">
                  Virtual ID
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#emp_shifts"
                  data-toggle="tab"
                  className={isFromBiometrics ? "nav-link active" : "nav-link"}
                >
                  Shifts
                </a>
              </li>
              {CurrentUserCanEdit && !hideAttendanceComponent ? (
                <li className="nav-item">
                  <a
                    href="#emp_clockInOut"
                    data-toggle="tab"
                    className={
                      isFromBiometricsClockIn ? "nav-link active" : "nav-link"
                    }
                  >
                    Manual Clock In/Out
                  </a>
                </li>
              ) : null}

              {(userData?.employee?.remote ||
                CurrentUserRoles.includes("wfh_lead")) &&
              !hideRemoteShiftComponent ? (
                <li className="nav-item">
                  <a
                    href="#emp_remoteShifts"
                    data-toggle="tab"
                    className={
                      isFromBiometrics ? "nav-link active" : "nav-link"
                    }
                  >
                    Remote Shift
                  </a>
                </li>
              ) : null}

              <li className="nav-item">
                <a
                  href="#emp_attendance"
                  data-toggle="tab"
                  className="nav-link"
                >
                  Weekly Attendance Record
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="tab-content">
        <div
          id="emp_profile"
          className={
            isFromBiometrics
              ? "pro-overview tab-pane fade"
              : "pro-overview tab-pane active "
          }
        >
          <div className="row">
            <div className="col-md-6 d-flex">
              <PersonalInfo
                personalDetails={userData}
                fetchEmployeeProfile={fetchEmployeeProfile}
              />
            </div>

            <div className="col-md-6 d-flex">
              <EmployeeInfo
                employeeInfo={userData}
                fetchEmployeeProfile={fetchEmployeeProfile}
                setEmployeeOgid={setEmployeeOgid}
              />
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-6 d-flex">
              <ContactDetails
                contactDetails={userData}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
                setFormValue={setFormValue}
              />
            </div>
          </div> */}
        </div>

        {/* Virtual ID */}
        <div
          id="emp_virtualID"
          className="pro-overview tab-pane fade"
          style={{ backgroundColor: "#f7e3e8" }}
        >
          <div className="row" style={{ padding: "0 20px" }}>
            {employeeDetails && (
              <FrontVirtualID
                employeeDetails={employeeDetails}
                ref={FrontVirtualIDRef}
              />
            )}
            {employeeDetails && <BackVirtualID ref={BackVirtualIDRef} />}
          </div>

          <div className="row card-print-btn-div">
            {employeeDetails && (
              <button
                className="btn btn-primary"
                onClick={handlePrintFront}
                style={{ margin: "10px" }}
              >
                <BsFillPrinterFill style={{ marginRight: "10px" }} /> Print
                Front
              </button>
            )}
            {employeeDetails && (
              <button
                className="btn btn-primary"
                onClick={handlePrintBack}
                style={{ margin: "10px" }}
              >
                <BsFillPrinterFill style={{ marginRight: "10px" }} /> Print Back
              </button>
            )}
          </div>
        </div>

        {/* Shift */}
        {CurrentUserRoles.includes("hr_manager") || userOgid !== ogid ? (
          <div
            id="emp_shifts"
            className={
              isFromBiometrics
                ? "pro-overview tab-pane active "
                : "pro-overview tab-pane fade"
            }
          >
            <div className="row">
              <div className="col-md-12 d-flex">
                {mode === "edit" ? (
                  <EditEmployeeShiftModal
                    userID={userID}
                    officeID={officeID}
                    employeeID={employeeID}
                    // employeeID={userOgid}
                    employeeShifts={employeeShifts}
                    setEmployeeShifts={setEmployeeShifts}
                  />
                ) : (
                  <CreateEmployeeShiftModal
                    userID={userID}
                    officeID={officeID}
                    setMode={setMode}
                    fetchEmployeeShift={fetchEmployeeShift}
                    setEmployeeShifts={setEmployeeShifts}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            id="emp_shifts"
            className={
              isFromBiometrics
                ? "pro-overview tab-pane active "
                : "pro-overview tab-pane fade"
            }
          >
            <div className="row">
              <div className="col-md-12 d-flex">
                <ViewEmployeeShift
                  employeeShifts={employeeShifts}
                  userID={userID}
                />
              </div>
            </div>
          </div>
        )}

        {/* Manual Clock In/Out */}
        {CurrentUserRoles.includes("hr_manager") ||
        CurrentUserRoles.includes("senior_hr_associate") ? (
          <div
            id="emp_clockInOut"
            className={
              isFromBiometricsClockIn
                ? "pro-overview tab-pane active "
                : "pro-overview tab-pane fade"
            }
          >
            <div className="row">
              {CurrentUserRoles.includes("hr_manager") || userOgid !== ogid ? (
                <div className="col-md-12 d-flex">
                  <ManualAttendanceModal
                    employeeOgid={userOgid}
                    today={today}
                    setToday={setToday}
                    employeeAttendance={employeeAttendance}
                    userData={userData}
                    fetchEmployeeAttendance={fetchEmployeeAttendance}
                  />
                </div>
              ) : (
                <div className="col-md-12 d-flex">
                  <ViewManualAttendanceModal
                    employeeOgid={userOgid}
                    today={today}
                    setToday={setToday}
                    employeeAttendance={employeeAttendance}
                    userData={userData}
                    fetchEmployeeAttendance={fetchEmployeeAttendance}
                  />
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Remote shift */}
        {CurrentUserRoles.includes("hr_manager") || userOgid !== ogid ? (
          <div
            id="emp_remoteShifts"
            className={
              isFromBiometrics
                ? "pro-overview tab-pane active "
                : "pro-overview tab-pane fade"
            }
          >
            <div className="row">
              <div className="col-md-12 d-flex">
                {remoteMode === "edit" ? (
                  <EditRemoteEmployeeShiftModal
                    userID={userID}
                    officeID={officeID}
                    employeeID={employeeID}
                    employeeRemoteShifts={employeeRemoteShifts}
                    setEmployeeRemoteShifts={setEmployeeRemoteShifts}
                  />
                ) : (
                  <CreateRemoteEmployeeShiftModal
                    userID={userID}
                    setMode={setMode}
                    fetchEmployeeRemoteShift={fetchEmployeeRemoteShift}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            id="emp_remoteShifts"
            className={
              isFromBiometrics
                ? "pro-overview tab-pane active "
                : "pro-overview tab-pane fade"
            }
          >
            <div className="row">
              <div className="col-md-12 d-flex">
                <ViewRemoteEmployeeShift
                  employeeShifts={employeeShifts}
                  userID={userID}
                />
              </div>
            </div>
          </div>
        )}

        {/* Attendance Record */}
        <div
          id="emp_attendance"
          className="pro-overview tab-pane fade"
          style={{ backgroundColor: "#f7e3e8" }}
        >
          <AttendanceChart data={employeeTardiness} />
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
