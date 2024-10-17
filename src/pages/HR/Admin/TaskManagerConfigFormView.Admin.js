import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";

const ViewTaskManagementConfigForm = () => {
  const [configData, setConfigData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCards, setOpenCards] = useState({});

  const { configId } = useParams();

  // Fetch data from the API
  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/office_task_configs/${configId}/tasks`);
        const data = response.data.data; // Get the response data
        setConfigData(data); // Assuming data contains the actor-task mapping directly
        // Initialize open cards as closed for each actor
        setOpenCards(Object.keys(data).reduce((acc, actor) => ({ ...acc, [actor]: false }), {}));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch task configuration data.");
        setLoading(false);
      }
    };

    fetchConfigData();
  }, [configId]);

  // Toggle the card view for each actor
  const toggleCard = (actor) => {
    setOpenCards((prevOpenCards) => ({
      ...prevOpenCards,
      [actor]: !prevOpenCards[actor],
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="viewconfig-page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="viewconfig-page-title">Task Configuration</h3>
          </div>
        </div>
      </div>

      {Object.keys(configData).length > 0 ? (
        <div className="viewconfig-container">
          <Link className="row align-items-right justify-content-end w-100 cursor-pointer" to={"/dashboard/operations/operation-team-task-management/edit/" + configId}>Edit</Link>
          <h2 className="viewconfig-subtitle">Configurations</h2>

          {Object.keys(configData).map((actor, index) => (
            <div
              key={index}
              className="viewconfig-card"
              onClick={() => toggleCard(actor)}
            >
              <p className="viewconfig-card-header">
                <span>Actor: {actor}</span>
                <span>{openCards[actor] ? "▲" : "▼"}</span>
              </p>

              {openCards[actor] && (
                <ul className="viewconfig-task-list">
                  {configData[actor].map((task, taskIndex) => (
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
      ) : (
        <p>No configuration data available.</p>
      )}
    </>
  );
};

export default ViewTaskManagementConfigForm;
