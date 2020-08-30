import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default ({
  show,
  title,
  deviceTypes,
  initValues,
  handleClose,
  onSubmit,
}) => {
  const [systemName, setSystemName] = useState("");
  const [type, setType] = useState(deviceTypes[0].key);
  const [capacity, setCapacity] = useState(0);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (initValues) {
      const { system_name, type: initType, hdd_capacity } = initValues || {};
      setSystemName(system_name);
      setType(initType);
      setCapacity(hdd_capacity);
    }
  }, [initValues]);

  const clearValues = () => {
    setSystemName("");
    setType(deviceTypes[0].key);
    setCapacity(0);
    setValidated(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const deviceInfo = {
      systemName,
      type,
      capacity,
    };
    await onSubmit(deviceInfo);
    clearValues();
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>System Name</Form.Label>
            <Form.Control
              type="text"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              {deviceTypes.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>HDD Capcity (GB)</Form.Label>
            <Form.Control
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
