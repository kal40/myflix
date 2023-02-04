import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId);

  return (
    <React.Fragment>
      <div>
        <Image
          src={movie.imagePath}
          style={{ height: "40rem" }}
          className="mb-4"
        />
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
      <Link to={`/`}>
        <Button className="btn-primary">BACK</Button>
      </Link>
    </React.Fragment>
  );
};

export default MovieView;
