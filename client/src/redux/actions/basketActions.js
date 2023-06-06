import axios from "axios";
import { setLoading, setError, basketItemAdd, basketItemRemoval, clearBasket } from "../slices/basket";

export const addBasketItem = (id, quantity) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
    const bookToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      quantity,
    };
    dispatch(basketItemAdd(bookToAdd));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occurred. Please try again later"
      )
    );
  }
};

export const removeBasketItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(basketItemRemoval(id));
};

export const resetBasket = () => (dispatch) => {
  dispatch(clearBasket());
};
