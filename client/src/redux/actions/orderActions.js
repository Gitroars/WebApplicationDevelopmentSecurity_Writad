import axios from "axios";
import { setError, clearOrder } from "../slices/order";

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  const preparedOrder = { ...order };
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/orders", preparedOrder, config);
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder);
};
