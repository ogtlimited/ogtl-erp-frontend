import React from "react";
import { Doughnut } from "react-chartjs-2";

const AcademyStatistics2 = ({stats, chartData, chartTitle}) => {
  const data1 = {
    labels: ["Interested Position 1", "Interested Position 2"],
    datasets: [
      {
        label: "# of Votes",
        data: [170000, 130000],
        backgroundColor: ["#dc3545", "#17a2b8"],
        borderColor: ["#dc3545", "#17a2b8"],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["Highest Qualification Attained 1", "Highest Qualification Attained 2"],
    datasets: [
      {
        label: "# of Votes",
        data: [110000, 20000],
        backgroundColor: ["#fd7e14", "#28a745"],
        borderColor: ["#fd7e14", "#28a745"],
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels: ["Favorite Programing Languages 1", "Favorite Programing Languages 2"],
    datasets: [
      {
        label: "# of Votes",
        data: [180000, 120000],
        backgroundColor: ["#6610f2", "#e83e8c"],
        borderColor: ["#6610f2", "#e83e8c"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
     <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Interested Position</h4>
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
            <h4 className="card-title">Favorite Programing Languages</h4>
            <Doughnut data={data3} />
          </div>
        </div>
      </div>
     
    </>
  );
};

export default AcademyStatistics2;
