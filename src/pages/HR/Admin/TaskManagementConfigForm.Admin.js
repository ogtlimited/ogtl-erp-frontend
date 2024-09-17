import React, { useState } from "react";
import TaskAssignmentModal from "../../../components/Modal/TaskAssignmentModal";
// import TaskAssignmentModal from "./TaskAssignmentModal";

const TaskManagementConfigForm = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(""); // Configuration title
    const [tasksByUser, setTasksByUser] = useState({}); // Tasks mapped to users
    const [selectedUser, setSelectedUser] = useState(null); // Currently selected user
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    // Dummy user data
    const dummyUsers = [
        { label: "John Doe", value: "user_1" },
        { label: "Jane Smith", value: "user_2" },
        { label: "Michael Brown", value: "user_3" },
    ];

    // Open modal to assign tasks to a selected user
    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Add task for the selected user
    const handleAddTask = (userId, newTask) => {
        setTasksByUser((prevTasks) => ({
            ...prevTasks,
            [userId]: [...(prevTasks[userId] || []), newTask],
        }));
        closeModal();
    };

    // Submit the task configuration (dummy functionality)
    const handleSubmitTaskConfig = () => {
        console.log("Submitting configuration", { title, tasksByUser });
        setLoading(true);

        // Dummy timeout to simulate an API call
        setTimeout(() => {
            alert("Task configuration submitted successfully!");
            setLoading(false);
            setTitle("");
            setTasksByUser({});
        }, 1000);
    };

    return (
        <>
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">Create Task Configuration</h3>
                    </div>
                </div>
            </div>

            {/* Configuration Title Input */}
            <div className="form-group">
                <label htmlFor="title">Config Title</label>
                <input
                    className="form-control"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            {/* User Dropdown to Select and Assign Task */}
            <div className="form-group">
                <label>Select User to Assign Tasks</label>
                <select
                    className="form-control"
                    onChange={(e) => {
                        const selectedUser = dummyUsers.find(
                            (user) => user.value === e.target.value
                        );
                        if (selectedUser) openModal(selectedUser);
                    }}
                >
                    <option value="">-- Select a User --</option>
                    {dummyUsers.map((user) => (
                        <option key={user.value} value={user.value}>
                            {user.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display Tasks Assigned to Each User */}
            {Object.entries(tasksByUser).map(([userId, tasks]) => (
                <div key={userId} className="card mb-3">
                    <div className="card-header">
                        <h4 className="mb-0">
                            Tasks for {dummyUsers.find((user) => user.value === userId)?.label}:
                        </h4>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {tasks.map((task, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>Task Title:</strong> {task.title}, <strong>Report
                                        Time:</strong> {task.reportTime}, <strong>Leave Note:</strong>{" "}
                                    {task.leaveNote ? "Yes" : "No"}
                                </li>
                            ))}
                        </ul>

                        {/* Button to Add More Tasks to this User */}
                        <button
                            className="btn btn-secondary mt-3"
                            onClick={() =>
                                openModal(dummyUsers.find((user) => user.value === userId))
                            }
                        >
                            Add More Tasks
                        </button>
                    </div>
                </div>
            ))}

            {/* Submit Button */}
            <button
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSubmitTaskConfig}
            >
                {loading ? "Saving..." : "Submit Task Configuration"}
            </button>

            {/* Modal for Task Assignment */}
            {isModalOpen && selectedUser && (
                <TaskAssignmentModal
                    user={selectedUser}
                    onAddTask={handleAddTask}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default TaskManagementConfigForm;
