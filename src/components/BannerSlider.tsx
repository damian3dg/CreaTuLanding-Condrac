import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';




interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image: "/images/bremera7.jpg",
    title: "DROPSET 3",
    subtitle: "Para tu dia a dia",
    buttonText: "COMPRAR AHORA"
  },
  {
    id: 2,
    image: "/images/bremera5.jpg", // Ruta directa desde `public`
    title: "OFERTA ESPECIAL",
    subtitle: "Descuentos en ropa lisa sin estampas",
    buttonText: "VER OFERTAS"
  },
  {
    id: 3,
    image: "/images/remera6.jpg", // Ruta directa desde `public`
    title: "NUEVA COLECCIÓN",
    subtitle: "Descubre lo último en moda ",
    buttonText: "EXPLORAR"
  }
];

const BannerSlider: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-2xl font-bold">{banner.title}</h2>
            <p className="text-sm mb-2">{banner.subtitle}</p>
            <button className="bg-white text-black px-4 py-2 rounded flex items-center">
              {banner.buttonText}
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={prevBanner}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextBanner}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default BannerSlider;