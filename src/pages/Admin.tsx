import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, ListGroup, Spinner } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import type { RootState, AppDispatch } from "../store";
import {
  fetchTypesStart,
  fetchTypesSuccess,
  fetchTypesError,
} from "../store/deviceSlice";

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const { types, loading, error } = useSelector(
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

  return (
    <Container className="d-flex flex-column mt-3">
      <h1>Адмін-панель</h1>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Додати тип
      </Button>
      <Button variant={"outline-dark"} className="mt-2 p-2">
        Додати бренд
      </Button>
      <Button variant={"outline-dark"} className="mt-2 p-2">
        Додати девайс
      </Button>

      <hr />
      <h3>Список типів:</h3>
      {loading && <Spinner animation="border" />}
      {error && <p style={{ color: "red" }}>Помилка: {error}</p>}
      {!loading && !error && (
        <ListGroup>
          {types.map((type) => (
            <ListGroup.Item key={type.id}>{type.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  );
};
export default Admin;
