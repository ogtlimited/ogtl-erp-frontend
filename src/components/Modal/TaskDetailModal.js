import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import axiosInstance from '../../services/api';


function TaskDetailModal({ showModal, setShowModal, selectedTask, dailyTasks }) {
    const [tasks, setTasks] = useState(
        dailyTasks?.map((task, index) => ({
            id: task.id, // Use the task's actual ID
            taskName: task?.task,
            confirmed: task?.completed, // API uses "completed"
            notes: task?.note || "", // Handle null notes
            taskDate: task?.task_date // Adding task date from the array
        }))
    );

    // Function to update the task on the server
    const updateTask = async (taskId, payload) => {
        try {
            await axiosInstance.patch(`/api/v1/employee_tasks/${taskId}`, { payload });
            console.log("Task updated successfully:", payload);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Handle checkbox toggle without immediately confirming (just reflects completion status)
    const handleCheckboxChange = (taskId, completed) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed } : task
        ));

        // Call the API to update the "completed" status
        updateTask(taskId, { complete: completed });
    };

    // Handle notes change and send update to the server when note is changed
    const handleNotesChange = (taskId, notes) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, notes } : task
        ));

        // Call the API to update the notes
        updateTask(taskId, { notes });
    };

    // Handle Confirm or Undo button click to toggle task confirmation
    const handleConfirmOrUndo = (taskId) => {
        const updatedTask = tasks.find(task => task.id === taskId);
        const newConfirmedStatus = !updatedTask.confirmed;

        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, confirmed: newConfirmedStatus } : task
        ));

        // Call the API to update the "confirmed" status
        updateTask(taskId, { complete: newConfirmedStatus });
    };

    useEffect(() => {
        setTasks(
            dailyTasks?.map((task) => ({
                id: task.id, // Use the task's actual ID
                taskName: task?.task,
                confirmed: task?.completed, // API uses "completed"
                notes: task?.note || "", // Handle null notes
                taskDate: task?.task_date // Adding task date from the array
            }))
        );
    }, [dailyTasks]);

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size='lg'>
            <Modal.Header>
                <Modal.Title>Task Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5>Daily Tasks</h5>
                    {tasks.length === 0 ? (
                        <p>No tasks available for this date.</p>
                    ) : (
                        tasks.map((task) => (
                            <div key={task.id} className="task-item mb-3 p-3 border rounded">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={task.completed || false} // Use task.completed for checkbox
                                            onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                            className="me-2 mr-4"
                                        />
                                        <span>{task.taskName}</span>
                                    </div>
                                    <div className="task-date">
                                        <small>{task.taskDate}</small>
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
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskDetailModal;
