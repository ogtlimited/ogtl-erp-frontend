import React from "react";
import VerticalBar from "./verticalBar";

const AccountDashboardChart = ({title, data}) => {



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
          {/* <div className="col-md-6 text-center">
            <div  className="card">
              <div className="card-body">
                <h3 className="card-title">Employee By Gender</h3>
                <DoughnutChart data={gender} />
              </div>
            </div>
          </div> */}
        </div>
      </div>
   
  );
};

export default AccountDashboardChart;
