import React, { useState } from "react";

const ViewTaskManagementConfigForm = () => {
  const resData = {
    payload: {
      config: {
        title: "Office Task Config Example",
        office_id: "dep_office.id",
        office_type: "department",
        config_data: [
          {
            actor: "coo",
            tasks: [
              {
                report_time: "daily",
                leaves_note: true,
                title: "Daily Report",
              },
              {
                report_time: "weekly",
                leaves_note: false,
                title: "Weekly Overview",
              },
            ],
          },
          {
            actor: "team_lead",
            tasks: [
              {
                report_time: "monthly",
                leaves_note: true,
                title: "Monthly Summary",
              },
            ],
          },
          {
            actor: "supervisor",
            tasks: [
              {
                report_time: "monthly",
                leaves_note: false,
                title: "Quarterly Review",
              },
              {
                report_time: "annual",
                leaves_note: true,
                title: "Annual Report",
              },
            ],
          },
        ],
      },
    },
  };

  const configData = resData?.payload?.config;

  const [openCards, setOpenCards] = useState(
    Array(configData.config_data.length).fill(false) // Initialize all cards as collapsed
  );

  const toggleCard = (index) => {
    setOpenCards((prevOpenCards) =>
      prevOpenCards.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <>
      <div className="viewconfig-page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="viewconfig-page-title">View Task Configuration</h3>
          </div>
        </div>
      </div>

      <div className="viewconfig-container">
        <h3 className="viewconfig-title">{configData.title}</h3>

        <p className="viewconfig-office-info">
          <strong>Office ID:</strong> {configData.office_id}
        </p>
        <p className="viewconfig-office-info">
          <strong>Office Type:</strong> {configData.office_type}
        </p>

        <h2 className="viewconfig-subtitle">Configurations</h2>

        {configData.config_data.map((configItem, index) => (
          <div
            key={index}
            className="viewconfig-card"
            onClick={() => toggleCard(index)} // Click event on the entire card
            
          >
            <p className="viewconfig-card-header">
              <span>Actor: {configItem.actor}</span>
              <span>{openCards[index] ? "▲" : "▼"}</span>
            </p>

            {openCards[index] && (
              <ul className="viewconfig-task-list">
                {configItem.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="viewconfig-task-item">
                    <strong>Title:</strong> {task.title}
                    <br />
                    <strong>Report Time:</strong> {task.report_time}
                    <br />
                    <strong>Leaves Note:</strong> {task.leaves_note ? "Yes" : "No"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewTaskManagementConfigForm;
