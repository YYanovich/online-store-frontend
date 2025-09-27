import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, ListGroup, Spinner } from "react-bootstrap";
import CreateType from "../components/modals/CreateDeviceTypeModal";
import type { RootState, AppDispatch } from "../store";
import { fetchInitialData } from "../store/deviceSlice";
import CreateBrand from "../components/modals/CreateDeiceBrandModal";
import CreateDevice from "../components/modals/CreateDeviceModal";

type ModalType = "type" | "brand" | "device";

const Admin = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const { types, brands, devices, loading, error } = useSelector(
    (state: RootState) => state.device
  );
  const handleHideModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const handleShowTypeModal = useCallback(() => setActiveModal("type"), []);
  const handleShowBrandModal = useCallback(() => setActiveModal("brand"), []);
  const handleShowDeviceModal = useCallback(() => setActiveModal("device"), []);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  return (
    <Container className="d-flex flex-column mt-3">
      <h1>Admin Panel</h1>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={handleShowTypeModal}
      >
        Add type
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2 p-2"
        onClick={handleShowBrandModal}
      >
        Add brand
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2 p-2"
        onClick={handleShowDeviceModal}
      >
        Add device
      </Button>

      <hr />
      <h3>List of types: </h3>
      {loading && <Spinner animation="border" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ListGroup>
          {types.map((type) => (
            <ListGroup.Item key={type.id}>{type.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <hr />
      <h3>List of brands:</h3>
      {!loading && !error && (
        <ListGroup>
          {brands.map((brand) => (
            <ListGroup.Item key={brand.id}>{brand.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <hr />
      <h3>List of devices:</h3>
      {!loading && !error && (
        <ListGroup>
          {devices.map((device) => (
            <ListGroup.Item key={device.id}>{device.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <CreateType show={activeModal === "type"} onHide={handleHideModal} />
      <CreateBrand show={activeModal === "brand"} onHide={handleHideModal} />
      <CreateDevice
        show={activeModal === "device"}
        onHide={handleHideModal}
      ></CreateDevice>
    </Container>
  );
};
export default Admin;
