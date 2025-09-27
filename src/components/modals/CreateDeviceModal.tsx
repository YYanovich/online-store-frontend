import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { createDevice } from "../../store/deviceSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import type { ModalProps } from "../../types/props";

const initialFormState = {
  name: "",
  price: 0,
  rating: 0,
  file: null as File | null,
  brandId: null as number | null,
  typeId: null as number | null,
};

const CreateDeviceModal = ({ show, onHide }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { types, brands } = useSelector((state: RootState) => state.device);

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (!show) {
      setForm(initialFormState);
    }
  }, [show]);

  const textAndNumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? Number(value) : value,
    }));
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", `${form.price}`);
    formData.append("rating", `${form.rating}`);
    if (form.file) formData.append("img", form.file);
    if (form.brandId) formData.append("brandId", `${form.brandId}`);
    if (form.typeId) formData.append("typeId", `${form.typeId}`);
    dispatch(createDevice(formData));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2">
            <Dropdown.Toggle>
              {types.find((type) => type.id === form.typeId)?.name ||
                "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, typeId: type.id }))
                  }
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mt-2">
            <Dropdown.Toggle>
              {brands.find((brand) => brand.id === form.brandId)?.name ||
                "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, brandId: brand.id }))
                  }
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            value={form.name}
            onChange={textAndNumHandler}
            name="name"
            placeholder="Enter device name"
          />
          <Form.Control
            className="mt-3"
            value={form.price || ""}
            onChange={textAndNumHandler}
            placeholder="Enter device price"
            name="price"
            type="number"
          />
          <Form.Control
            className="mt-3"
            value={form.rating || ""}
            onChange={textAndNumHandler}
            name="rating"
            placeholder="Enter device rating"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={fileHandler} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDeviceModal;
