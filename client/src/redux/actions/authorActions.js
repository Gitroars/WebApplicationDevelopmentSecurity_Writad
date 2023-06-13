import axios from "axios";
import { getAuthorBooksRequest } from "../slices/author";

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
    const { data } = await axios.get("http://localhost:5000/api/books/submissions", config);
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
