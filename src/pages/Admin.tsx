import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, ListGroup, Spinner } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import type { RootState, AppDispatch } from "../store";
import {
  fetchTypesStart,
  fetchTypesSuccess,
  fetchTypesError,
  fetchBrandStart,
  fetchBrandSuccess,
  fetchBrandError,
  fetchDeviceStart,
  fetchDeviceSuccess,
  fetchDeviceError
} from "../store/deviceSlice";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const { types, brands, devices, loading, error } = useSelector(
    (state: RootState) => state.device
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getTypes = async () => {
      dispatch(fetchTypesStart());
      try {
        const response = await fetch("http://localhost:5002/api/type");
        const data = await response.json();
        if (!response.ok) throw new Error("Error with loading types");
        dispatch(fetchTypesSuccess(data));
      } catch (e: any) {
        dispatch(fetchTypesError(e.message));
      }
    };
    getTypes();
  }, [dispatch]);

  useEffect(() => {
    const getBrands = async () => {
        dispatch(fetchBrandStart())
        try {
            const response = await fetch("http://localhost:5002/api/brand")
            const data = await response.json()
            if(!response.ok) throw new Error("Error with loading brands")
                dispatch(fetchBrandSuccess(data))
        } catch(e: any) {
            dispatch(fetchBrandError(e.message))
        }
    }
    getBrands()
  }, [dispatch])

  useEffect(() => {
    const getDevice = async() => {
        dispatch(fetchDeviceStart())
        try{
            const response = await fetch("http://localhost:5002/api/device")
            const data = await response.json()
            if(!response.ok) throw new Error("Error with loading devices")
                dispatch(fetchDeviceSuccess(data.rows))
        } catch(e: any) {
            dispatch(fetchDeviceError(e.message))
        }
    }
    getDevice()
  }, [dispatch])

  return (
    <Container className="d-flex flex-column mt-3">
      <h1>Admin Panel</h1>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Add type
      </Button>
      <Button variant={"outline-dark"} className="mt-2 p-2" onClick={() => setBrandVisible(true)}>
        Add brand
      </Button>
      <Button variant={"outline-dark"} className="mt-2 p-2" onClick={() => setDeviceVisible(true)}>
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

      <hr/>
      <h3>List of brand:</h3>
      {loading && <Spinner animation="border"/>}
      {error && <p style={{color: "red"}}>Error: {error}</p>}
      {!loading && !error && (
        <ListGroup>
            {brands.map((brand) => (
                <ListGroup.Item key={brand.id}>{brand.name}</ListGroup.Item>
            ))}
        </ListGroup>
      )}

      <hr/>
      <h3>List of Devices</h3>
      {loading && <Spinner animation="border"/>}
      {error && <p style={{color: "red"}}> Error: {error}</p>}
      {!loading && !error && (
        <ListGroup>
            {devices.map((device) => (
                <ListGroup.Item key={device.id}>{device.name}</ListGroup.Item>
            ))}
        </ListGroup>
      )}
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}></CreateDevice>
    </Container>
  );
};
export default Admin;
