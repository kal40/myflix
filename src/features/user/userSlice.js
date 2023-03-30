import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserController from "../../controllers/user.controller";

const initialState = {
  data: {
    username: "",
    email: "",
    favoriteMovies: [],
    password: "",
  },
  token: "",
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ username, token }) => {
    const response = await UserController.getUser(username, token);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }) => {
    const token = await UserController.loginUser(username, password);
    const user = await UserController.getUser(username, token.token);
    return { user, token };
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ user, username, password, email, birthday, token }) => {
    const response = await UserController.updateUser(
      user.username,
      username,
      password,
      email,
      birthday,
      token
    );
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ user, token }) => {
    const response = await UserController.deleteUser(user.username, token);
    return response;
  }
);

export const toogleFavorite = createAsyncThunk(
  "user/toogleFavorite",
  async ({ user, movie, token }) => {
    const movieIndex = user.favoriteMovies.findIndex((id) => id === movie.id);
    if (movieIndex >= 0) {
      const response = await UserController.deleteFavoriteMovie(
        user,
        movie,
        token
      );
      return response;
    } else {
      const response = await UserController.addFavoriteMovie(
        user,
        movie,
        token
      );
      return response;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser() {
      return initialState;
    },
    setUsername(state, action) {
      state.data.username = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = { ...action.payload };
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token.token;
        state.data = { ...action.payload.user };
      }),
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.data = { ...action.payload };
      }),
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        return initialState;
      }),
      builder.addCase(toogleFavorite.fulfilled, (state, action) => {
        state.data = { ...action.payload };
      });
  },
});

export const { clearUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
