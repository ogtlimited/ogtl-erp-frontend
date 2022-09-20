import React from "react";
import { Doughnut } from "react-chartjs-2";

const AcademyStatistics2 = ({stats, chartData1, chartData2, chartData3, chartData4, chartTitle}) => {
  console.log("this chart data", chartData1)

  const data1 = {
    labels: chartData1.keys,
    datasets: [
      {
        label: "# of Votes",
        data: chartData1.values,
        backgroundColor: ["#dc3545", "#17a2b8"],
        borderColor: ["#dc3545", "#17a2b8"],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: chartData2.keys,
    datasets: [
      {
        label: "# of Votes",
        data: chartData2.values,
        backgroundColor: ["#fd7e14", "#28a745"],
        borderColor: ["#fd7e14", "#28a745"],
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels:  chartData3.keys,
    datasets: [
      {
        label: "# of Votes",
        data: chartData3.values,
        backgroundColor: ["#6610f2", "#e83e8c"],
        borderColor: ["#6610f2", "#e83e8c"],
        borderWidth: 1,
      },
    ],
  };
  const data4 = {
    labels: chartData4.keys,
    datasets: [
      {
        label: "# of Votes",
        data:  chartData4.values,
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
