import { useState, useEffect, createContext } from 'react';
import { Cart } from '@/api';

export const CartContext = createContext();
const cartCtrl = new Cart();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartCtrl.count());

  useEffect(() => {
    const response = cartCtrl.getAll();
    setCart(response);
  }, []);

  const addCart = (bookId) => {
    cartCtrl.add(bookId);
    refreshTotalCart();
  };

  const changeQuantityItem = (bookId, quantity) => {
    cartCtrl.changeQuantity(bookId, quantity);
    refreshTotalCart();
  };

  const deleteItem = (bookId) => {
    cartCtrl.delete(bookId);
    refreshTotalCart();
  };

  const deleteAllItems = () => {
    cartCtrl.deleteAll();
    refreshTotalCart();
  };

  const refreshTotalCart = () => {
    setTotal(cartCtrl.count());
    setCart(cartCtrl.getAll());
  };

  const data = {
    cart,
    total,
    addCart,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
