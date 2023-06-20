import { combineReducers, configureStore } from "@reduxjs/toolkit";

import books from "./slices/books";
import basket from "./slices/basket";
import user from "./slices/user";
import order from "./slices/order";
import admin from "./slices/admin";
import library from "./slices/library";
import author from "./slices/author";
const reducer = combineReducers({
  books,
  basket,
  user,
  order,
  admin,
  library,
  author,
});

export default configureStore({
  reducer,
});
