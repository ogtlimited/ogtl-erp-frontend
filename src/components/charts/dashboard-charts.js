import React from "react";
import DoughnutChart from "./dougnut";
import VerticalBar from "./verticalBar";

const DashboardChart = () => {
  return (
   
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">INCOME</h3>

                <VerticalBar />
              </div>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div  className="card">
              <div className="card-body">
                <h3 className="card-title">AGED RECEIVABLES</h3>
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default DashboardChart;
