import React, { useState } from 'react';
import { RopaItem } from '../data/productData';

interface AddToCartProps {
  item: RopaItem;
  onAddToCart: (quantity: number) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

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
    onAddToCart(quantity);
    setQuantity(1); // Resetea la cantidad luego de agregarse al carro
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex items-center mb-2">
        <button
          onClick={handleDecrement}
          className="px-2 py-1 bg-gray-200 rounded-l"
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="px-4 py-1 bg-gray-100">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="px-2 py-1 bg-gray-200 rounded-r"
          disabled={quantity === item.stock}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        disabled={item.stock === 0}
      >
        {item.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </button>
    </div>
  );
};

export default AddToCart;