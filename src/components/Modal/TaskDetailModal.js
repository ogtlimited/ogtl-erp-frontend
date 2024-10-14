import React from 'react'
import { Modal } from 'react-bootstrap'

function TaskDetailModal({ showModal, setShowModal, selectedTask, dailyTasks }) {
    return (
        <div>  {/* Modal for Task Details */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Daily Tasks for Today</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Created At</th>
                                    <th>Notes</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailyTasks?.map((task, index) => (
                                    <tr key={index}>
                                        <td>{task?.task}</td>
                                        <td>{task?.created_at}</td>
                                        <td>{task?.note || "No notes"}</td>
                                        <td>{task?.completed ? "Completed" : "Pending"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal></div>
    )
}

export default TaskDetailModal