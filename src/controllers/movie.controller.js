import MyflixAPIService from "../services/myflixAPI.service";

const fetchMovies = async (token) => {
  try {
    const response = await MyflixAPIService.fetchMovies(token);
    const { success, message, data } = await response.json();
    if (data) {
      return data.map((movie) => {
        return {
          id: movie._id,
          title: movie.title,
          description: movie.description,
          imagePath: movie.imagePath,
          genre: movie.genre,
          director: movie.director,
        };
      });
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  fetchMovies,
};
