import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "../features/movies/moviesSlice";
import userReducer from "../features/user/userSlice";
import { loadState } from "./localStorage";

export default configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
  preloadedState: loadState(),
});
