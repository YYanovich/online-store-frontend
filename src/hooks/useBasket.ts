import {
  addToBasket,
  getBasket,
  removeFromBasket,
  clearBasket,
} from "../store/basketSlice";
import type { AppDispatch, RootState } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
export const useBasket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const basketState = useSelector((state: RootState) => state.basket);
  const { items, loading, error } = basketState;
  const addItem = (deviceId: number) => {
    dispatch(addToBasket(deviceId));
  };
  const getItems = () => {
    dispatch(getBasket());
  };
  const deleteItem = (item: number) => {
    dispatch(removeFromBasket(item));
  };
  const clearItems = () => {
    dispatch(clearBasket());
  };
  const totalPrice = items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
  const itemsCount = items.length;
  return {
    items,
    loading,
    error,
    addItem,
    getItems,
    deleteItem,
    clearItems,
    totalPrice,
    itemsCount,
  };
};
