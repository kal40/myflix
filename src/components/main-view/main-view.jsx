import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

import UserController from "../../controllers/user.controller";
import MovieController from "../../controllers/movie.controller";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState();

  useEffect(() => {
    if (user) {
      (async () => {
        moviesFromAPI = await MovieController.fetchMovies(token);
        setMovies(moviesFromAPI);
      })();
    }
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function toggleFavorite(movie) {
    const index = user.favoriteMovies.indexOf(movie.id);
    if (index > -1) {
      UserController.deleteFavoriteMovie(user, movie, token);
      setUser({
        ...user,
        favoriteMovies: user.favoriteMovies.filter((id) => id !== movie.id),
      });
    } else {
      UserController.addFavoriteMovie(user, movie, token);
      setUser({
        ...user,
        favoriteMovies: [...user.favoriteMovies, movie.id],
      });
    }
  }

  function clearLocalCurrentUser() {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <div
        id="mainview-wrapper"
        className={`min-vh-100 ${user ? "text-bg-dark" : "loginCover"}`}
      >
        {user ? (
          <NavigationBar
            username={user.username}
            onLoggedOut={() => {
              clearLocalCurrentUser();
            }}
            onSearch={(searchString) => setSearchString(searchString)}
          />
        ) : (
          ""
        )}
        <Container>
          <Routes>
            <Route
              path="/signup"
              element={<>{user ? <Navigate to="/" /> : <SignupView />}</>}
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <LoginView
                      onLoggedIn={async (username, token) => {
                        setToken(token);
                        const userFromAPI = await UserController.getUser(
                          username,
                          token
                        );
                        setUser(userFromAPI);
                        localStorage.setItem(
                          "user",
                          JSON.stringify(userFromAPI)
                        );
                        const moviesFromAPI = await MovieController.fetchMovies(
                          token
                        );
                        setMovies(moviesFromAPI);
                      }}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" />
                  ) : movies.length === 0 ? (
                    <Col>Loading ...</Col>
                  ) : (
                    <Row className="justify-content-center py-5">
                      <Col md={8} className="mb-5">
                        <MovieView
                          movies={movies}
                          user={user}
                          toggleFavorite={toggleFavorite}
                        />
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
                  {!user ? (
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
                              <MovieCard
                                movie={movie}
                                isFavorite={user.favoriteMovies.includes(
                                  movie.id
                                )}
                                toggleFavorite={toggleFavorite}
                                key={movie.id}
                              />
                            ))
                        : movies.map((movie) => (
                            <MovieCard
                              movie={movie}
                              isFavorite={user.favoriteMovies.includes(
                                movie.id
                              )}
                              toggleFavorite={toggleFavorite}
                              key={movie.id}
                            />
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
                  {user ? (
                    <ProfileView
                      user={user}
                      movies={movies}
                      toggleFavorite={toggleFavorite}
                      token={token}
                      onUpdate={async (updatedUsername) => {
                        setUser(
                          await UserController.getUser(updatedUsername, token)
                        );
                        localStorage.setItem("user", JSON.stringify(user));
                      }}
                      onDelete={() => {
                        clearLocalCurrentUser();
                      }}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )}
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
