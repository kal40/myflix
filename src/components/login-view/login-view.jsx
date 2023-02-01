import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import myFlixLogo from "./MyFlix-1.png";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
    try {
      const queryParams = `?username=${username}&password=${password}`;
      const response = await fetch(
        `https://myflixapi.smartcoder.dev/v1/users/login${queryParams}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message, data } = await response.json();
      if (data) {
        localStorage.setItem("user", username);
        localStorage.setItem("token", data.token);
        onLoggedIn(username, data.token);
      } else if (success) {
        alert(message);
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };
  return (
    <React.Fragment>
      <Row className="d-flex justify-content-center align-content-center vh-100">
        <Col sm={8} md={7} lg={6} xl={5} xxl={4}>
          <Card className="p-5 rounded-4 shadow-lg m-5">
            <Card.Img
              src={myFlixLogo}
              alt="MyFlix Logo"
              className="mx-auto mb-5"
              style={{ backgroundColor: "#f65058" }}
            />
            <Card.Body className="d-flex flex-column align-items-center px-0">
              <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group controlId="formUsername" className="mb-4">
                  {/* <Form.Label>Username:</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(error) => setUsername(error.target.value)}
                    autoComplete="username"
                    minLength="3"
                    maxLength="20"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-4">
                  {/* <Form.Label>Password:</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(error) => setPassword(error.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </Form.Group>
                <Button
                  className="btn-primary d-block w-100 mb-3"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
              <div>
                <p className="text-muted text-center ">
                  Don't have an account? <a href="#!">Register</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default LoginView;
