import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import avatar from "../../assets/person-circle.svg";
import MovieCard from "../movie-card/movie-card";
import { deleteUser, updateUser } from "../../features/user/userSlice";

const ProfileView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const movies = useSelector((state) => state.movies.data);
  const token = useSelector((state) => state.user.token);
  const [editUser, setEditUser] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const birthdayInputRef = useRef(null);

  useEffect(() => {
    if (birthdayInputRef.current) {
      birthdayInputRef.current.value = formatDate(birthday);
    }
  }, [editUser]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        updateUser({ user, username, password, email, birthday, token })
      ).unwrap();
    } catch (err) {
      console.error("Failed to update: ", err);
    } finally {
      setEditUser(false);
    }
  };

  const handleDeleteUser = async () => {
    dispatch(deleteUser({ user, token }));
  };

  function formatDate(birthday) {
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
  }

  return (
    <>
      {!editUser ? (
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
                  <Button variant="primary" onClick={() => setEditUser(true)}>
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
                      onClick={() => setEditUser(false)}
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
        {user.favoriteMovies.length ? (
          movies
            .filter((movie) => user.favoriteMovies.includes(movie.id))
            .map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <p>No favorite movies</p>
        )}
      </Row>
    </>
  );
};

export default ProfileView;
