import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyflixAPIService from "../../services/myflixAPI.service";

const initialState = {
  data: [],
  searchString: "",
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (token) => {
    return await MyflixAPIService.fetchMovies(token);
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies() {
      return initialState;
    },
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...action.payload];
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearMovies, setSearchString } = moviesSlice.actions;

export default moviesSlice.reducer;
