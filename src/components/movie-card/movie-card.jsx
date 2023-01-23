import React from "react";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <React.Fragment>
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    </React.Fragment>
  );
};
export default MovieCard;
