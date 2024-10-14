import React from 'react';
import {Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="Bienvenido a El Ropero!" />} />
            <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por categoría" />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;