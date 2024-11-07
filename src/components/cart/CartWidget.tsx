import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartSidePanel from './CartSidePanel';

const CartWidget: React.FC = () => {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <button
        className="relative p-2 bg-transparent border-none cursor-pointer"
        onClick={handleCartClick}
      >
        <ShoppingCart className="h-6 w-6 text-gray-800" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </button>
      <CartSidePanel isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );
}

export default CartWidget;
