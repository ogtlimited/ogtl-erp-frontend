import React, { useState } from "react";
import Select from "react-select";
import TaskAssignmentModal from "../../../components/Modal/TaskAssignmentModal";

const TaskManagementConfigForm = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(""); // Configuration title
    const [tasksByUser, setTasksByUser] = useState({}); // Tasks mapped to users
    const [selectedUser, setSelectedUser] = useState(null); // Currently selected user
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [selectedUsers, setSelectedUsers] = useState([]); // Store selected users
    const [currentTask, setCurrentTask] = useState(null); // For editing a task

    // Dummy user data
    const dummyUsers = [
        { label: "Team Lead", value: "user_1" },
        { label: "Supervisor", value: "user_2" },
        { label: "Manager", value: "user_3" },
        { label: "Operations Director", value: "user_4" },
        { label: "COO", value: "user_5" },
        { label: "CEO", value: "user_6" },

    ];

    // Open modal to assign/edit tasks for a selected user
    const openModal = (user, task = null) => {
        setSelectedUser(user);
        setCurrentTask(task); // If editing a task, set it as the current task
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null); // Reset task after closing modal
    };

    // Add or edit task for the selected user

    // Function to handle task deletion for a specific user
    const handleDeleteTask = (userId, taskToDelete) => {
        setTasksByUser((prevTasks) => ({
            ...prevTasks,
            [userId]: prevTasks[userId].filter((task) => task !== taskToDelete), // Remove the task
        }));
    };

    const handleAddTask = (userId, newTask) => {
        setTasksByUser((prevTasks) => ({
            ...prevTasks,
            [userId]: currentTask
                ? prevTasks[userId].map((task) =>
                    task === currentTask ? newTask : task
                ) // Edit existing task
                : [...(prevTasks[userId] || []), newTask], // Add new task
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
            setSelectedUsers([]);
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
            <div className="form-group col-md-6">
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

            {/* Multi-Select Dropdown to Select Users */}
            <div className="form-group col-md-6">
                <label>Select Actors</label>
                <Select
                    isMulti
                    options={dummyUsers}
                    value={selectedUsers}
                    onChange={setSelectedUsers}
                    placeholder="Select Actors..."
                />
            </div>

            {/* Button to Assign Tasks to Each Selected User */}
            {selectedUsers.length > 0 && (
                <div className="mb-3 col-md-12">
                    {selectedUsers.map((selectedUserOption) => {
                        const userId = selectedUserOption.value;
                        const user = dummyUsers.find((user) => user.value === userId);
                        return (
                            <div key={userId} className="card mb-3">
                                <div className="card-header">
                                    <h4 className="mb-0">Tasks for {user.label}:</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {(tasksByUser[userId] || []).map((task, index) => (
                                            <li key={index} className="list-group-item">
                                                <div>
                                                    <div>
                                                        <strong>Task Title:</strong> {task.title}
                                                    </div>

                                                    <div className="pt-3">
                                                        <div> <strong className="">Report
                                                            Time:</strong> {task.reportTime} </div>
                                                        <div><strong>Leave Note:</strong>{" "}
                                                            {task.leaveNote ? "Yes" : "No"}
                                                        </div>

                                                    </div>

                                                    <button
                                                        className="edit_form_builder_field"
                                                        onClick={() => openModal(user, task)}
                                                    >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="delete_form_builder_field"
                                                        onClick={() => handleDeleteTask(userId, task)}

                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>

                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className="btn btn-secondary mt-3"
                                        onClick={() => openModal(user)}
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Submit Button */}
            <div className="px-3">
                <button
                    className="btn btn-primary col-md-4"
                    disabled={loading}
                    onClick={handleSubmitTaskConfig}
                >
                    {loading ? "Saving..." : "Submit Task Configuration"}
                </button>
            </div>


            {/* Modal for Task Assignment */}
            {isModalOpen && selectedUser && (
                <TaskAssignmentModal
                    user={selectedUser}
                    task={currentTask} // Pass the current task for editing
                    onAddTask={handleAddTask}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default TaskManagementConfigForm;
