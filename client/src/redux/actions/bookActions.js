import axios from "axios";

import { setBooks, setLoading, setError, setBook, bookReviewed, resetError, setChapter } from "../slices/books";

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

export const getBookChapter = (id, ch) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`http://localhost:5000/api/books/${id}/${ch}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(setChapter(data));
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

export const createBookReview = (bookId, userId, comment, rating, title) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/books/reviews/${bookId}`,
      { comment, userId, rating, title },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(bookReviewed());
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

export const resetBookError = () => async (dispatch) => {
  dispatch(resetError());
};
