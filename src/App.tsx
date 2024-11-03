


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './components/NotFound';
import { CartProvider } from './context/CartContext';
import BannerSlider from './components/BannerSlider';

const App: React.FC = () => {
  return (
    <CartProvider>
      
        <div className="min-h-screen bg-gray-100">
          <NavBar />
          <main className="container mx-auto mt-8 p-4">
            <Routes>
            <Route path="/" element={
                  <>
                    <BannerSlider />
                    <ItemListContainer greeting="Bienvenido a nuestra tienda de ropa" />
                  </>
                } />              <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por categoría" />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      
    </CartProvider>
  );
}

export default App;