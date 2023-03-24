import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";

import MovieCard from "../movie-card/movie-card";

const MovieView = ({
  movies,
  findSimilarMovies,
  favoriteMovies,
  toggleFavorite,
}) => {
  const { movieId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const movie = movies.find((b) => b.id === movieId);

  const handleToggle = (movie) => {
    toggleFavorite(movie);
  };

  return (
    <>
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
      <hr />
      <Row className="justify-content-center py-5">
        <h2 className="text-center mb-5">Similar Movies</h2>
        {findSimilarMovies(movie.genre.name, movie.id).map((movie) => (
          <MovieCard
            movie={movie}
            isFavorite={favoriteMovies.includes(movie)}
            toggleFavorite={handleToggle}
            key={movie.id}
          />
        ))}
      </Row>
    </>
  );
};

export default MovieView;
