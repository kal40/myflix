import React, { useEffect, useState } from "react";

import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        "https://myflixapi.smartcoder.dev/v1/movies"
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
  }, []);

  if (selectedMovie) {
    return (
      <React.Fragment>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            setSelectedMovie(null);
          }}
        />
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
      </React.Fragment>
    );
  } else {
    return <React.Fragment>The movie list is empty!</React.Fragment>;
  }
};

export default MainView;
