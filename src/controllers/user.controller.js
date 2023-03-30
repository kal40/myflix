import MyflixAPIService from "../services/myflixAPI.service";

const getUser = async (username, token) => {
  if (!username || !token) {
    console.error("Invalid Credentials");
    return Promise.reject("Invalid Credentials");
  }
  try {
    const response = await MyflixAPIService.getUser(username, token);
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
    const response = await MyflixAPIService.loginUser(userData);

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
    const response = await MyflixAPIService.registerUser(userData);

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
    const response = await MyflixAPIService.updateUser(
      currentUsername,
      userData,
      token
    );
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
    const response = await MyflixAPIService.deleteUser(username, token);
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

const deleteFavoriteMovie = async (user, movie, token) => {
  try {
    const response = await MyflixAPIService.deleteFavoriteMovie(
      user,
      movie,
      token
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

const addFavoriteMovie = async (user, movie, token) => {
  try {
    const response = await MyflixAPIService.addFavoriteMovie(
      user,
      movie,
      token
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

export default {
  getUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  deleteFavoriteMovie,
  addFavoriteMovie,
};
