import { combineReducers, configureStore } from "@reduxjs/toolkit";

import books from "./slices/books";
import basket from "./slices/basket";
import user from "./slices/user";
import order from "./slices/order";
import admin from "./slices/admin";

const reducer = combineReducers({
  books,
  basket,
  user,
  order,
  admin,
});

export default configureStore({
  reducer,
});