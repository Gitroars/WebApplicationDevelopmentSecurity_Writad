import { combineReducers, configureStore } from "@reduxjs/toolkit";

import books from "./slices/books";
import basket from "./slices/basket";
import user from "./slices/user";
const reducer = combineReducers({
  books,
  basket,
  user,
});

export default configureStore({
  reducer,
});
