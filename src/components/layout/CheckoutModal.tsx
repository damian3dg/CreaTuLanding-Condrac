import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RopaItem } from '../../data/productData';
import { collection, doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckoutComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onCheckoutComplete }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const stockCheckResult = await checkAndUpdateStock(cartItems as RopaItem[]);
      if (Array.isArray(stockCheckResult)) {
        setError(`Los siguientes productos no tienen suficiente stock: ${stockCheckResult.join(', ')}`);
        setIsProcessing(false);
        return;
      }

      const order = {
        ...formData,
        items: cartItems.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.quantity,
        })),
        total: getCartTotal(),
        fecha: new Date(),
      };

      const orderId = await saveOrder(order);
      clearCart();
      setIsProcessing(false);
      onCheckoutComplete(); // Close both modals
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      setError('Hubo un error al procesar su orden. Por favor, intente nuevamente.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Finalizar compra</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={isProcessing}
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={isProcessing}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={isProcessing}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={isProcessing}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={isProcessing}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Procesando...' : 'Aceptar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

 const checkAndUpdateStock = async (cartItems: any) => {
  const batch = writeBatch(db);
  const outOfStockItems = [];

  for (const item of cartItems) {
    const itemRef = doc(db, 'ropaItems', item.id.toString());
    const itemDoc = await getDoc(itemRef);

    if (itemDoc.exists()) {
      const currentStock = itemDoc.data().stock;
      if (currentStock >= item.quantity) {
        batch.update(itemRef, { stock: currentStock - item.quantity });
      } else {
        outOfStockItems.push(item.name);
      }
    }
  }

  if (outOfStockItems.length === 0) {
    await batch.commit();
    return true;
  } else {
    return outOfStockItems;
  }
};

 const saveOrder = async (order:any) => {
  const orderRef = doc(collection(db, 'ventas'));
  await setDoc(orderRef, order);
  return orderRef.id;
};

export default CheckoutModal;