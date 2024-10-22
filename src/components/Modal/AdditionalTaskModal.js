import React, { useState, useEffect } from "react";

const AdditionalTaskModal = ({ user, task, onAddTask, closeModal }) => {
    // Initialize state with existing task values if editing, otherwise use default values
    const [taskTitle, setTaskTitle] = useState(task?.title || "");
    const [leaveNote, setLeaveNote] = useState(task?.leaveNote || false);
    const [date , setDate] = useState()
    // Optional: useEffect to handle task prop changes (if modal is reused for multiple tasks)
    useEffect(() => {
        if (task) {
            setTaskTitle(task.title);
            setLeaveNote(task.leaveNote);
        }
    }, [task]);

    const handleSaveTask = () => {
        const newTask = {
            title: taskTitle,
            date: date,
            leaveNote,
        };
        console.log(newTask)
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
                                <label>Task Date</label>
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                    }}
                                    className="form-control "
                                />
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

export default AdditionalTaskModal;
