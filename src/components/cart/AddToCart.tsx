import React, { useState, useEffect } from 'react';
import { RopaItem } from '../../data/productData';
import { useCart } from '../../context/CartContext';
import AddToCartNotification from './AddToCartNotification';

interface AddToCartProps {
  item: RopaItem;
}

const AddToCart: React.FC<AddToCartProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isItemInCart, cartItems } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setIsInCart(isItemInCart(item.id));
  }, [cartItems, item.id, isItemInCart]);

  const handleIncrement = () => {
    if (quantity < item.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setQuantity(1);
    setShowNotification(true);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex items-center mb-2">
        <button
          onClick={handleDecrement}
          className="px-2 py-1 bg-gray-200 rounded-l"
          disabled={quantity === 1 || isInCart}
        >
          -
        </button>
        <span className="px-4 py-1 bg-gray-100">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="px-2 py-1 bg-gray-200 rounded-r"
          disabled={quantity === item.stock || isInCart}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={item.stock === 0 || isInCart}
      >
        {isInCart ? 'En el carrito' : item.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </button>
      <AddToCartNotification
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
};

export default AddToCart;