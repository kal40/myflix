const apiURL = "https://myflixapi.smartcoder.dev/v1";

const getUser = async (username, token) => {
  if (!username || !token) {
    console.error("Invalid Credentials");
    return Promise.reject("Invalid Credentials");
  }
  try {
    const response = await fetch(`${apiURL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (username, password) => {
  try {
    const userData = {
      username: username,
      password: password,
    };
    const response = await fetch(`${apiURL}/users/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else if (success) {
      alert(message);
      return Promise.reject(message);
    } else {
      alert("Login Failed");
    }
  } catch (error) {
    console.error(error);
    alert("Login Failed");
  }
};

const registerUser = async (username, password, email, birthday) => {
  try {
    const userData = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };
    const response = await fetch(`${apiURL}/users`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else if (success) {
      alert(message);
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
    alert("Registration Failed");
  }
};

const updateUser = async (
  currentUsername,
  username,
  password,
  email,
  birthday,
  token
) => {
  const userData = {
    username: username,
    password: password,
    email: email,
    birthday: birthday,
  };
  try {
    const response = await fetch(`${apiURL}/users/${currentUsername}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { success, message, data } = await response.json();
    if (data) {
      alert("Update Successful");
      return data;
    } else if (success) {
      alert(message);
      return Promise.reject(message);
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
    alert("Update Failed");
  }
};

const deleteUser = async (username, token) => {
  try {
    const response = await fetch(`${apiURL}/users/${username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else if (success) {
      alert(message);
      return Promise.reject(message);
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }
};

const deleteFavoriteMovie = async (username, movieID, token) => {
  try {
    const response = fetch(`${apiURL}/users/${username}/movies/${movieID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const addFavoriteMovie = async (username, movieID, token) => {
  try {
    const response = await fetch(
      `${apiURL}/users/${username}/movies/${movieID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchMovies = async (token) => {
  try {
    const response = await fetch(`${apiURL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
      return Promise.reject(message);
    }
  } catch (error) {
    console.error(error);
  }
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
