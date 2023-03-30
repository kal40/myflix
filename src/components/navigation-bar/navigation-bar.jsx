import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { setSearchString } from "../../features/movies/moviesSlice";

import myFlixLogo from "../../assets/MyFlix-logo.png";

const NavigationBar = ({ onLoggedOut }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  return (
    <Navbar
      expand="lg"
      className="navbar"
      variant="dark"
      style={{ backgroundColor: "#374140" }}
    >
      <Container fluid>
        <Navbar.Brand>
          <Image
            src={myFlixLogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="MyFlix logo"
            rounded
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
          </Nav>
          <Nav className="mx-auto">
            <Form className="d-flex">
              <Form.Control
                id="searchbar"
                type="search"
                placeholder="Search"
                className=""
                aria-label="Search"
                onChange={(event) =>
                  dispatch(setSearchString(event.target.value))
                }
              />
            </Form>
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/profile">
              <span>{user.username}</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
