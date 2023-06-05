import axios from "axios";
import { setLoading, setBooks, setError } from "../slices/library";

export const getBooks = () => async (dispatch, getState) => {
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
    const { data } = await axios.get(`http://localhost:5000/api/library/${userInfo._id}`, config);

    dispatch(setBooks(data));
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : "An unexpected error has occured. Please try again later"
    );
  }
};
