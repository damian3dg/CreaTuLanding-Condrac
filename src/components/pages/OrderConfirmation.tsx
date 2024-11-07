// src/components/OrderConfirmation.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Loader from '../common/Loader';

interface OrderItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface Order {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  items: OrderItem[];
  total: number;
  fecha: Date;
}

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const orderDoc = await getDoc(doc(db, 'ventas', orderId));
        if (orderDoc.exists()) {
          setOrder(orderDoc.data() as Order);
        }
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <div>Orden no encontrada</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Confirmación de Orden</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Gracias por su compra, {order.nombre}!</h2>
        <p className="mb-4">Su número de orden es: <strong>{orderId}</strong></p>
        <h3 className="text-xl font-semibold mb-2">Detalles de la orden:</h3>
        <ul className="mb-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.nombre} x {item.cantidad}</span>
              <span>${(item.precio * item.cantidad).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold">Total: ${order.total.toFixed(2)}</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;