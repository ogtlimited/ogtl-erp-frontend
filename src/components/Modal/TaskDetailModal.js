import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axiosInstance from '../../services/api';
import { useAppContext } from '../../Context/AppContext';
import { isToday } from 'date-fns';


function TaskDetailModal({ showModal, setShowModal, selectedTask, dailyTasks, fetchData, ogId, loading }) {
    const { user } = useAppContext();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const employeeOgId = user?.employee_info?.ogid;

    const [tasks, setTasks] = useState(
        dailyTasks?.map((task, index) => ({
            id: task.id, // Use the task's actual ID
            taskName: task?.task,
            confirmed: task?.completed, // API uses "completed"
            notes: task?.note || "", // Handle null notes
            taskDate: task?.task_date // Adding task date from the array
        }))
    );

    const closeModal = async () => {
        setShowModal(false);
        fetchData()

    }
    // Function to update the task on the server
    const updateTask = async (taskId, payload) => {
        setConfirmLoading(true)
        try {
            await axiosInstance.patch(`/api/v1/employee_tasks/${taskId}`, { payload });
            console.log("Task updated successfully:", payload);
        } catch (error) {
            console.error("Error updating task:", error);
        }


        setConfirmLoading(false)
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


    };

    // Handle Confirm or Undo button click to toggle task confirmation
    const handleConfirmOrUndo = (taskId) => {
        const updatedTask = tasks.find(task => task.id === taskId);
        const newConfirmedStatus = !updatedTask.confirmed;

        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, confirmed: newConfirmedStatus } : task
        ));

        // Call the API to update the "confirmed" status
        updateTask(taskId, { notes: updatedTask.notes, confirmed: newConfirmedStatus });
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

            {
                loading ? <Modal.Body>

                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                </Modal.Body> :

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
                                                {
                                                    ogId === employeeOgId &&

                                                    <input
                                                        type="checkbox"
                                                        checked={task.confirmed || false} // Use task.completed for checkbox
                                                        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                                        className="me-2 mr-4"
                                                        disabled
                                                    />
                                                }


                                                <span>{task.taskName}</span>
                                            </div>
                                            <div className="task-date">
                                                <small>{task.taskDate}</small>
                                            </div>
                                            <div className="action-buttons">
                                                {
                                                    ogId === employeeOgId && isToday(task.taskDate) && <Button
                                                        className={`btn btn-sm btn-${task.confirmed ? "danger" : "primary"}`}
                                                        onClick={() => handleConfirmOrUndo(task.id)}
                                                        loading={confirmLoading}
                                                    >
                                                        {task.confirmed ? "Undo" : "Confirm"}
                                                    </Button>
                                                }

                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <textarea
                                                className="form-control"
                                                placeholder=""
                                                value={task.notes}
                                                onChange={(e) => handleNotesChange(task.id, e.target.value)}
                                                rows={3}
                                                disabled={!ogId || ogId !== employeeOgId || task.confirmed}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Modal.Body>

            }
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => closeModal()}>
                    Close
                </button>
            </Modal.Footer>


        </Modal>
    );
}

export default TaskDetailModal;
