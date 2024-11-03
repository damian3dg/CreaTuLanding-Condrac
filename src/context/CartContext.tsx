import React, { createContext, useState, useContext, ReactNode } from 'react';
import { RopaItem } from '../data/productData';

interface CartItem extends RopaItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: RopaItem, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  isItemInCart: (itemId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: RopaItem, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + quantity, cartItem.stock) }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: Math.min(quantity, item.stock) }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(Math.max(newQuantity, 0), item.stock) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  const isItemInCart = (itemId: number) => {
    return cartItems.some(item => item.id === itemId);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartTotal,
      isItemInCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};