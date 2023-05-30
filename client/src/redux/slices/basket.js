import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    basketItemAdd: (state, { payload }) => {
      const existingBook = state.basket.find((book) => book.id === payload.id);
      if (existingBook) {
        state.basket = state.basket.map((book) => (book.id === existingBook.id ? payload : book));
      } else {
        state.basket = [...state.basket, payload];
      }
      state.loading = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, basketItemAdd } = bookSlice.actions;
export default basketSlice.reducer;

export const basketSelector = (state) => state.basket;
