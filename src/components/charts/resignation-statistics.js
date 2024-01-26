import React from "react";
// import { useNavigate } from "react-router-dom";
import LeaveVerticalBar from "./leaveVerticalBar";

const ResignationStatistics = ({
  resignationStatusLabel,
  resignationStatusData,
}) => {
  // const navigate = useNavigate();

  const resignationStatus = {
    labels: resignationStatusLabel,
    datasets: [
      {
        data: resignationStatusData,
        backgroundColor: [
          "rgba(255, 159, 64)",
          "rgba(55, 159, 64)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(55, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // const handleLeaveStatusChartClick = (element, leaveStatusLabel) => {
  //   try {
  //     if (element.length > 0) {
  //       const dataIndex = element[0].index;
  //       const leaveStatus = formattedLeaveStatus;
  //       const id = leaveStatus[dataIndex];
  //       navigate(`/dashboard/hr/leaves-admin/application/leave-status/${id}`);
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
            <h3 className="card-title">Resignation Status</h3>

            <LeaveVerticalBar
              data={resignationStatus}
              // handleChartClick={(element) =>
              //   handleLeaveStatusChartClick(element, leaveStatusLabel)
              // }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResignationStatistics;
