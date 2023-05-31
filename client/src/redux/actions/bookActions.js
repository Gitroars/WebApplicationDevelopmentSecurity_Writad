import axios from "axios";

import { setBooks, setLoading, setError } from "../slices/books";

export const getBooks = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get("/api/books");
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
