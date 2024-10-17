import React, { useState, useEffect } from "react";
import Select from "react-select";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { useParams, Link } from "react-router-dom";

const EditTaskManagementConfigForm = () => {
    const { showAlert, selectDepartments, selectCampaigns, selectTeams } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [configData, setConfigData] = useState({});
    const [title, setTitle] = useState("");
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [officeType, setOfficeType] = useState(null);
    const [openCards, setOpenCards] = useState({});
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const { configId } = useParams();

    useEffect(() => {
        const fetchConfigData = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/office_task_configs/${configId}/tasks`);
                const data = response.data.data; // Fetch actor-task mapping
                setConfigData(data);
                setTitle(response.data.title); // Assuming the title is available in the response
                setOfficeType(response.data.office_type);
                setSelectedOffice(response.data.office_id);
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

    const handleTaskChange = (actor, index, field, value) => {
        setConfigData((prevData) => ({
            ...prevData,
            [actor]: prevData[actor].map((task, i) =>
                i === index ? { ...task, [field]: value } : task
            ),
        }));
    };

    const handleTaskDelete = (actor, index) => {
        setConfigData((prevData) => ({
            ...prevData,
            [actor]: prevData[actor].filter((_, i) => i !== index),
        }));
    };

    const handleAddTask = (actor) => {
        setConfigData((prevData) => ({
            ...prevData,
            [actor]: [...prevData[actor], { title: "", report_time: "", leaves_note: false }],
        }));
    };

    const handleSubmit = async () => {
        const isValid = validateForm();
        if (!isValid) return;

        const payload = Object.keys(configData).map((actor) => ({
            actor: actor,
            tasks: configData[actor].map((task) => ({
                title: task.title,
                report_time: task.report_time,
                leaves_note: task.leaves_note,
            })),
        }));

        try {
            setLoading(true);
            await axiosInstance.put(`/api/v1/office_task_configs/${configId}`, {
                title,
                office_id: selectedOffice,
                office_type: officeType.toLowerCase(),
                config_data: payload,
            });
            showAlert(true, "Task configuration updated successfully", "alert alert-success");
        } catch (error) {
            showAlert(true, "Error updating configuration", "alert alert-danger");
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!title) errors.title = "Title is required.";
        if (!selectedOffice) errors.office = "Office selection is required.";
        if (Object.keys(configData).some((actor) => configData[actor].length === 0)) {
            errors.tasks = "Each actor must have at least one task.";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">Edit Task Configuration</h3>
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
                {validationErrors.title && <small className="text-danger">{validationErrors.title}</small>}
            </div>

            {/* Select Office and Office Type */}
            <div className="row px-3">
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Office Type</label>
                        <Select
                            options={[
                                { label: "Department", value: "department" },
                                { label: "Campaign", value: "campaign" },
                                { label: "Team", value: "team" },
                            ]}
                            value={officeType ? { label: officeType, value: officeType } : null}
                            onChange={(e) => setOfficeType(e.value)}
                        />
                        {validationErrors.office && <small className="text-danger">{validationErrors.office}</small>}
                    </div>
                </div>

                {officeType && (
                    <div className="col-md-4">
                        <label>{officeType}</label>
                        <Select
                            options={
                                officeType === "Department" ? selectDepartments :
                                    officeType === "Campaign" ? selectCampaigns :
                                        selectTeams
                            }
                            isSearchable={true}
                            value={selectedOffice}
                            onChange={(e) => setSelectedOffice(e.value)}
                        />
                    </div>
                )}
            </div>

            {/* Task Configurations by Actor */}
            <div className="viewconfig-container">
                {Object.keys(configData).map((actor, index) => (
                    <div key={index} className="viewconfig-card">
                        <p className="viewconfig-card-header" onClick={() => toggleCard(actor)}>
                            <span>Actor: {actor}</span>
                            <span>{openCards[actor] ? "▲" : "▼"}</span>
                        </p>

                        {openCards[actor] && (
                            <div>
                                <ul className="viewconfig-task-list">
                                    {configData[actor].map((task, taskIndex) => (
                                        <li key={taskIndex} className="viewconfig-task-item">
                                            <label>Task Title</label>
                                            <input
                                                type="text"
                                                value={task.title}
                                                onChange={(e) =>
                                                    handleTaskChange(actor, taskIndex, "title", e.target.value)
                                                }
                                                className="form-control mb-2"
                                            />

                                            <label>Report Time</label>
                                            <Select
                                                options={[
                                                    { label: "Daily", value: "daily" },
                                                    { label: "Weekly", value: "weekly" },
                                                    { label: "Monthly", value: "monthly" },
                                                ]}
                                                value={{ label: task.report_time, value: task.report_time }}
                                                onChange={(e) => handleTaskChange(actor, taskIndex, "report_time", e.value)}
                                                className="mb-2"
                                            />

                                            <label>Leaves Note</label>
                                            <input
                                                type="checkbox"
                                                checked={task.leaves_note}
                                                onChange={(e) =>
                                                    handleTaskChange(actor, taskIndex, "leaves_note", e.target.checked)
                                                }
                                            />

                                            <button
                                                className="delete_form_builder_field"
                                                onClick={() => handleTaskDelete(actor, taskIndex)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <button className="btn btn-secondary mt-3" onClick={() => handleAddTask(actor)}>
                                    Add Task
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Validation Error for Tasks */}
            {validationErrors.tasks && <small className="text-danger">{validationErrors.tasks}</small>}

            {/* Submit Button */}
            <div className="px-3">
                <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                    Save Config
                </button>
            </div>
        </>
    );
};

export default EditTaskManagementConfigForm;
