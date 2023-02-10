import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import avatar from "./person-circle.svg";
import MovieCard from "../movie-card/movie-card";

const ProfileView = ({
  user,
  favoriteMovies,
  toggleFavorite,
  token,
  onDelete,
}) => {
  const [updateUser, setUpdateUser] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const birthdayInputRef = useRef(null);

  useEffect(() => {
    if (birthdayInputRef.current) {
      birthdayInputRef.current.value = formatDate(birthday);
    }
  }, [updateUser]);

  const handleUpdate = async () => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };
    try {
      const response = await fetch(
        `https://myflixapi.smartcoder.dev/v1/users/${user.username}`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { success, message, data } = await response.json();
      if (success) {
        alert(message);
        setUpdateUser(false);
      } else {
        console.error(message);
        alert("Update failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `https://myflixapi.smartcoder.dev/v1/users/${user.username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { success, message, data } = await response.json();
      if (success) {
        onDelete();
      } else {
        alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (movie) => {
    toggleFavorite(movie);
  };

  const formatDate = (birthday) => {
    const date = new Date(birthday);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dayOfTheMonth = date.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (dayOfTheMonth < 10) {
      dayOfTheMonth = `0${dayOfTheMonth}`;
    }
    return `${year}-${month}-${dayOfTheMonth}`;
  };

  return (
    <React.Fragment>
      {!updateUser ? (
        <Row className="d-flex justify-content-center p-4">
          <Col sm={8} md={6} lg={5} xl={4} xxl={3}>
            <Card
              style={{ minWidth: "20rem", maxWidth: "40rem" }}
              className="shadow-lg p-3 rounded-4 text-center"
              text="secondary"
            >
              <Card.Img
                variant="top"
                src={avatar}
                className="rounded-0"
                height={100}
              />
              <Card.Body>
                <Card.Title>Profile Information</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
              <ListGroup className="text-start">
                <ListGroup.Item className="text-bg-dark">
                  Username: {username}
                </ListGroup.Item>
                <ListGroup.Item className="text-bg-dark">
                  Password: **********
                </ListGroup.Item>

                <ListGroup.Item className="text-bg-dark">
                  Email: {email}
                </ListGroup.Item>
                <ListGroup.Item className="text-bg-dark">
                  Birthday: {formatDate(birthday)}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <div className="text-center">
                  <Button variant="primary" onClick={() => setUpdateUser(true)}>
                    EDIT
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="d-flex justify-content-center p-4">
          <Col sm={8} md={6} lg={5} xl={4} xxl={3}>
            <Card
              style={{ minWidth: "20rem", maxWidth: "40rem" }}
              className="shadow-lg p-3 rounded-4 text-center"
              text="secondary"
            >
              <Card.Img
                variant="top"
                src={avatar}
                className="rounded-0"
                height={100}
              />
              <Card.Body>
                <Card.Title>Profile Information</Card.Title>
                <Card.Text></Card.Text>
                <Form onSubmit={handleUpdate} className="w-100 text-start">
                  <Form.Group controlId="formUsername" className="mb-4">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      defaultValue={username}
                      onChange={(event) => setUsername(event.target.value)}
                      autoComplete="username"
                      minLength="3"
                      maxLength="30"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      defaultValue={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mb-4">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      defaultValue={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      required
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBirthday" className="mb-4">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Birthday"
                      onChange={(event) => setBirthday(event.target.value)}
                      autoComplete="date"
                      // the date field defaultValue is not working. The only way to populate with initial value is using javascript
                      ref={birthdayInputRef}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-around">
                    <Button variant="primary" type="submit">
                      SAVE
                    </Button>
                    <Button variant="primary" onClick={handleDeleteUser}>
                      DELETE
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setUpdateUser(false)}
                    >
                      CANCEL
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center py-5">
        <h2 className="text-center mb-5">Favorite Movies</h2>
        {favoriteMovies.length ? (
          favoriteMovies.map((movie) => (
            <MovieCard
              movie={movie}
              isFavorite={true}
              toggleFavorite={handleToggle}
              key={movie.id}
            />
          ))
        ) : (
          <p>No favorite movies</p>
        )}
      </Row>
    </React.Fragment>
  );
};

export default ProfileView;
