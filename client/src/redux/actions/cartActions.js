import axios from "axios";
import { setLoading, setError, basketItemAdd } from "../redux/slices/basket";

export const addBasketItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/books/${id}`);
    const bookToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
    };
    dispatch(basketItemAdd(bookToAdd));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occurred"
      )
    );
  }
};
