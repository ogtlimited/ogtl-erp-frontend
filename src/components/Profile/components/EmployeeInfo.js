/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import { EmployeeInfoModal } from "../../Modal/EmployeeInfoModal";

const EmployeeInfo = ({
  employeeInfo,
  fetchEmployeeProfile,
  setEmployeeOgid,
}) => {
  const { user } = useAppContext();

  const CurrentUserRoles = user?.employee_info?.roles;

  const canEditOffice = [
    "hr_manager",
    "hr_associate",
    "team_lead",
    "supervisor",
  ];

  const CurrentUserCanEdit = CurrentUserRoles.some((role) =>
    canEditOffice.includes(role)
  );

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">
            Employee Information{" "}
            {CurrentUserCanEdit ? (
              <a
                className="edit-icon"
                data-toggle="modal"
                data-target="#EmployeeInfoModal"
              >
                <i className="fa fa-pencil"></i>
              </a>
            ) : null}
          </h3>

          <ul className="personal-info">
            <li>
              <div className="title">Date Joined</div>
              <div className="text">
                {employeeInfo?.employee?.date_of_joining
                  ? moment(employeeInfo?.employee?.date_of_joining).format(
                      "Do MMMM, YYYY"
                    )
                  : "Not Available"}
              </div>
            </li>
            {/* <li>
              <div className="title">Branch</div>
              <div className="text">
                {employeeInfo?.employee?.branch ||
                  "Not Available"}
              </div>
            </li> */}
            <li>
              <div className="title">Office Type</div>
              <div className="text">
                {employeeInfo?.office?.office_type.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                ) || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Office</div>
              <div
                className="text"
                style={{
                  fontSize: "14px",
                }}
              >
                {employeeInfo?.office?.title.toUpperCase() || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Designation</div>
              <div
                className="text"
                style={{
                  fontSize: "14px",
                }}
              >
                {employeeInfo?.employee?.designation?.title || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Remote</div>
              <div className="text">
                {employeeInfo?.employee?.remote ? "Yes" : "No"}
              </div>
            </li>
            <li>
              <div className="title">Strict Attendance</div>
              <div className="text">
                {employeeInfo?.employee?.strict_attendance ? "Yes" : "No"}
              </div>
            </li>
            <li>
              <div className="title">Leave Approval Level</div>
              <div className="text">
                <strong>
                  {employeeInfo?.employee?.leave_approval_level === 1
                    ? "1st Approver"
                    : employeeInfo?.employee?.leave_approval_level === 2
                    ? "2nd Approver"
                    : employeeInfo?.employee?.leave_approval_level === 3
                    ? "3rd Approver"
                    : employeeInfo?.employee?.leave_approval_level > 3
                    ? `${employeeInfo?.employee?.leave_approval_level}th Approver`
                    : "Not Available"}
                </strong>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <EmployeeInfoModal
        data={employeeInfo}
        fetchEmployeeProfile={fetchEmployeeProfile}
        setEmployeeOgid={setEmployeeOgid}
      />
    </>
  );
};

export default EmployeeInfo;
