import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

interface CartSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidePanel: React.FC<CartSidePanelProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 overflow-hidden z-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Carrito de compras</h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">Cerrar panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.nombre}</h3>
                                  <p className="ml-4">${(item.precio * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.categoria}</p>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="p-1 text-gray-400 hover:text-gray-500 disabled:opacity-50"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="mx-2 text-gray-700">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.stock}
                                    className="p-1 text-gray-400 hover:text-gray-500 disabled:opacity-50"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${getCartTotal().toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setIsCheckoutModalOpen(true)}
                      className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full"
                    >
                      Finalizar compra
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      o{' '}
                      <button
                        type="button"
                        className="text-indigo-600 font-medium hover:text-indigo-500"
                        onClick={onClose}
                      >
                        Continuar comprando<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </>
  );
};

export default CartSidePanel;