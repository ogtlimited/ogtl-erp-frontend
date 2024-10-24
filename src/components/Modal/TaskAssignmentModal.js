import React, { useState, useEffect } from "react";

const TaskAssignmentModal = ({ user, task, onAddTask, closeModal }) => {
    // Initialize state with existing task values if editing, otherwise use default values
    const [taskTitle, setTaskTitle] = useState(task?.title || "");
    const [reportTime, setReportTime] = useState(task?.reportTime || "daily");
    const [leaveNote, setLeaveNote] = useState(task?.leaveNote || false);

    // Optional: useEffect to handle task prop changes (if modal is reused for multiple tasks)
    useEffect(() => {
        if (task) {
            setTaskTitle(task.title);
            setReportTime(task.reportTime);
            setLeaveNote(task.leaveNote);
        }
    }, [task]);

    const handleSaveTask = () => {
        const newTask = {
            title: taskTitle,
            reportTime,
            leaveNote,
        };
        onAddTask(user.value, newTask); // Pass the new task data to parent
    };

    return (
        <>
            {/* Dark Backdrop */}
            <div className="modal-backdrop fade show"></div>

            {/* Modal Content */}
            <div className="modal show" style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{task ? "Edit" : "Assign"} Task to {user.label}</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Task Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Report Time</label>
                                <select
                                    className="form-control"
                                    value={reportTime}
                                    onChange={(e) => setReportTime(e.target.value)}
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Leave Note</label>
                                <select
                                    className="form-control"
                                    value={leaveNote ? "yes" : "no"}
                                    onChange={(e) => setLeaveNote(e.target.value === "yes")}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleSaveTask}>
                                Save Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskAssignmentModal;
