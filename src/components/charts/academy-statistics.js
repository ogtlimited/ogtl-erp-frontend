import React from "react";
import { Doughnut } from "react-chartjs-2";

const AcademyStatistics = ({stats, chartData, chartTitle}) => {
  const data = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "# of Votes",
        data: [120000, 190000],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
     <div style={{position: 'absolute', top: '11%', left: '55%', width: '38%'}}>
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">{chartTitle}</h4>
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyStatistics;
