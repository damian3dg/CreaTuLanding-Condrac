import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RopaItem } from '../../data/productData';
import ShimmerEffect from '../common/ShimmerEffect';
import { db } from '../../firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const [items, setItems] = useState<RopaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const Categories = ['pantalones', 'remeras', 'zapatillas'];


  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const allItems: RopaItem[] = [];
        
        if (categoryId && !Categories.includes(categoryId)) {
          // Si categoryId no es válido, redirigir a la página de NotFound
          navigate('/notfound');
          return;  // Detener la ejecución si no es una categoría válida
        }
        // Get all documents from the ropaItems collection
        const querySnapshot = await getDocs(collection(db, "ropaItems"));
        querySnapshot.forEach((doc) => {
          allItems.push({ id: doc.id, ...doc.data() } as RopaItem);
        });

       

        const filteredItems = categoryId && Categories.includes(categoryId)
          ? allItems.filter(item => item.categoria === categoryId)
          : allItems;

        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching items: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 my-6">{greeting}</h2>
      {loading ? (
        <ShimmerEffect />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img src={item.imagen} alt={item.nombre} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.nombre}</h3>
                <p className="text-indigo-600 text-lg font-bold">${item.precio.toFixed(2)}</p>
                <Link
                  to={`/item/${item.id}`}
                  className="mt-4 block w-full bg-indigo-500 text-white py-2 px-4 rounded transition duration-200 ease-in-out transform hover:bg-indigo-600 hover:-translate-y-1 text-center"
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemListContainer;