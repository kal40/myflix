import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <React.Fragment>
      <Card style={{ width: "16rem" }} className="m-2 shadow-lg p-3 rounded-4">
        <Card.Img
          variant="top"
          src={movie.imagePath}
          className="rounded-4"
          style={{ objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          {/* <Card.Text>{movie.description}</Card.Text> */}
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Director: {movie.director.name}</ListGroup.Item>
          <ListGroup.Item>Genre: {movie.genre.name}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link
            href="#"
            onClick={() => {
              onMovieClick(movie);
            }}
          >
            More
          </Card.Link>
          <Card.Link href="#">Add to favorites</Card.Link>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    featured: PropTypes.bool,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthYear: PropTypes.string,
      deathYear: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
