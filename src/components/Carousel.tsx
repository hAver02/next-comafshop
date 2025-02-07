'use client'
import { useEffect, useState } from 'react';

const Carousel = () => {
  const slides = [
    { image: '/comafjp.jpg', text: 'Materiales Comaf.' },
    { image: '/comafjp.jpg', text: 'Mejores precios de Zona Norte.' },
    { image: '/comafjp.jpg', text: 'Atencion dedicada para cada cliente.' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [textAnimation, setTextAnimation] = useState(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTextAnimation(true); 
      setTimeout(() => {
        setTextAnimation(false); 
      }, 1000); 
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 
    return () => clearInterval(interval);
  }, [slides.length]);


  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
      <div
        className="flex transition-transform ease-in-out duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img
              src={slide.image}
              alt={slide.text}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center bg-black bg-opacity-50">
              <h2
                className={` text-3xl font-bold text-blue-700 font-seriftransition-transform duration-700 w-1/3 text-end${
                  textAnimation ? 'animate-slide-in' : ''
                }`}
              >
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;