import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import myFlixLogo from "../../assets/MyFlix-1.png";
import { Link } from "react-router-dom";

import { loginUser, setUsername } from "../../features/user/userSlice";

const LoginView = () => {
  const dispatch = useDispatch();
  const [username, setFormUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <>
      <Row className="d-flex justify-content-center align-content-center vh-100">
        <Col>
          <Card
            className="p-4 rounded-4 shadow-lg m-auto"
            style={{ width: "17rem" }}
          >
            <Card.Img
              src={myFlixLogo}
              alt="MyFlix Logo"
              className="mx-auto mb-3 bg-primary"
            />
            <Card.Body className="d-flex flex-column align-items-center px-0">
              <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group controlId="formUsername" className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setFormUsername(event.target.value)}
                    autoComplete="username"
                    minLength="3"
                    maxLength="30"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </Form.Group>
                <Button
                  className="btn-primary d-block w-100 mb-3"
                  type="submit"
                >
                  LOGIN
                </Button>
              </Form>
              <div>
                <p className="text-muted text-center ">
                  Don't have an account?
                  <Link to={"/signup"} className="mx-2">
                    SIGNUP
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginView;
