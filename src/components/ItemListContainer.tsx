import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RopaItem, ropaItem } from '../data/productData';

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const [items, setItems] = useState<RopaItem[]>([]);
  const { categoryId } = useParams<{ categoryId: string }>();

  useEffect(() => {
    // Se simula una llamada a la api
    const fetchItems = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulamos un delay del servidor
      const filteredItems = categoryId
        ? ropaItem.filter(item => item.categoria === categoryId)
        : ropaItem;
      setItems(filteredItems);
    };

    fetchItems();
  }, [categoryId]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{greeting}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.imagen} alt={item.nombre} className="w-full h-48 object-contain" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.nombre}</h3>
              <p className="text-gray-600">${item.precio.toFixed(2)}</p>
              <Link
                to={`/item/${item.id}`}
                className="mt-4 block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
              >
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;