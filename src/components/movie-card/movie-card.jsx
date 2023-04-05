import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../favorite-button/favorite-button";

const MovieCard = ({ movie }) => {
  return (
    <>
      <Card
        style={{ width: "20rem" }}
        className="m-2 shadow-sm p-3 rounded-0 text-ligth"
      >
        <Card.Img
          variant="top"
          src={movie.imagePath}
          className="rounded-0"
          height={250}
          style={{ objectFit: "cover" }}
        />
        <Card.ImgOverlay className="d-flex justify-content-between align-items-start h-75 m-2 text-light">
          <Badge
            bg="secondary"
            text="dark"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {movie.genre.name}
          </Badge>
          <FavoriteButton movieID={movie.id} />
        </Card.ImgOverlay>
        <Card.Body className="d-flex flex-column ">
          <Card.Title>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-camera-reels me-2"
              viewBox="0 0 16 16"
            >
              Alertservice
              <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
              <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
              <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
            {movie.title}
          </Card.Title>
          <Card.Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-video2 me-2"
              viewBox="0 0 16 16"
            >
              <path d="M10 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path d="M2 1a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2ZM1 3a1 1 0 0 1 1-1h2v2H1V3Zm4 10V2h9a1 1 0 0 1 1 1v9c0 .285-.12.543-.31.725C14.15 11.494 12.822 10 10 10c-3.037 0-4.345 1.73-4.798 3H5Zm-4-2h3v2H2a1 1 0 0 1-1-1v-1Zm3-1H1V8h3v2Zm0-3H1V5h3v2Z" />
            </svg>
            {movie.director.name}
          </Card.Text>
          <div className="text-center mt-auto">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button variant="primary">DETAILS</Button>
            </Link>
          </div>{" "}
        </Card.Body>
      </Card>
    </>
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
};

export default MovieCard;
