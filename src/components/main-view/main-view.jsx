import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";
import NavigationBar from "../navigation-bar/navigation-bar";

import { clearUser, fetchUser } from "../../features/user/userSlice";
import { clearMovies, fetchMovies } from "../../features/movies/moviesSlice";

const MainView = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.data);
  const movies = useSelector((state) => state.movies.data);
  const movieStatus = useSelector((state) => state.movies.status);
  const searchString = useSelector((state) => state.movies.searchString);

  useEffect(() => {
    if (movieStatus === "idle" && token) {
      dispatch(fetchMovies(token));
    }
  }, [token]);

  function clearLocalCurrentUser() {
    dispatch(clearUser());
    dispatch(clearMovies());
  }

  return (
    <BrowserRouter>
      <div
        id="mainview-wrapper"
        className={`min-vh-100 ${
          user.username ? "text-bg-dark" : "loginCover"
        }`}
      >
        {user.username ? (
          <NavigationBar
            onLoggedOut={() => {
              clearLocalCurrentUser();
            }}
          />
        ) : (
          ""
        )}
        <Container>
          <Routes>
            <Route
              path="/signup"
              element={
                <>{user.username ? <Navigate to="/" /> : <SignupView />}</>
              }
            />
            <Route
              path="/login"
              element={
                <>{user.username ? <Navigate to="/" /> : <LoginView />}</>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user.username ? (
                    <Navigate to="/login" />
                  ) : movies.length === 0 ? (
                    <Col>Loading ...</Col>
                  ) : (
                    <Row className="justify-content-center py-5">
                      <Col md={8} className="mb-5">
                        <MovieView />
                      </Col>
                    </Row>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user.username ? (
                    <Navigate to="/login" />
                  ) : movies.length === 0 ? (
                    <Col>Loading... </Col>
                  ) : (
                    <Row className="justify-content-center py-5">
                      {searchString
                        ? movies
                            .filter((movie) =>
                              movie.title.toLowerCase().includes(searchString)
                            )
                            .map((movie) => (
                              <MovieCard movie={movie} key={movie.id} />
                            ))
                        : movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                          ))}
                    </Row>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {user.username ? <ProfileView /> : <Navigate to="/login" />}
                </>
              }
            />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default MainView;
