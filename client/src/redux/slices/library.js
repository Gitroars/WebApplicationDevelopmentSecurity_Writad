import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    fetchPurchasedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBooks: (state, { payload }) => {
      state.books = false;
      state.error = null;
      state.books = payload;
    },

    fetchPurchasedBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchPurchasedBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPurchasedBooksRequest, getBooks, fetchPurchasedBooksSuccess, fetchPurchasedBooksFailure } =
  librarySlice.actions;

export default librarySlice.reducer;

export const librarySelector = (state) => state.library;
