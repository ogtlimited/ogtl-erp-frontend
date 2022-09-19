import React from "react";
import { Doughnut } from "react-chartjs-2";

const AcademyStackStatistics = ({chartData, chartTitle}) => {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "# of Votes",
        data: [6, 4],
        backgroundColor: ["#007bff", "#e83e8c"],
        borderColor: ["#007bff", "#e83e8c"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
     <div className="academy-pieChart">
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

export default AcademyStackStatistics;
