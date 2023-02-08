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

const MainView = () => {
  const storedusername = localStorage.getItem("username");
  const storedToken = localStorage.getItem("token");
  const [username, setusername] = useState(
    storedusername ? storedusername : null
  );
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
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
      deleteFavoriteMovie(movie);
      setFavoriteMovies(
        favoriteMovies.filter((favoriteMovie) => favoriteMovie.id !== movie.id)
      );
    } else {
      addFavoriteMovie(movie);
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  const deleteFavoriteMovie = async (movie) => {
    try {
      const response = await fetch(
        `https://myflixapi.smartcoder.dev/v1/users/${user.username}/movies/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { success, message, data } = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const addFavoriteMovie = async (movie) => {
    try {
      const response = await fetch(
        `https://myflixapi.smartcoder.dev/v1/users/${user.username}/movies/${movie.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { success, message, data } = await response.json();
    } catch (error) {
      console.error(error);
    }
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

    async function getUser(username, token) {
      try {
        const response = await fetch(
          `https://myflixapi.smartcoder.dev/v1/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { success, message, data } = await response.json();
        if (data) {
          setUser({ ...data });
        } else {
          alert(message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser(username, token);

    async function fetchMovies() {
      const response = await fetch(
        "https://myflixapi.smartcoder.dev/v1/movies",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      const moviesFromAPI = data.data.map((movie) => {
        return {
          id: movie._id,
          title: movie.title,
          description: movie.description,
          imagePath: movie.imagePath,
          genre: movie.genre,
          director: movie.director,
        };
      });
      setMovies(moviesFromAPI);
    }
    fetchMovies();
  }, [token]);

  useEffect(() => {
    const initFavoriteMovies = movies.filter((movie) =>
      user.favoriteMovies.includes(movie.id)
    );
    setFavoriteMovies([...initFavoriteMovies]);
  }, [movies, user]);

  const findSimilarMovies = (genre) =>
    movies.filter((movie) => movie.genre.name === genre);

  const updateRootHtmlClass = (...styleClassNames) => {
    const container = document.querySelector("#root");
    container.className = "";
    styleClassNames.forEach((styleClassName) =>
      container.classList.add(styleClassName)
    );
  };

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
        />
      ) : (
        ""
      )}
      <Routes>
        <Route
          path="/signup"
          element={
            <React.Fragment>
              {username || signedUpSuccess ? (
                <Navigate to="/" />
              ) : (
                <SignupView onSignedUp={() => setSignedUpSuccess(true)} />
              )}
            </React.Fragment>
          }
        />
        <Route
          path="/login"
          element={
            <React.Fragment>
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
            </React.Fragment>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <React.Fragment>
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
            </React.Fragment>
          }
        />
        <Route
          path="/"
          element={
            <React.Fragment>
              {!username ? (
                <Navigate to="/login" />
              ) : movies.length === 0 ? (
                <Col>Loading... </Col>
              ) : (
                <Row className="justify-content-center py-5">
                  {movies.map((movie) => (
                    <MovieCard
                      movie={movie}
                      isFavorite={favoriteMovies.includes(movie)}
                      toggleFavorite={toggleFavorite}
                      key={movie.id}
                    />
                  ))}
                </Row>
              )}
            </React.Fragment>
          }
        />
        <Route
          path="/profile"
          element={
            <React.Fragment>
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
            </React.Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainView;
