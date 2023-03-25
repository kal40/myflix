import MyflixAPIService from "../services/myflixAPI.service";

const deleteFavoriteMovie = async (user, movie) => {
  try {
    const response = await MyflixAPIService.deleteFavoriteMovie(user, movie);
    const { success, message, data } = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const addFavoriteMovie = async (movie) => {
  try {
    const response = await fetch(
      `https://myflixapi.smartcoder.dev/v1/users/${user.username}/movies/${movie.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { success, message, data } = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (username, token) => {
  try {
    const response = await fetch(
      `https://myflixapi.smartcoder.dev/v1/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { success, message, data } = await response.json();
    if (data) {
      setUser({ ...data });
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchMovies = async (token) => {
  const response = await fetch("https://myflixapi.smartcoder.dev/v1/movies", {
    headers: { Authorization: `Bearer ${token}` },
  });
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
  return moviesFromAPI;
};

export default {
  deleteFavoriteMovie,
  addFavoriteMovie,
  getUser,
  fetchMovies,
};
