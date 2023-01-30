import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";

const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

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

  let similarMovies = () =>
    movies.filter(
      (movie) =>
        movie.genre.name === selectedMovie.genre.name &&
        movie.title !== selectedMovie.title
    );

  return !user ? (
    <React.Fragment>
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />{" "}
      or
      <SignupView />
    </React.Fragment>
  ) : selectedMovie ? (
    <React.Fragment>
      <Row className="justify-content-md-center py-5">
        <Col md={8} className="mb-5">
          <MovieView
            movie={selectedMovie}
            onBackClick={() => {
              setSelectedMovie(null);
            }}
          />
        </Col>
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies().map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedmovie) => {
                setSelectedMovie(newSelectedmovie);
              }}
            />
          );
        })}
      </Row>
    </React.Fragment>
  ) : movies.length ? (
    <React.Fragment>
      <Row className="justify-content-md-center py-5">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedmovie) => {
                setSelectedMovie(newSelectedmovie);
              }}
            />
          );
        })}
        <Button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
            className = "btn-primary";
          }}
        >
          Logout
        </Button>
      </Row>
    </React.Fragment>
  ) : (
    <React.Fragment>The movie list is empty!</React.Fragment>
  );
};

export default MainView;
