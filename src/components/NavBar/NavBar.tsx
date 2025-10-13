import { useSelector, useDispatch } from "react-redux";
import "./NavBar.scss";
import type { RootState, AppDispatch } from "../../store";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Basket from "../Basket/Basket";
import Switch from "../SwitchComponent/Switch";
import Logo from "../../assets/logo_bg_removed.png";
import {
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ADMIN_ROUTE,
  DEVICE_ROUTE,
  BASKET_ROUTE,
} from "../../utils/consts";
import { logout } from "../../store/userSlice";

const NavBar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(SHOP_ROUTE, { replace: true });
  };

  return (
    <Navbar className="my-navbar navbar-light navbar-expand-sm">
      <Container>
        <Navbar.Brand as={Link} to={SHOP_ROUTE} style={{ color: "red" }}>
          <img src={Logo} style={{ width: 130, height: 130 }} />
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to={SHOP_ROUTE}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={DEVICE_ROUTE}>
            See all
          </Nav.Link>
        </Nav>
        {user?.role === "ADMIN" ? (
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
        ) : user?.role === "USER" ? (
          <div className="d-flex gap-2">
            <Link to={BASKET_ROUTE} style={{ border: "none" }}>
              <Basket />
            </Link>
            <Link
              to={SHOP_ROUTE}
              className="btn btn-success"
              style={{ border: "none" }}
            >
              Profile
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
        <Switch className="ms-1" />
      </Container>
    </Navbar>
  );
};

export default NavBar;
