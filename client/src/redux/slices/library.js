import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  book: null,
  loading: false,
  error: null,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setBooks: (state, { payload }) => {
      state.error = null;
      state.books = payload;
      state.loading = false;
    },

    setBook: (state, { payload }) => {
      state.error = null;
      state.book = payload;
      state.loading = false;
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setBooks, setError } = librarySlice.actions;

export default librarySlice.reducer;

export const librarySelector = (state) => state.library;
