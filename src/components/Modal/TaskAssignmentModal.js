import React, { useState } from "react";

const TaskAssignmentModal = ({ user, onAddTask, closeModal }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [reportTime, setReportTime] = useState("daily");
    const [leaveNote, setLeaveNote] = useState(false);

    const handleSaveTask = () => {
        const newTask = {
            title: taskTitle,
            reportTime,
            leaveNote,
        };
        onAddTask(user.value, newTask);
    };

    return (
        <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Assign Task to {user.label}</h5>
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
    );
};

export default TaskAssignmentModal;
