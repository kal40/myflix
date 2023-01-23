import React, { useState } from "react";

import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      genre: {
        name: "Drama",
        description:
          "Haunted by her past, a nurse travels from England to a remote Irish village in 1862 to investigate a young girl's supposedly miraculous fast.",
      },
      director: {
        name: "Sebastián Lelio",
        bio: "Sebastián Lelio Watt is a Chilean director, screenwriter, editor and producer. He received critical acclaim for directing the films Gloria and A Fantastic Woman, the latter of which won an Academy Award for Best Foreign Language Film.",
        birthYear: "1974",
        deathYear: "",
      },
      actors: [],
      _id: "6399b9f402e2cbd3f76be712",
      title: "The Wonder",
      description:
        "Haunted by her past, a nurse travels from England to a remote Irish village in 1862 to investigate a young girl's supposedly miraculous fast.",
      imagePath:
        "https://artworks.thetvdb.com/banners/v4/movie/245161/posters/6355833b03dff.jpg",
      featured: false,
    },
    {
      genre: {
        name: "Drama",
        description:
          "Haunted by her past, a nurse travels from England to a remote Irish village in 1862 to investigate a young girl's supposedly miraculous fast.",
      },
      director: {
        name: "James Cameron",
        bio: "James Francis Cameron CC is a Canadian filmmaker. A major figure in the post-New Hollywood era, he is considered one of the industry''s most innovative filmmakers, regularly pushing the boundaries of cinematic capability with his use of novel technologies.",
        birthYear: "1954",
        deathYear: "",
      },
      actors: [],
      _id: "6399b9f402e2cbd3f76be715",
      title: "Titanic",
      description:
        "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
      imagePath:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
      featured: false,
    },
    {
      genre: {
        name: "Action",
        description:
          "Action film is a film director in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
      },
      director: {
        name: "Ryan Coogler",
        bio: "Ryan Kyle Coogler is an American film director, producer and screenwriter. He is a recipient of four NAACP Image Awards, four Black Reel Awards and an Academy Award nomination for Best Picture.",
        birthYear: "1986",
        deathYear: "",
      },
      actors: [],
      _id: "6399b9f402e2cbd3f76be70e",
      title: "Black Panther",
      description:
        "King T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without. Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantle to join with ex-girlfriend Nakia, the queen-mother, his princess-kid sister, members of the Dora Milaje (the Wakandan 'special forces') and an American secret agent, to prevent Wakanda from being dragged into a world war.",
      imagePath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
      featured: true,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
              key={movie._id}
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
