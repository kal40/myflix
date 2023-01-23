import React from "react";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <React.Fragment>
      <div>
        <img src={movie.imagePath} />
      </div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>
        <strong>Genre: </strong>
        {movie.genre.name}
      </p>
      <p>
        <strong>Director: </strong>
        {movie.director.name}
      </p>
      <button onClick={onBackClick}>Back</button>
    </React.Fragment>
  );
};

export default MovieView;
