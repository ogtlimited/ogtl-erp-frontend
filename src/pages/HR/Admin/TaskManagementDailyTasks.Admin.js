import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskManagementDailyTasks = () => {
    const [tasks, setTasks] = useState([
        { id: 1, taskName: "Daily standup meeting", confirmed: false, notes: "" },
        { id: 2, taskName: "Code review", confirmed: false, notes: "" },
        { id: 3, taskName: "Client meeting", confirmed: false, notes: "" },
    ]);

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

    return (
        <div>
            <h3 className="page-title">Daily Tasks</h3>
            {tasks.map((task) => (
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
                            <Button
                                variant={task.confirmed ? "danger" : "success"}
                                className="me-2"
                                onClick={() => handleConfirmOrUndo(task.id)}
                            >
                                {task.confirmed ? "Undo" : "Confirm"}
                            </Button>
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
            ))}
        </div>
    );
};

export default TaskManagementDailyTasks;
