import { useState } from "react";
import { Modal, Button, Form, ModalBody } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createBrand } from "../../store/deviceSlice";
import type { AppDispatch } from "../../store";
import type { ModalProps } from "../../types/props";

const CreateDeviceBrandModal = ({ show, onHide }: ModalProps) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const addDeviceBrand = () => {
    if (!value.trim()) {
      return alert("Brand cannpt be empty");
    }
    dispatch(createBrand({ name: value }));
    setValue("");
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new brand</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Enter name of brand"}
          />
        </Form>
      </ModalBody>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDeviceBrand}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateDeviceBrandModal;
