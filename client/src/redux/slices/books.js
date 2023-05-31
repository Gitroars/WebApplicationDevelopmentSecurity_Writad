import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  books: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setBooks: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.books = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, setBooks } = booksSlice.actions;
export default booksSlice.reducer;

export const bookSelector = (state) => state.books;
