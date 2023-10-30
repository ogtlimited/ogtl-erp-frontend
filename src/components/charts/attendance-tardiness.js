import React from "react";
import { Bar } from "react-chartjs-2";

function getColor(index) {
  const colors = [
    "rgba(0, 93, 197, 0.8)",
    "rgba(55, 159, 64)",
    "rgba(205, 19, 84)",
    "rgba(255, 159, 64)",
  ];

  return colors[index % colors.length];
}

const AttendanceChart = ({ data }) => {
  const days = Object.keys(data);
  const attributes = ["Has shift", "Present", "Absent", "Late"];

  const chartData = {
    labels: days,
    datasets: attributes.map((attribute, index) => ({
      label: attribute,
      data: days.map((day) => (data[day][attribute] ? 1 : 0)),
      backgroundColor: getColor(index),
    })),
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value % 1 === 0 ? value : "";
          },
        },
      },
    },
  };

  return (
    <div className="custom-table-div d-flex">
      <div className=" flex-fill hr-dashboard-charts ">
        <div className="leave-card-body">
          <h3 className="card-title">Attendance Tardiness</h3>
          <Bar
            height={50}
            data={chartData}
            options={chartOptions}
            className="attendance_tardiness_bar"
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
