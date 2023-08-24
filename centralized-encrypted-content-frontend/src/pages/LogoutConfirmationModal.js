import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogoutConfirmationModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutConfirmationModal;
