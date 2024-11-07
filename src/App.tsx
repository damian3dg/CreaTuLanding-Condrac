


import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import ItemListContainer from './components/products/ItemListContainer';
import ItemDetailContainer from './components/products/ItemDetailContainer';
import NotFound from './components/layout/NotFound';
import { CartProvider } from './context/CartContext';
import BannerSlider from './components/layout/BannerSlider';
import OrderConfirmation from './components/pages/OrderConfirmation';
import Footer from './components/layout/Footer';
import MainFooter from './components/layout/MainFooter';

const App: React.FC = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
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
                } /> 
              <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por categoría" />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

            </Routes>
          </main>
          {/* Si es la home muestra el footer y MainFooter */}
          {isHomePage && <Footer />}
          {isHomePage && <MainFooter />}
        </div>
      
    </CartProvider>
  );
}

export default App;