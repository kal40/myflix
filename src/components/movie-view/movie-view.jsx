import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image from "react-bootstrap/Image";

import MovieCard from "../movie-card/movie-card";
import ImageUploadForm from "../image-upload-form/image-upload-form";
import { useDispatch } from "react-redux";
import { fetchUserMovieImageList } from "../../features/movies/moviesSlice";
import MyflixAPIService from "../../services/myflixAPI.service";

const MovieView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const movies = useSelector((state) => state.movies.data);
  const userMovieImageList = useSelector(
    (state) => state.movies.userMovieImageList
  );
  const token = useSelector((state) => state.user.token);
  const { movieId: movieId } = useParams();
  const [key, setKey] = useState("similar-movies");

  useEffect(() => {
    const userId = user._id;
    dispatch(fetchUserMovieImageList({ userId, movieId, token }));
    window.scrollTo(0, 0);
  }, []);

  const movie = movies.find((movie) => movie.id === movieId);

  function findSimilarMovies(genreName) {
    return movies.filter(
      (movie) => movie.genre.name === genreName && movie.id !== movieId
    );
  }

  function convertObjectKeyToOriginal(objectKey) {
    return encodeURIComponent(
      objectKey
        .replace("resized-images", "original-images")
        .replace("resized-", "")
    );
  }

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
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="similar-movies" title="Similar Movies">
          <Row className="justify-content-center py-5">
            <h2 className="text-center mb-5">Similar Movies</h2>
            {findSimilarMovies(movie.genre.name).map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </Row>
        </Tab>
        <Tab eventKey="uploaded-images" title="Uploaded Images">
          <Row className="justify-content-center py-5">
            <h2 className="text-center mb-5">Uploaded Images</h2>
            <Row className="justify-content-center pb-3">
              <ImageUploadForm
                userId={user._id}
                movieId={movieId}
                token={token}
              />
            </Row>
            <Col>
              {userMovieImageList[movieId]
                ? userMovieImageList[movieId].map((image) => (
                    <a
                      onClick={async (event) => {
                        event.preventDefault();
                        const response =
                          await MyflixAPIService.fetchUserMovieImage(
                            convertObjectKeyToOriginal(image.Key),
                            token
                          );
                        const file = window.URL.createObjectURL(response);
                        window.open(file, "_blank");
                      }}
                      key={image.ETag}
                    >
                      <Image
                        className="me-2 my-2"
                        thumbnail={"true"}
                        width={"150px"}
                        src={`https://myflix-movie-user-images.s3.eu-central-1.amazonaws.com/${image.Key}`}
                      />
                    </a>
                  ))
                : ""}
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </>
  );
};

export default MovieView;
