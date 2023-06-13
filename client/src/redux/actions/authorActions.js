import axios from "axios";
import { getAuthorBooksRequest } from "../slices/author";
import { setLoading } from "../slices/user";

export const fetchAuthorBooks = () => async (dispatch, getState) => {
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
    const { data } = await axios.get(`http://localhost:5000/api/books/submissions/${userInfo._id}`, config);
    dispatch(getAuthorBooksRequest(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Users could not be fetched."
      )
    );
  }
};

export const createBook = (name, image, category, description, price) => async (dispatch) => {
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
      `http://localhost:5000/api/books/author/submit/${userInfo._id}`,
      { authorId: id, name, image, category, description, price },
      config
    );
    dispatch(create);
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
