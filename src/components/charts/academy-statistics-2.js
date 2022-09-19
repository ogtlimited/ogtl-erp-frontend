import React from "react";
import { Doughnut } from "react-chartjs-2";

const AcademyStatistics2 = ({stats, chartData, chartTitle}) => {
  const data1 = {
    labels: ["Data Science", "Software Development"],
    datasets: [
      {
        label: "# of Votes",
        data: [2, 8],
        backgroundColor: ["#dc3545", "#17a2b8"],
        borderColor: ["#dc3545", "#17a2b8"],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["Bachelors Degree", "Secondary School Certificate"],
    datasets: [
      {
        label: "# of Votes",
        data: [8, 2],
        backgroundColor: ["#fd7e14", "#28a745"],
        borderColor: ["#fd7e14", "#28a745"],
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels: ["Full Time (M-F)", "Part Time (3 days a week)"],
    datasets: [
      {
        label: "# of Votes",
        data: [7, 3],
        backgroundColor: ["#6610f2", "#e83e8c"],
        borderColor: ["#6610f2", "#e83e8c"],
        borderWidth: 1,
      },
    ],
  };
  const data4 = {
    labels: ["Back-End", "Front-End", "Full-Stack", "Not Applicable"],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 2, 6, 1],
        backgroundColor: ["#28a745", "#ffc107", "#e83e8c", "#002564"],
        borderColor: ["#28a745", "#ffc107", "#e83e8c", "#002564"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
     <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Interested Positions</h4>
            <Doughnut data={data1} />
          </div>
        </div>
      </div>
     <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Highest Qualification Attained</h4>
            <Doughnut data={data2} />
          </div>
        </div>
      </div>
     <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Mode of Engagement</h4>
            <Doughnut data={data3} />
          </div>
        </div>
      </div>
     <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Stack</h4>
            <Doughnut data={data4} />
          </div>
        </div>
      </div>
     
    </>
  );
};

export default AcademyStatistics2;
