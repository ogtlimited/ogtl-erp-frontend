/* eslint-disable jsx-a11y/anchor-is-valid */
import "./profileCard.css";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ContactDetails from "./components/ContactDetails";
import PersonalInfo from "./components/PersonalInfo";
import FrontVirtualID from "../../pages/In-Apps/FrontVirtualID";
import BackVirtualID from "../../pages/In-Apps/BackVirtualID";
import { EditEmployeeShiftModal } from "../Modal/EditEmployeeShiftModal";
import { CreateEmployeeShiftModal } from "../Modal/CreateEmployeeShiftModal";
import { ViewEmployeeShift } from "../Modal/ViewEmployeeShift";
import { useAppContext } from "../../Context/AppContext";
import { BsFillPrinterFill } from "react-icons/bs";

const ProfileCards = ({
  setformType,
  userData,
  submitted,
  formValue,
  setFormValue,
  fetchUserInfo,
  employeeShifts,
  setEmployeeShifts,
  userID,
  mode,
  setMode,
  userOgid,
}) => {
  const [employeeDetails, setemployeeDetails] = useState({});
  const { user, isFromBiometrics } = useAppContext();

  const actionUser = user?.employee_info?.roles;

  const ogid = user?.employee_info?.ogid;

  const FrontVirtualIDRef = useRef();
  const handlePrintFront = useReactToPrint({
    content: () => FrontVirtualIDRef.current,
  });

  const BackVirtualIDRef = useRef();
  const handlePrintBack = useReactToPrint({
    content: () => BackVirtualIDRef.current,
  });


  const handleChange = (type) => {
    setFormValue(null);
    setformType(type);
  };

  useEffect(() => {
    setemployeeDetails(userData?.employee);
  }, [userData]);
  
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
                handleChange={handleChange}
                personalDetails={userData}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
                setFormValue={setFormValue}
              />
            </div>
            <div className="col-md-6 d-flex">
              <ContactDetails
                handleChange={handleChange}
                contactDetails={userData}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
                setFormValue={setFormValue}
              />
            </div>
          </div>
        </div>

        <div
          id="emp_virtualID"
          className="pro-overview tab-pane fade"
          style={{ backgroundColor: "#fff" }}
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

        {actionUser.includes("hr_manager") || userOgid !== ogid ? (
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
                    employeeShifts={employeeShifts}
                    setEmployeeShifts={setEmployeeShifts}
                  />
                ) : (
                  <CreateEmployeeShiftModal
                    userID={userID}
                    setMode={setMode}
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
      </div>
    </>
  );
};

export default ProfileCards;
