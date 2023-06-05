import axios from "axios";
import {
  getBooks,
  fetchPurchasedBooksRequest,
  fetchPurchasedBooksSuccess,
  fetchPurchasedBooksFailure,
} from "../slices/library";

export const fetchPurchasedBooks = () => async (dispatch) => {
  try {
    dispatch(fetchPurchasedBooksRequest());

    const response = await axios.get("http://localhost:5000/api/library");

    dispatch(fetchPurchasedBooksSuccess(response.data));
  } catch (error) {
    dispatch(fetchPurchasedBooksFailure(error.message));
  }
};
