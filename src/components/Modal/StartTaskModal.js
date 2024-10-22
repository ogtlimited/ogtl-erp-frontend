import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';

const StartTaskModal = ({ show, handleClose, startTask }) => {
    const dummyUsers = [
        { label: "Team Lead", value: 'Team Lead' },
        { label: "Supervisor", value: "Supervisor" },
        { label: "Operations Manager", value: "Operations Manager" },
        { label: "COO", value: "Chief Operations Officer" },
        { label: "CEO", value: "Chief Executive Officer" },
    ];

    const [selectedActor, setSelectedActor] = useState(null);

    const handleStartTask = () => {
        if (selectedActor) {
            startTask(selectedActor.value); // Pass the selected actor back
            handleClose(); // Close the modal
        } else {
            alert("Please select an actor before starting the task.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Select Actor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Select
                    options={dummyUsers}
                    value={selectedActor}
                    onChange={setSelectedActor}
                    placeholder="Select an actor"
                    isMulti
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleStartTask}>
                    Start Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StartTaskModal;
