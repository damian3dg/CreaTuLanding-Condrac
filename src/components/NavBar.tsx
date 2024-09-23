import { Link } from 'react-router-dom';
import CartWidget from './CartWidget'
import React from 'react'

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          El ropero
        </Link>
        <div className="flex items-center">
          <Link to="/productos" className="text-gray-800 hover:text-gray-600 mx-4">
            Productos
          </Link>
          <Link to="/nosotros" className="text-gray-800 hover:text-gray-600 mx-4">
            Nosotros
          </Link>
          <Link to="/contacto" className="text-gray-800 hover:text-gray-600 mx-4">
            Contacto
          </Link>
          <CartWidget />
        </div>
      </div>
    </nav>
  )
}