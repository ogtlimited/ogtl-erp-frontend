// *IN USE - FIXED!

import React, { useState, useEffect } from "react";
import DashboardChart from "../../components/charts/dashboard-charts";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import moment from "moment";

const HRDashboard = () => {
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [employeeLabel, setEmployeeLabel] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [genderLabel, setGenderLabel] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [leaveStatusLabel, setLeaveStatusLabel] = useState([]);
  const [leaveStatusData, setLeaveStatusData] = useState([]);
  const [leaveTypeLabel, setLeaveTypeLabel] = useState([]);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const [formattedLeaveType, setFormattedLeaveType] = useState([]);
  const [formattedLeaveStatus, setFormattedLeaveStatus] = useState([]);
  const [resignationByGenderLabel, setResignationByGenderLabel] = useState([]);
  const [resignationByGenderData, setResignationByGenderData] = useState([]);
  const [resignationStatusLabel, setResignationStatusLabel] = useState([]);
  const [resignationStatusData, setResignationStatusData] = useState([]);
  const [resignationReasonLabel, setResignationReasonLabel] = useState([]);
  const [resignationReasonData, setResignationReasonData] = useState([]);

  const [hideHeadCountCard, setHideHeadCountCard] = useState(false);
  const [hideGenderDivRatioCard, setHideGenderDivRatioCard] = useState(false);

  const [headCount, setheadCount] = useState(0);
  const [genderRatio, setGenderRatio] = useState(0);

  const firstDay = new Date(new Date().getFullYear(), 0, 1, 1);
  const lastDay = new Date(new Date().getFullYear(), 11, 31, 0);

  const [fromDate, setFromDate] = useState(
    moment(firstDay).format("yyyy-MM-DD")
  );
  const [toDate, setToDate] = useState(moment(lastDay).format("yyyy-MM-DD"));
  const [fromDate2, setFromDate2] = useState(
    moment(firstDay).format("yyyy-MM-DD")
  );
  const [toDate2, setToDate2] = useState(moment(lastDay).format("yyyy-MM-DD"));

  const CurrentUserRoles = user?.employee_info?.roles;
  const authorizedSeniorRoles = ["hr_manager", "senior_hr_associate"];

  const AuthorizedHrManagerRoles = CurrentUserRoles.some((role) =>
    authorizedSeniorRoles.includes(role)
  );

  // Head Count: Active
  const fetchHeadCount = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/employee_head_count.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const resData = response?.data?.data?.head_count.active;

      const activeEmployeesCount = resData;
      setheadCount(activeEmployeesCount);
      setLoading(false);
    } catch (error) {
      const component = "Employee Head Count Error | ";
      ErrorHandler(error, component);
      setHideHeadCountCard(true);
      setLoading(false);
    }
  };

  // Gender Diversity Ratio (Card) & Employee by Gender (Chart)
  const fetchEmployeeGender = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/employee_by_gender.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const resData = response?.data?.data?.record;

      const genderDiversityRatio = resData?.gender_ratio;
      setGenderRatio(genderDiversityRatio);

      const employeeByGender = {};
      employeeByGender.male = resData?.male;
      employeeByGender.female = resData?.female;

      const labels = Object.keys(employeeByGender);
      const data = Object.values(employeeByGender);

      setGenderLabel(labels);
      setGenderData(data);
    } catch (error) {
      const component = "Gender by Gender Error | ";
      ErrorHandler(error, component);
      setHideGenderDivRatioCard(true);
    }
  };

  // Employee by Office (Chart)
  const fetchEmployeeData = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/employees_by_office.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const offices = response?.data?.data?.employees_by_office;

      const formatted = offices.map((e) => ({
        labels: e.split(":")[0],
        data: Number(e.split(":")[1].trim()),
      }));

      const label = [...formatted.map((e) => e.labels)];
      const data = [...formatted.map((e) => e.data)];

      setEmployeeLabel(label);
      setEmployeeData(data);
    } catch (error) {
      const component = "Employee by Office Error | ";
      ErrorHandler(error, component);
    }
  };

  // Leave Report - Leave types and Leave status (chart)
  const fetchLeaveReport = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/leave_report.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const leaveTypes = response?.data?.data?.report?.leave_types;
      const leaveTypeLabel = Object.keys(leaveTypes);
      const leaveTypesData = Object.values(leaveTypes);
      setFormattedLeaveType(leaveTypeLabel);
      setLeaveTypeLabel(leaveTypeLabel);
      setLeaveTypeData(leaveTypesData);

      const leaveStatus = response?.data?.data?.report?.status;
      const leaveStatusLabel = Object.keys(leaveStatus);
      const leaveStatusData = Object.values(leaveStatus);
      setFormattedLeaveStatus(leaveStatusLabel);
      setLeaveStatusLabel(leaveStatusLabel);
      setLeaveStatusData(leaveStatusData);
    } catch (error) {
      const component = "Leave Report Error | ";
      ErrorHandler(error, component);
    }
  };

  // Resignation Report:
  const fetchResignationReport = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/resignations.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const { gender_count, status, reason } =
        response?.data?.data?.resignations;

      // Gender:
      const genders = gender_count.map((item) => item.gender);
      const resignationCounts = gender_count.map(
        (item) => item.resignation_count
      );

      setResignationByGenderLabel(genders);
      setResignationByGenderData(resignationCounts);

      // Status:
      const statusLabels = Object.keys(status);
      const statusData = Object.values(status);

      setResignationStatusLabel(statusLabels);
      setResignationStatusData(statusData);

      // Reason:
      const reasonLabels = reason ? Object?.keys(reason) : null;
      const reasonData = reason ? Object?.values(reason) : null;

      setResignationReasonLabel(reasonLabels);
      setResignationReasonData(reasonData);
    } catch (error) {
      const component = "Resignation Report | ";
      ErrorHandler(error, component);
    }
  };

  useEffect(() => {
    if (AuthorizedHrManagerRoles) {
      fetchHeadCount();
      fetchEmployeeGender();
      fetchEmployeeData();
      fetchLeaveReport();
    }
    fetchResignationReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome HR!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hr-dashboard-card-group">
        {!hideHeadCountCard && AuthorizedHrManagerRoles ? (
          <div className="hr-dashboard-card">
            <div className="card-body">
              <span className="dash-widget-icon">
                <i className="las la-users"></i>
              </span>
              <div className="card-info">
                {loading ? <h3>-</h3> : <h3>{headCount}</h3>}
              </div>
            </div>
            <span>Head Count</span>
          </div>
        ) : null}

        {!hideGenderDivRatioCard && AuthorizedHrManagerRoles ? (
          <div className="hr-dashboard-card">
            <div className="card-body">
              <span className="dash-widget-icon">
                <i
                  className="las la-restroom"
                  style={{ transform: "scaleX(-1)" }}
                ></i>
              </span>
              <div className="card-info">
                {loading ? <h3>-</h3> : <h3> {genderRatio} </h3>}
              </div>
            </div>
            <span>Gender Diversity Ratio (Females to Males)</span>
          </div>
        ) : null}
      </div>

      <div className="row">
        <DashboardChart
          title="Employee By Office"
          employeeData={employeeData}
          employeeLabel={employeeLabel}
          genderLabel={genderLabel}
          genderData={genderData}
          leaveStatusLabel={leaveStatusLabel}
          leaveStatusData={leaveStatusData}
          leaveTypeLabel={leaveTypeLabel}
          leaveTypeData={leaveTypeData}
          formattedLeaveType={formattedLeaveType}
          formattedLeaveStatus={formattedLeaveStatus}
          resignationByGenderLabel={resignationByGenderLabel}
          resignationByGenderData={resignationByGenderData}
          resignationStatusLabel={resignationStatusLabel}
          resignationStatusData={resignationStatusData}
          resignationReasonLabel={resignationReasonLabel}
          resignationReasonData={resignationReasonData}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          fromDate2={fromDate2}
          toDate2={toDate2}
          setFromDate2={setFromDate2}
          setToDate2={setToDate2}
        />
      </div>
    </div>
  );
};

export default HRDashboard;
