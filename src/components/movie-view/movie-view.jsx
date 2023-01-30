import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <React.Fragment>
      <div>
        <Image src={movie.imagePath} style={{ height: "40rem" }} />
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
      <Button onClick={onBackClick} className="btn-primary">
        Back
      </Button>
    </React.Fragment>
  );
};

export default MovieView;
