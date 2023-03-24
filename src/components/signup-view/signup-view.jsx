import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import myFlixLogo from "../../assets/MyFlix-1.png";

const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    const response = await fetch("https://myflixapi.smartcoder.dev/v1/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { success, message, data } = await response.json();
    if (success) {
      alert(message);
      onSignedUp();
    } else {
      alert("Signup failed");
    }
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
              <Form onSubmit={handleSubmit} className="w-100 text-white">
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    minLength="3"
                    maxLength="30"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mb-3">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Birthday"
                    onChange={(event) => setBirthday(event.target.value)}
                    autoComplete="date"
                    required
                  />
                </Form.Group>
                <Button
                  className="btn-primary d-block w-100 mb-3"
                  type="submit"
                >
                  SIGNUP
                </Button>
              </Form>
              <div>
                <p className="text-muted text-center ">
                  Do you have an account?
                  <Link to={"/login"} className="mx-2">
                    LOGIN
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

export default SignupView;
