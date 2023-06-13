import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [], // Initially empty array of books
  loading: false,
  error: null,
};

const authorBooksSlice = createSlice({
  name: "authorBooks",
  initialState,
  reducers: {
    getAuthorBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAuthorBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    getAuthorBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getAuthorBooksRequest, getAuthorBooksSuccess, getAuthorBooksFailure } = authorBooksSlice.actions;

export default authorBooksSlice.reducer;
