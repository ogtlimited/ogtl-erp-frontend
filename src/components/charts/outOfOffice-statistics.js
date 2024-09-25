import React from "react";
// import { useNavigate } from "react-router-dom";
import LeaveVerticalBar from "./leaveVerticalBar";

const OutOfOfficeStatistics = ({
  outOfOfficeLabel,
  outOfOfficeData,
}) => {
  // const navigate = useNavigate();

  const resignationStatus = {
    labels: outOfOfficeLabel,
    datasets: [
      {
        data: outOfOfficeData,
        backgroundColor: [
          "rgba(255, 159, 64)",
          "rgba(54, 162, 235)",
          "rgba(55, 159, 64)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(55, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // const handleResignationStatusChartClick = (element, outOfOfficeLabel) => {
  //   try {
  //     if (element.length > 0) {
  //       const dataIndex = element[0].index;
  //       const resignationStatus = outOfOfficeLabel;
  //       const id = resignationStatus[dataIndex];
  //       navigate(`/dashboard/hr/resignation/application/resignation-status/${id}`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill hr-dashboard-charts">
          <div className="leave-card-body">
            <h3 className="card-title">Out of Office</h3>

            <LeaveVerticalBar
              data={resignationStatus}
              // handleChartClick={(element) =>
              //   handleResignationStatusChartClick(element, outOfOfficeLabel)
              // }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OutOfOfficeStatistics;
