const getUser = async (username, token) => {
  const response = await fetch(
    `https://myflixapi.smartcoder.dev/v1/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const loginUser = async (userData) => {
  const response = await fetch(
    `https://myflixapi.smartcoder.dev/v1/users/login`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const registerUser = async (userData) => {
  const response = await fetch(`https://myflixapi.smartcoder.dev/v1/users`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const updateUser = async (currentUsername, userData, token) => {
  const response = await fetch(
    `https://myflixapi.smartcoder.dev/v1/users/${currentUsername}`,
    {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const deleteUser = async (username, token) => {
  const response = await fetch(
    `https://myflixapi.smartcoder.dev/v1/users/${username}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const deleteFavoriteMovie = async (username, movieID, token) => {
  const response = await fetch(
    `https://myflixapi.smartcoder.dev/v1/users/${username}/movies/${movieID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const addFavoriteMovie = async (username, movieID, token) => {
  const response = await fetch(
    `https://myflixapi.smartcoder.dev/v1/users/${username}/movies/${movieID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const fetchMovies = async (token) => {
  const response = await fetch("https://myflixapi.smartcoder.dev/v1/movies", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export default {
  getUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  deleteFavoriteMovie,
  addFavoriteMovie,
  fetchMovies,
};
