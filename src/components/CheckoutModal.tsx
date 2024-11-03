import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'thanks'>('form');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    if (step === 'thanks') {
      const timer = setTimeout(() => {
        onClose();
        clearCart();
        navigate('/');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, onClose, clearCart, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('thanks');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {step === 'form' ? 'Finalizar compra' : 'Gracias por su compra'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {step === 'form' ? (
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
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Aceptar
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-xl">Gracias por su compra</p>
            <p className="text-sm text-gray-500 mt-2">Redirigiendo a la página principal...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;