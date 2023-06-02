import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (basketState) => {
  let result = 0;
  basketState.map((book) => {
    result += book.price;
  });
  return Number(result).toFixed(2);
};

export const initialState = {
  loading: false,
  error: null,
  basket: JSON.parse(localStorage.getItem("basketItems")) ?? [],
  expressShipping:JSON.parse(localStorage.getItem("expressShipping"))?? false,
  subtotal: localStorage.getItem("basketItems")
    ? calculateSubtotal(JSON.parse(localStorage.getItem("basketItems")))
    : 0,
};

const updateLocalStorage = (basket) => {
  localStorage.setItem("basketItems", JSON.stringify(basket));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(basket)));
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
      updateLocalStorage(state.basket);
      state.subtotal = calculateSubtotal(state.basket);
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    basketItemRemoval: (state, { payload }) => {
      state.basket = [...state.basket].filter((book) => book.id !== payload);
      updateLocalStorage(state.basket);
      state.subtotal = calculateSubtotal(state.basket);
      state.loading = false;
      state.error = null;
    },
    setExpressShipping:(state,{payload})=>{
      state.expressShipping=payload;
      localStorage.setItem('expressShipping',payload)
    },
    clearBasket:(state)=>{
      localStorage.removeItem('basketItems');
      state.basket=[];
    }
  },
});

export const { setLoading, setError, basketItemAdd, basketItemRemoval ,setExpressShipping,clearBasket} = basketSlice.actions;
export default basketSlice.reducer;

export const basketSelector = (state) => state.basket;
