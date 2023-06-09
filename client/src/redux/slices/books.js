import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  books: [],
  book: null,
  chapter: [],
  reviewSend: false,
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
    setBook: (state, { payload }) => {
      state.book = payload;
      state.loading = false;
      state.error = null;
    },
    setChapter: (state, { payload }) => {
      state.chapter = payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    bookReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewSend = true;
    },
    resetError: (state) => {
      state.error = null;
      state.reviewSend = false;
    },
  },
});

export const { setLoading, setError, setBooks, setBook, bookReviewed, resetError, setChapter } = booksSlice.actions;
export default booksSlice.reducer;

export const bookSelector = (state) => state.books;
