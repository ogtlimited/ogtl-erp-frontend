import React from "react";
import DoughnutChart from "./dougnut";
import VerticalBar from "./verticalBar";

const DashboardChart = ({title,dougnutTitle, data, dougnutData}) => {
  return (
   
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{title}</h3>

                <VerticalBar data={data} />
              </div>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div  className="card">
              <div className="card-body">
                <h3 className="card-title">{dougnutTitle}</h3>
                <DoughnutChart data={dougnutData} />
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default DashboardChart;
