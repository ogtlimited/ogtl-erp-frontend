/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import { EmployeeInfoModal } from "../../Modal/EmployeeInfoModal";

const EmployeeInfo = ({ employeeInfo, fetchEmployeeProfile }) => {
  const { user } = useAppContext();

  console.log("employeeInfo:", employeeInfo);

  const CurrentUserRoles = user?.employee_info?.roles;

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">
            Employee Information{" "}
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                className="edit-icon"
                data-toggle="modal"
                data-target="#EmployeeInfoModal"
              >
                <i className="fa fa-pencil"></i>
              </a>
            )}
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
                {employeeInfo?.office?.office_type || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Office</div>
              <div className="text">
                {employeeInfo?.office?.title || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Designation</div>
              <div className="text">
                {employeeInfo?.employee?.designation?.title || "Not Available"}
              </div>
            </li>
            <li>
              <div className="title">Remote</div>
              <div className="text">
                {employeeInfo?.employee?.remote ? "Yes" : "No"}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <EmployeeInfoModal
        data={employeeInfo}
        fetchEmployeeProfile={fetchEmployeeProfile}
      />
    </>
  );
};

export default EmployeeInfo;
