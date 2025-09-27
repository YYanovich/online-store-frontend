import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createType } from "../../store/deviceSlice";
import type { AppDispatch } from "../../store";
import type { ModalProps } from "../../types/props";

const CreateDeviceTypeModal = ({ show, onHide }: ModalProps) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const addDeviceType = () => {
    if (!value.trim()) {
      return alert("Type name cannot be empty");
    }
    dispatch(createType({ name: value }));
    setValue("");
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Enter name of type"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDeviceType}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDeviceTypeModal;
