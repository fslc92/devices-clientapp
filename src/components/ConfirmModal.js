import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default ({
  show,
  title,
  submitButtonText,
  submitButtonVariant,
  handleClose,
  handleSubmit,
  children,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant={submitButtonVariant} onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
