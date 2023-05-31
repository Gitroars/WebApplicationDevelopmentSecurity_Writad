import { combineReducers, configureStore } from "@reduxjs/toolkit";

import books from "./slices/books";
import basket from "./slices/basket";
const reducer = combineReducers({
  books,
  basket,
});

export default configureStore({
  reducer,
});
