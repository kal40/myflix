import React, { useEffect, useState } from "react";

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

  if (!user) {
    return (
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
    );
  }

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.genre.name === selectedMovie.genre.name &&
        movie.title !== selectedMovie.title
    );
    return (
      <React.Fragment>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            setSelectedMovie(null);
          }}
        />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => {
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
      </React.Fragment>
    );
  }

  if (movies.length) {
    return (
      <React.Fragment>
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
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </React.Fragment>
    );
  } else {
    return <React.Fragment>The movie list is empty!</React.Fragment>;
  }
};

export default MainView;
