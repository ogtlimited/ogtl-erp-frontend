import React from "react";
import { Doughnut } from "react-chartjs-2";

const AcademyStackStatistics = ({stats, chartData, chartTitle}) => {
  const data = {
    labels: ["Stack 1", "Stack 2"],
    datasets: [
      {
        label: "# of Votes",
        data: [120000, 190000],
        backgroundColor: ["#6c757d", "#ffc107"],
        borderColor: ["#6c757d", "#ffc107"],
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
