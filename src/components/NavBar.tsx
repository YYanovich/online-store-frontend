import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ADMIN_ROUTE,
  DEVICE_ROUTE,
} from "../utils/consts";
import { logout } from "../store/userSlice";

const NavBar = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(SHOP_ROUTE, { replace: true });
  };

  return (
    <Navbar
      bg={isAuth ? "dark" : "light"}
      data-bs-theme={isAuth ? "dark" : "light"}
    >
      <Container>
        <Navbar.Brand as={Link} to={SHOP_ROUTE} style={{ color: "red" }}>
          FutureLogo
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to={SHOP_ROUTE}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={DEVICE_ROUTE}>
            See all
          </Nav.Link>
        </Nav>

        {isAuth ? (
          <div className="d-flex gap-2">
            <Link
              to={ADMIN_ROUTE}
              className="btn btn-success"
              style={{ border: "none" }}
            >
              Admin Panel
            </Link>
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <Link
              to={LOGIN_ROUTE}
              className="btn btn-success"
              style={{ border: "none" }}
            >
              Login
            </Link>
            <Link to={REGISTRATION_ROUTE} className="btn btn-primary">
              Registration
            </Link>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
