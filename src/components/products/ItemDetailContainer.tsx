import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RopaItem } from '../../data/productData';
import AddToCart from '../cart/AddToCart';
import Loader from '../common/Loader';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Truck, Shield } from 'lucide-react';

const ItemDetailContainer: React.FC = () => {
  const [item, setItem] = useState<RopaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams<{ itemId: string }>();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);

      if (!itemId) {
        console.error("El item id es undefined");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "ropaItems", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() } as RopaItem);
        } else {
          setItem(null);
        }
      } catch (error) {
        console.error("Error fetching item: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return <Loader />;
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Producto no encontrado</h2>
        <Link to="/" className="mt-4 inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a la tienda
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img src={item.imagen} alt={item.nombre} className="h-96 w-full object-cover md:h-full" />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">{item.categoria}</div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{item.nombre}</h1>
            <p className="mt-4 text-gray-600">{item.descripcion}</p>
            <div className="mt-6 text-3xl font-bold text-gray-900">${item.precio.toFixed(2)}</div>
            <p className="mt-2 text-sm text-gray-600">Stock disponible: {item.stock}</p>
            
            <div className="mt-6">
              <AddToCart item={item} />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Características del producto</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  Envío gratis en compras superiores a $999
                </li>
                <li className="flex items-center text-gray-600">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Garantía de devolución de 30 días
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;