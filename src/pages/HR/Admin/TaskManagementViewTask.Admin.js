import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import axiosInstance from "../../../services/api";

const TaskManagementViewTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        const fetchDailyTasks = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/api/v1/employee_daily_task_list");
                const fetchedTasks = response.data.map((task, index) => ({
                    id: index + 1, // Assign a unique ID based on the index
                    taskName: task.task,
                    confirmed: task.completed, // API uses "completed" field
                    notes: task.note || "", // Handle null notes
                }));
                setTasks(fetchedTasks);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            }
        };

        fetchDailyTasks();
    }, []);

    // Handle checkbox toggle
    const handleCheckboxChange = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, confirmed: !task.confirmed } : task
        ));
    };

    // Handle notes change
    const handleNotesChange = (taskId, notes) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, notes } : task
        ));
    };

    // Handle Confirm or Undo button click
    const handleConfirmOrUndo = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, confirmed: !task.confirmed } : task
        ));
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading spinner or text
    }

    return (
        <div>
            <h3 className="page-title">Daily Tasks</h3>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task.id} className="task-item mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.confirmed}
                                    onChange={() => handleCheckboxChange(task.id)}
                                    className="me-2 mr-4"
                                />
                                <span>{task.taskName}</span>
                            </div>
                            <div className="action-buttons">
                                <button
                                    className={`btn btn-sm btn-${task.confirmed ? "danger" : "primary"}`}
                                    onClick={() => handleConfirmOrUndo(task.id)}
                                >
                                    {task.confirmed ? "Undo" : "Confirm"}
                                </button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <textarea
                                className="form-control"
                                placeholder="Add notes here"
                                value={task.notes}
                                onChange={(e) => handleNotesChange(task.id, e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskManagementViewTasks;
