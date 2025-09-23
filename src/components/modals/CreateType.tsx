import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createTypeSuccess } from "../../store/deviceSlice";
import type { AppDispatch } from "../../store";

const CreateType = ({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const addType = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: value }),
      });

      const newType = await response.json();

      if (!response.ok) {
        throw new Error(newType.message || "Error with creating type");
      }

      dispatch(createTypeSuccess(newType));

      setValue("");
      onHide();
    } catch (e: any) {
      alert(e.message);
    }
  }
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Додати новий тип</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Введіть назву типу"}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрити
          </Button>
          <Button variant="outline-success" onClick={addType}>
            Додати
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default CreateType;
