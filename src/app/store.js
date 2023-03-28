import { configureStore } from "@reduxjs/toolkit";

import moviesSlice from "../features/movies/moviesSlice";
import userSlice from "../features/user/userSlice";

export default configureStore({
  reducer: {
    movies: moviesSlice,
    user: userSlice,
  },
});
