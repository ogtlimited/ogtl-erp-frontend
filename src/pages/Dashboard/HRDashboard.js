
import React, { useState, useEffect } from 'react';
import DashboardChart from '../../components/charts/dashboard-charts';
import axiosInstance from '../../services/api';
import moment from 'moment';

const HRDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [employeeLabel, setEmployeeLabel] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [genderLabel, setGenderLabel] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [formattedGender, setFormattedGender] = useState([]);
  const [leaveStatusLabel, setLeaveStatusLabel] = useState([]);
  const [leaveStatusData, setLeaveStatusData] = useState([]);
  const [leaveTypeLabel, setLeaveTypeLabel] = useState([]);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const [formattedLeaveType, setFormattedLeaveType] = useState([]);
  const [formattedLeaveStatus, setFormattedLeaveStatus] = useState([]);

  const [headCount, setheadCount] = useState(0);
  const [genderRatio, setGenderRatio] = useState(0);

  const firstDay = new Date(new Date().getFullYear(), 0, 1, 1);
  const lastDay = new Date(new Date().getFullYear(), 11, 31, 0);

  const [fromDate, setFromDate] = useState(moment(firstDay).format('yyyy-MM-DD'));
  const [toDate, setToDate] = useState(moment(lastDay).format('yyyy-MM-DD'));
  const [fromDate2, setFromDate2] = useState(moment(firstDay).format('yyyy-MM-DD'));
  const [toDate2, setToDate2] = useState(moment(lastDay).format('yyyy-MM-DD'));

  // Head Count: Active
  const fetchHeadCount = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/hr_dashboard/employee_head_count.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.head_count.active;

      const activeEmployeesCount = resData
      setheadCount(activeEmployeesCount);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  // Gender Diversity Ratio (Card) & Employee by Gender (Chart)
  const fetchEmployeeGender = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/hr_dashboard/employee_by_gender.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.record;

      const genderDiversityRatio = resData?.gender_ratio
      setGenderRatio(genderDiversityRatio);

      const employeeByGender = {}
      employeeByGender.male = resData?.male
      employeeByGender.female = resData?.female

      const formattedGender = Object.keys(employeeByGender).map((key) => ({
        labels: key,
        data: employeeByGender[key],
      }));

      const labels = Object.keys(employeeByGender)
      const data = Object.values(employeeByGender)

      setFormattedGender(formattedGender);
      setGenderLabel(labels);
      setGenderData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Employee by Office (Chart)
  const fetchEmployeeData = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/hr_dashboard/employees_by_office.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const offices = response?.data?.data?.employees_by_office

      const formatted = offices.map((e) => ({
        labels: e.split(':')[0],
        data: Number(e.split(':')[1].trim()),
      }));

      const label = [...formatted.map((e) => e.labels)];
      const data = [...formatted.map((e) => e.data)];

      setFormattedData(formatted);
      setEmployeeLabel(label);
      setEmployeeData(data);

      setLoading(false);
    } catch (error) {
      console.log("offices error", error);
      setLoading(false);
    }
  };

  // Leaver Report - Leave types and Leave status (chart)
  const fetchLeaveReport = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/hr_dashboard/leave_report.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const leaveTypes = response?.data?.data?.report?.leave_types
      const leaveTypeLabel = Object.keys(leaveTypes);
      const leaveTypesData = Object.values(leaveTypes);
      setFormattedLeaveType(leaveTypeLabel);
      setLeaveTypeLabel(leaveTypeLabel);
      setLeaveTypeData(leaveTypesData);

      const leaveStatus = response?.data?.data?.report?.status
      const leaveStatusLabel = Object.keys(leaveStatus);
      const leaveStatusData = Object.values(leaveStatus);
      setFormattedLeaveStatus(leaveStatusLabel);
      setLeaveStatusLabel(leaveStatusLabel);
      setLeaveStatusData(leaveStatusData);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadCount();
    fetchEmployeeGender();
    fetchEmployeeData();
    fetchLeaveReport();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome Admin!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hr-dashboard-card-group">
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
        <div className="hr-dashboard-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i
                className="las la-restroom"
                style={{ transform: 'scaleX(-1)' }}
              ></i>
            </span>
            <div className="card-info">
              {loading ? <h3>-</h3> : <h3> {genderRatio} </h3>}
            </div>
          </div>
          <span>Gender Diversity Ratio (Females to Males)</span>
        </div>
      </div>

      <div className="row">
        <DashboardChart
          title="Employee By Department"
          employeeData={employeeData}
          employeeLabel={employeeLabel}
          formattedData={formattedData}

          chartTitle="Employee By Gender"
          genderData={genderData}
          genderLabel={genderLabel}
          formattedGender={formattedGender}

          
          leaveStatusLabel={leaveStatusLabel}
          leaveStatusData={leaveStatusData}
          formattedLeaveStatus={formattedLeaveStatus}
          leaveTypeLabel={leaveTypeLabel}
          leaveTypeData={leaveTypeData}
          formattedLeaveType={formattedLeaveType}

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

      {/* <div className="row">
        <DashboardStatistics
          title="Employee By Department"
          data={data}
          chartTitle="Employee By Gender"
          chartData={gender}
          leaveStatusLabel={leaveStatusLabel}
          leaveStatusData={leaveStatusData}
          leaveTypeLabel={leaveTypeLabel}
          leaveTypeData={leaveTypeData}
          formattedLeaveType={formattedLeaveType}
          formattedLeaveStatus={formattedLeaveStatus}

          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          fromDate2={fromDate2}
          toDate2={toDate2}
          setFromDate2={setFromDate2}
          setToDate2={setToDate2}
        />
      </div> */}
    </div>
  );
};

export default HRDashboard;
