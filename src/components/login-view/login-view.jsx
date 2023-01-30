import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Row className="py-5">
        <Col md={8} xl={6} className="text-center mx-auto">
          <h1 className="d-flex align-items-center justify-content-center">
            <span className="px-3 fs-1">MyFlix</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 8.467 8.467"
            >
              <g transform="translate(320.764 -684.652) scale(.26458)">
                <path
                  fill="#8f9ba7"
                  d="m -1210.3347,2595.573 26.0881,-6.9119 0.9061,3.3439 -26.088,6.9119 z"
                />
                <path
                  fill="#a5d1a6"
                  fill-rule="evenodd"
                  d="m -1204.1374,2597.5431 2.4756,-4.2398 3.3818,-0.896 -2.4756,4.2399 z"
                />
                <path
                  fill="#7fc8f0"
                  fill-rule="evenodd"
                  d="m -1197.1768,2595.5543 2.4756,-4.2398 3.3818,-0.896 -2.4756,4.2399 z"
                />
                <path
                  fill="#e2e0e1"
                  fill-rule="evenodd"
                  d="m -1190.6456,2593.9918 2.4756,-4.2398 3.3818,-0.896 -2.4756,4.2399 z"
                />
                <path
                  fill="#8f9ba7"
                  fill-rule="evenodd"
                  d="m -1187.2054,2593.029 2.4756,-4.2399 0.4831,-0.128 0.9062,3.3439 z"
                />
                <path
                  fill="#fb848a"
                  fill-rule="evenodd"
                  d="m -1190.5872,2593.925 2.4756,-4.2399 -3.3817,0.896 -2.4757,4.2399 z"
                />
                <path
                  fill="#fbda74"
                  fill-rule="evenodd"
                  d="m -1200.7325,2596.613 2.4756,-4.2399 3.3818,-0.896 -2.4757,4.2399 z"
                />
                <path
                  fill="#e2e0e1"
                  fill-rule="evenodd"
                  d="m -1207.4961,2598.4049 2.4756,-4.2398 3.3818,-0.896 -2.4756,4.2399 z"
                />
                <path
                  fill="#cfe1eb"
                  d="m -1209.3375,2603.1641 h 27 v 13.5 c 0,1.1046 -0.8954,2 -2,2 h -23 c -1.1046,0 -2,-0.8954 -2,-2 z"
                />
                <rect
                  width="26.988"
                  height="3.464"
                  x="-1847.11"
                  y="2199.06"
                  fill="none"
                  stroke="#586597"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  transform="matrix(.96665 -.25611 .26155 .96519 0 0)"
                />
                <path
                  fill="none"
                  stroke="#586597"
                  d="M-1207.4961 2598.4049l2.4756-4.2398M-1204.1143 2597.509l2.4756-4.2399M-1200.7325 2596.613l2.4756-4.2399M-1197.3508 2595.717l2.4757-4.2399M-1193.969 2594.821l2.4757-4.2399M-1190.5872 2593.925l2.4756-4.2399M-1187.2054 2593.029l2.4756-4.2399"
                />
                <path
                  fill="none"
                  stroke="#586597"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M-1182.3375 2603.1641v13.5c0 1.1046-.8954 2-2 2h-23c-1.1046 0-2-.8954-2-2v-13.5M-1205.8304 2606.1641h19.9858M-1205.8304 2611.6641h19.9858"
                />
                <path
                  fill="none"
                  stroke="#586597"
                  d="M-1199.3375 2606.1641v5.5M-1192.3375 2606.1641v5.5"
                />
                <g
                  stroke="#586597"
                  transform="matrix(-1 0 0 1 -1216.838 1522.802)"
                >
                  <path
                    fill="#8f9ba7"
                    stroke="none"
                    d="m -34.5,1076.8622 h 27 v 3.5 h -27 z"
                  />
                  <path
                    fill="#fbda74"
                    fill-rule="evenodd"
                    stroke="none"
                    d="m -18.358756,1080.3622 3.500001,-3.5 h -3.500001 l -3.499999,3.5 z"
                  />
                  <path
                    fill="#fb848a"
                    fill-rule="evenodd"
                    stroke="none"
                    d="m -25.608756,1080.3622 3.500001,-3.5 h -3.500001 l -3.499999,3.5 z"
                  />
                  <path
                    fill="#e2e0e1"
                    fill-rule="evenodd"
                    stroke="none"
                    d="m -11.508659,1080.3622 3.5000009,-3.5 h -3.5000009 l -3.499999,3.5 z"
                  />
                  <path
                    fill="#8f9ba7"
                    fill-rule="evenodd"
                    stroke="none"
                    d="m -11.499998,1080.3622 3.4999978,-3.5 H -7.5 v 3.5 z"
                  />
                  <path
                    fill="#a5d1a6"
                    fill-rule="evenodd"
                    stroke="none"
                    d="m -14.999999,1080.3622 3.500001,-3.5 h -3.500001 l -3.499999,3.5 z"
                  />
                  <path
                    fill="#7fc8f0"
                    fill-rule="evenodd"
                    stroke="none"
                    d="m -25.499998,1080.3622 3.499999,-3.5 h 3.500001 l -3.5,3.5 z"
                  />
                  <path
                    fill="#e2e0e1"
                    fill-rule="evenodd"
                    stroke="none"
                    d="m -32.499999,1080.3622 3.5,-3.5 h 3.500001 l -3.500001,3.5 z"
                  />
                  <rect
                    width="27"
                    height="3.5"
                    x="-34.5"
                    y="1076.862"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill="none"
                    d="M-32.499999 1080.3622l3.5-3.5M-28.999999 1080.3622l3.500001-3.5M-25.499998 1080.3622l3.499999-3.5M-21.999998 1080.3622l3.5-3.5M-18.499998 1080.3622l3.499999-3.5M-14.999999 1080.3622l3.500001-3.5M-11.499998 1080.3622l3.4999978-3.5"
                  />
                </g>
                <path
                  fill="none"
                  stroke="#586597"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m -1205.8304,2615.1641 h 19.9858"
                />
                <path
                  fill="none"
                  stroke="#586597"
                  d="M-1193.969 2594.821l2.4757-4.2399M-1190.5872 2593.925l2.4756-4.2399M-1200.7325 2596.613l2.4756-4.2399M-1197.3508 2595.717l2.4757-4.2399"
                />
              </g>
            </svg>
          </h1>
          <p className="text-muted lead">A place for your favorite movies</p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={6} xl={4}>
          <Card className="mb-5 shadow-lg p-3 rounded">
            <Card.Body className="d-flex flex-column align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="#f65058ff"
                className="mb-4"
              >
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 6c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm0 28.4c-5.01 0-9.41-2.56-12-6.44.05-3.97 8.01-6.16 12-6.16s11.94 2.19 12 6.16c-2.59 3.88-6.99 6.44-12 6.44z" />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-4">
                  {/* <Form.Label>Username:</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(error) => setUsername(error.target.value)}
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
              <div className="text-centered">
                <p className="text-muted">
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
