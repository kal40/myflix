import React, { useEffect, useState } from "react";
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
  const storedusername = localStorage.getItem("username");
  const storedToken = localStorage.getItem("token");
  const [username, setusername] = useState(
    storedusername ? storedusername : null
  );
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
    favoriteMovies: [],
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [signedUpSuccess, setSignedUpSuccess] = useState(false);

  const toggleFavorite = (movie) => {
    const index = favoriteMovies.indexOf(movie);
    if (index > -1) {
      UserController.deleteFavoriteMovie(user, movie, token);
      setFavoriteMovies(
        favoriteMovies.filter((favoriteMovie) => favoriteMovie.id !== movie.id)
      );
    } else {
      UserController.addFavoriteMovie(user, movie, token);
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  function movieSearch(searchString) {
    setFilteredMovieList(
      movies.filter((movie) => movie.title.toLowerCase().includes(searchString))
    );
  }

  const findSimilarMovies = (genre, id) =>
    movies.filter((movie) => movie.genre.name === genre && movie.id !== id);

  const updateRootHtmlClass = (...styleClassNames) => {
    const container = document.querySelector("#root");
    container.className = "";
    styleClassNames.forEach((styleClassName) =>
      container.classList.add(styleClassName)
    );
  };

  useEffect(() => {
    if (username) {
      updateRootHtmlClass("text-bg-dark");
    } else {
      updateRootHtmlClass("root--cover");
    }
  }, [username]);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const userFromAPI = await UserController.getUser(username, token);
      setUser(userFromAPI);
    })();

    (async () => {
      const moviesFromAPI = await MovieController.fetchMovies(token);
      setMovies(moviesFromAPI);
    })();
  }, [token]);

  useEffect(() => {
    const initFavoriteMovies = movies.filter((movie) =>
      user.favoriteMovies.includes(movie.id)
    );
    setFavoriteMovies([...initFavoriteMovies]);
    setFilteredMovieList(movies);
  }, [movies, user]);

  const clearLocalCurrentUser = () => {
    setusername(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      {username ? (
        <NavigationBar
          username={username}
          onLoggedOut={clearLocalCurrentUser}
          onSearch={movieSearch}
        />
      ) : (
        ""
      )}
      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {username || signedUpSuccess ? (
                <Navigate to="/" />
              ) : (
                <SignupView onSignedUp={() => setSignedUpSuccess(true)} />
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {username ? (
                <Navigate to="/" />
              ) : (
                <LoginView
                  onLoggedIn={(username, token) => {
                    setusername(username);
                    setToken(token);
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
              {!username ? (
                <Navigate to="/login" />
              ) : movies.length === 0 ? (
                <Col>Loading ...</Col>
              ) : (
                <Row className="justify-content-center py-5">
                  <Col md={8} className="mb-5">
                    <MovieView
                      movies={movies}
                      findSimilarMovies={findSimilarMovies}
                      favoriteMovies={favoriteMovies}
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
              {!username ? (
                <Navigate to="/login" />
              ) : movies.length === 0 ? (
                <Col>Loading... </Col>
              ) : (
                <Row className="justify-content-center py-5">
                  {filteredMovieList.map((movie) => (
                    <MovieCard
                      movie={movie}
                      isFavorite={favoriteMovies.includes(movie)}
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
              {username ? (
                <ProfileView
                  user={user}
                  favoriteMovies={favoriteMovies}
                  toggleFavorite={toggleFavorite}
                  token={token}
                  onDelete={clearLocalCurrentUser}
                />
              ) : (
                <Navigate to="/login" />
              )}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainView;
