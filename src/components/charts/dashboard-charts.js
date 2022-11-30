/** @format */

import React from 'react';
import { useNavigate } from "react-router-dom";
import DoughnutChart from './dougnut';
import VerticalBar from './verticalBar';

const DashboardChart = ({
  title,
  employeeData,
  employeeLabel,
  genderLabel,
  genderData,
  formattedData
}) => {
  const navigate = useNavigate();
  const handleChartClick = async (element, employeeLabel) => {
    try {
      if (element.length > 0) {
        const dataIndex = element[0].index;
        const departmentId = formattedData.filter((data) => data.labels === employeeLabel[dataIndex])
        const id = departmentId[0].id;
        const department = departmentId[0].labels;
        localStorage.setItem("department", department);
        navigate(`/dashboard/hr/all-employees/${id}`);
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

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{title}</h3>
              <VerticalBar
                data={employee}
                handleChartClick={(element) =>
                  handleChartClick(element, employeeLabel)
                }
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Employee By Gender</h3>
              <DoughnutChart data={gender} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
