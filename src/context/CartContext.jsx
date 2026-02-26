import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (order) => {
    setCartItems(prev => [...prev, {
      ...order,
      cartId: Date.now() + Math.random(), // Unique ID for cart item
      addedAt: new Date()
    }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.cartId !== cartId) return item;
      const unitPrice = item.totalPrice != null && item.quantity > 0
        ? item.totalPrice / item.quantity
        : (item.drink?.price ?? item.price ?? 0);
      return {
        ...item,
        quantity: newQuantity,
        totalPrice: unitPrice * newQuantity
      };
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.totalPrice || (item.drink?.price || 0) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemsByStore = () => {
    const storeMap = {};
    cartItems.forEach(item => {
      const storeName = item.storeName || 'Unknown Store';
      if (!storeMap[storeName]) {
        storeMap[storeName] = [];
      }
      storeMap[storeName].push(item);
    });
    return storeMap;
  };

  // Alias for addToCart - supports different naming conventions
  const addItem = (item) => {
    const qty = item.quantity || 1;
    const unitPrice = item.price ?? item.drink?.price ?? 0;
    setCartItems(prev => [...prev, {
      ...item,
      cartId: Date.now() + Math.random(),
      quantity: qty,
      totalPrice: unitPrice * qty,
      addedAt: new Date()
    }]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      addItem,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      getItemsByStore
    }}>
      {children}
    </CartContext.Provider>
  );
};
