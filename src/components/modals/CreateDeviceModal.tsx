import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { createDevice } from "../../store/deviceSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import type { ModalProps } from "../../types/props";

const initialFormState = {
  name: "",
  price: 0,
  file: null as File | null,
  brandId: null as number | null,
  typeId: null as number | null,
  info: "",
  rating: 0,
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

  const handleFormChange = (key: keyof typeof initialFormState, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addDevice = () => {
    if (
      !form.name ||
      !form.price ||
      !form.brandId ||
      !form.typeId ||
      !form.file
    ) {
      return alert("Please fill all required fields and choose an image.");
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", `${form.price}`);
    formData.append("brandId", `${form.brandId}`);
    formData.append("typeId", `${form.typeId}`);
    formData.append("img", form.file);
    if (form.rating) formData.append("rating", `${form.rating}`);
    if (form.info) formData.append("info", form.info);

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
              {brands.find((b) => b.id === form.brandId)?.name ||
                "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => handleFormChange("brandId", brand.id)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2">
            <Dropdown.Toggle>
              {types.find((t) => t.id === form.typeId)?.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => handleFormChange("typeId", type.id)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Поля вводу */}
          <Form.Control
            className="mt-3"
            value={form.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            placeholder="Enter device name"
          />
          <Form.Control
            className="mt-3"
            value={form.price || ""}
            onChange={(e) => handleFormChange("price", Number(e.target.value))}
            placeholder="Enter device price"
            type="number"
          />
          <Form.Control
            className="mt-3"
            value={form.rating || ""}
            onChange={(e) => handleFormChange("rating", Number(e.target.value))}
            placeholder="Enter device rating"
            type="number"
          />
          <Form.Control
            className="mt-3"
            value={form.info || ""}
            onChange={(e) => handleFormChange("info", e.target.value)}
            placeholder="Enter device info"
            as="textarea"
            rows={3}
          />
          <Form.Control
            className="mt-3"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(
                "file",
                e.target.files ? e.target.files[0] : null
              )
            }
          />
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
