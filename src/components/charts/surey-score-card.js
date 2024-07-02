import React from "react";
import LeaveVerticalBar from "./leaveVerticalBar";

const SurveyScoreCard = ({ surveyLabel, surveyData }) => {
  const surveyScores = {
    labels: surveyLabel,
    datasets: [
      {
        data: surveyData,
        backgroundColor: [
          "rgba(55, 159, 64)",
          "rgba(75, 192, 192)",
          "rgba(255, 206, 86)",
          // "rgba(255, 159, 64)",
          "rgba(205, 19, 84)",
        ],
        borderColor: [
          "rgba(55, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          // "rgba(255, 159, 64, 1)",
          "rgba(205, 19, 84, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill hr-dashboard-charts">
          <div className="leave-card-body">
            <h3 className="card-title">Survey Scores</h3>

            <LeaveVerticalBar data={surveyScores} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyScoreCard;
