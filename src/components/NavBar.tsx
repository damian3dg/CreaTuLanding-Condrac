import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import { ropaItem } from '../data/productData';
import { Shirt } from 'lucide-react';

const NavBar: React.FC = () => {
  const categories = Array.from(new Set(ropaItem.map(item => item.categoria)));

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      <div className="flex items-center"> 
      <Shirt className="h-6 w-6 text-gray-800 mr-2" /> 
      <Link to="/" className="text-xl font-bold text-gray-800" >
        EL ROPERO
      </Link>
    </div>
        <div className="flex items-center">
          {categories.map((categoria) => (
            <Link
              key={categoria}
              to={`/category/${categoria}`}
              className="text-gray-800 hover:text-gray-600 mx-4"
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </Link>
          ))}
          <CartWidget />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;