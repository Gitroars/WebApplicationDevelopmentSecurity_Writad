import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  book: null,
  loading: false,
  error: null,
};

const authorSlice = createSlice({
  name: "author",
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

export const { setLoading, setBooks, setError } = authorSlice.actions;

export default authorSlice.reducer;

export const authorSelector = (state) => state.author;
