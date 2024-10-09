import React, { useState } from "react";
import Select from "react-select";
import TaskAssignmentModal from "../../../components/Modal/TaskAssignmentModal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { officeTypeOptions } from "../../../components/FormJSON/AddLoan";




const TaskManagementConfigForm = () => {
    const {
        selectDepartments,
        selectCampaigns,
        selectTeams,
        showAlert,
        loadingSelect,
        ErrorHandler
    } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [tasksByUser, setTasksByUser] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [officeType, setOfficeType] = useState(null);


    // Dummy user data
    const dummyUsers = [
        { label: "Team Lead", value: "team_lead" },
        { label: "Supervisor", value: "supervisor" },
        { label: "COO", value: "coo" },
    ];

    // Open modal to assign/edit tasks for a selected user
    const openModal = (user, task = null) => {
        setSelectedUser(user);
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };
    // Handle office type change (e.g., "Department", "Campaign")
    const handleOfficeTypeChange = (e) => {
        setOfficeType(e.label);
        setIsOfficeTypeSelected(true);
        setSelectedOffice(null); // Reset office selection on type change
    };

    // Handle office selection based on the selected office type
    const handleOfficeChange = (e) => {
        setSelectedOffice(e); // Set selected office
    };

    const resetForm = () => {
        setSelectedUser(null);
        setTitle("");
        setSelectedUsers([]);
        setTasksByUser({});
        setCurrentTask(null);
        setIsModalOpen(false);
    }
    // Add or edit task for the selected user
    const handleAddTask = (userId, newTask) => {
        setTasksByUser((prevTasks) => ({
            ...prevTasks,
            [userId]: currentTask
                ? prevTasks[userId].map((task) =>
                    task === currentTask ? newTask : task
                )
                : [...(prevTasks[userId] || []), newTask],
        }));
        closeModal();
    };

    const handleDeleteTask = (userId, taskToDelete) => {
        setTasksByUser((prevTasks) => ({
            ...prevTasks,
            [userId]: prevTasks[userId].filter((task) => task !== taskToDelete), // Remove the task
        }));
    };

    // Function to handle submitting the task configuration
    const handleSubmitTaskConfig = async () => {

        const configData = Object.keys(tasksByUser).map((userId) => ({
            actor: userId,
            tasks: tasksByUser[userId].map((task) => ({
                report_time: task.reportTime,
                leaves_note: task.leaveNote,
                title: task.title,
            })),
        }));

        const payload = {
            payload: {
                config: {
                    title,
                    office_id: selectedOffice.value,
                    office_type: officeType.toLowerCase(),
                    config_data: configData,
                }
            }

        };

        console.log(payload)
        try {
            setLoading(true);
            const response = await axiosInstance.post(`/api/v1/office_task_configs`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            showAlert(
                true,
                `${response.data.message}`,
                "alert alert-success"
            );
        } catch (error) {
            console.error("Error submitting configuration", error);
            showAlert(true, error?.response?.data?.errors, "alert alert-warning");
        } finally {
            setLoading(false);
        }
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


            <div className="row px-3">
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Office Type</label>
                        <Select
                            options={officeTypeOptions}
                            value={officeType ? { label: officeType, value: officeType } : null}
                            onChange={handleOfficeTypeChange}
                        />
                    </div>
                </div>

                {isOfficeTypeSelected && (
                    <div className="col-md-4">
                        <label>{officeType}</label>
                        <Select
                            options={
                                officeType === "Department"
                                    ? selectDepartments
                                    : officeType === "Campaign"
                                        ? selectCampaigns
                                        : selectTeams
                            }
                            isSearchable={true}
                            value={selectedOffice}
                            onChange={handleOfficeChange}
                        />
                    </div>
                )}
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
                                                        <div><strong>Report Time:</strong> {task.reportTime}</div>
                                                        <div><strong>Leave Note:</strong> {task.leaveNote ? "Yes" : "No"}</div>
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
