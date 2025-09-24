import { useState } from "react";
import { Modal, Button, Form, ModalBody } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createBrandSuccess } from "../../store/deviceSlice";
import type { AppDispatch } from "../../store";

const CreateBrand = ({show, onHide}: {show: boolean; onHide: () => void;}) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const addBrand = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: value }),
      });
      const newBrand = await response.json();

      if (!response.ok) {
        throw new Error(newBrand.message || "Error with creating brand");
      }

      dispatch(createBrandSuccess(newBrand));
      setValue("");
      onHide();
    } catch (e: any) {
      alert(e.message);
    }
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
        <Button variant="outline-success" onClick={addBrand}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand
