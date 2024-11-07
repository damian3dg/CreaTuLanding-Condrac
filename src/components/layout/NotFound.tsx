import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">404 - Página no encontrada</h2>
      <p className="mb-4">Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-600">
        Volver a la página principal
      </Link>
    </div>
  );
}

export default NotFound;