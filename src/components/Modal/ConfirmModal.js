import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({
  title,
  value,
  toggleValue,
  selectedRow,
  deleteFunction,
}) => {
  return (
    <Modal show={value}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleValue}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteFunction(selectedRow);
            toggleValue(false);
          }}
        >
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
