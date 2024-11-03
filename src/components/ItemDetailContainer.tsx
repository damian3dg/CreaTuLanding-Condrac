import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RopaItem, ropaItem } from '../data/productData';
import AddToCart from './AddToCart';
import Loader from './Loader';

const ItemDetailContainer: React.FC = () => {
  const [item, setItem] = useState<RopaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams<{ itemId: string }>();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const foundItem = ropaItem.find(i => i.id === Number(itemId));
      setItem(foundItem || null);
      setLoading(false);
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return <Loader />;
  }

  if (!item) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img src={item.imagen} alt={item.nombre} className="h-48 w-full object-cover md:w-48" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{item.categoria}</div>
          <h2 className="mt-1 text-2xl font-semibold text-gray-900">{item.nombre}</h2>
          <p className="mt-2 text-gray-600">{item.descripcion}</p>
          <div className="mt-4 text-xl font-bold text-gray-900">${item.precio.toFixed(2)}</div>
          <p className="mt-2 text-sm text-gray-600">Stock disponible: {item.stock}</p>
          <AddToCart item={item} />
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;