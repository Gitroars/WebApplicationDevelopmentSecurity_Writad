import axios from "axios";

import { setBooks, setLoading, setError, setBook } from "../slices/books";

export const getBooks = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get("http://localhost:5000/api/books");
    dispatch(setBooks(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later"
      )
    );
  }
};

export const getBook = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
    dispatch(setBook(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later"
      )
    );
  }
};
