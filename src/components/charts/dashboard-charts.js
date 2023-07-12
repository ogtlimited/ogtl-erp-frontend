/** @format */
import React from 'react';
import { useNavigate } from "react-router-dom";
import DoughnutChart from './dougnut';
import VerticalBar from './verticalBar';
import DashboardStatistics from './dashboard-statistics';
import  secureLocalStorage  from  "react-secure-storage";

const DashboardChart = ({
  title,
  employeeData,
  employeeLabel,
  genderLabel,
  genderData,
  formattedData,
  formattedGender,

  
  data,
  chartTitle,
  chartData,
  leaveStatusLabel,
  leaveStatusData,
  leaveTypeLabel,
  leaveTypeData,
  formattedLeaveType,
  formattedLeaveStatus,

  fromDate,
  toDate,
  setFromDate,
  setToDate,
  fromDate2,
  toDate2,
  setFromDate2,
  setToDate2,
}) => {
  const navigate = useNavigate();
  
  const handleDepartmentChartClick = async (element, employeeLabel) => {
    try {
      if (element.length > 0) {
        const dataIndex = element[0].index;
        const departmentId = formattedData.filter((data) => data.labels === employeeLabel[dataIndex])
        const id = departmentId[0].id;
        const department = departmentId[0].labels;
        secureLocalStorage.setItem("department", department);
        secureLocalStorage.removeItem("gender");
        navigate(`/dashboard/hr/all-employees/department/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenderChartClick = async (element, genderLabel) => {
    try {
      if (element.length > 0) {
        const dataIndex = element[0].index;
        const genderId = formattedGender.filter((data) => data.labels === genderLabel[dataIndex])
        const id = genderId[0].labels;
        const gender = genderId[0];
        secureLocalStorage.setItem("gender", JSON.stringify(gender));
        secureLocalStorage.removeItem("department");
        navigate(`/dashboard/hr/all-employees/gender/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const employee = {
    labels: employeeLabel,
    datasets: [
      {
        data: employeeData,
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(205, 19, 84)',
          'rgba(55, 159, 64)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(205, 19, 84, 1)',
          'rgba(55, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const gender = {
    labels: genderLabel,
    datasets: [
      {
        data: genderData,
        backgroundColor: [
          'rgba(54, 162, 235)',
          'rgba(255, 99, 132)',
          'rgba(255, 206, 86)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="col-md-12">
        <div className="col">
          <div className="col-md-12 text-center">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <VerticalBar
                  data={employee}
                  handleChartClick={(element) =>
                    handleDepartmentChartClick(element, employeeLabel)
                  }
                />
              </div>
            </div>
          </div>

          <div className="row"> 
            <div className="col-md-4 text-center">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Employee By Gender</h3>
                  <DoughnutChart data={gender} 
                    handleChartClick={(element) =>
                      handleGenderChartClick(element, genderLabel)
                    }
                  />
                </div>
              </div>
            </div>

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
          </div>


        </div>
      </div>
    </>
  );
};

export default DashboardChart;
