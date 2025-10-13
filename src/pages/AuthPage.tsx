import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Form, Button, Container } from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import type { AppDispatch } from "../store";
import { loginStart, loginSuccess, loginError } from "../store/userSlice";
import "./AuthPage.scss";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickHandler = async () => {
    try {
      dispatch(loginStart());
      let userData;

      if (isLogin) {
        const response = await fetch("http://localhost:5002/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        userData = await response.json();
        if (!response.ok) {
          throw new Error(userData.message || "Login error");
        }
      } else {
        const response = await fetch(
          "http://localhost:5002/api/user/registration",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
        userData = await response.json();
        if (!response.ok) {
          throw new Error(userData.message || "Register error");
        }
      }

      dispatch(loginSuccess(userData.user));
      if (userData.token) {
        localStorage.setItem("token", userData.token);
      }
      navigate(SHOP_ROUTE);
    } catch (e: any) {
      dispatch(loginError(e.message));
      alert(e.message);
    }
  };

  return (
    <Container
      className="auth-container d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5 auth-card">
        <h2 className="m-auto">{isLogin ? "Login" : "Register"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-3">
            <Button
              className="w-100"
              variant={"outline-success"}
              onClick={clickHandler}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
