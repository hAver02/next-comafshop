'use client'

import { useEffect, useState } from "react";
import { Products } from "../../types/ProductsTypes";
import useWindowSize from './useWindowSize';
interface props {
    products : Products[]
}

export default function RequestedProducts({products} : props){
    const { width } : any = useWindowSize();
    const [currentIndex, setCurrentIndex] = useState(0);

    const itemsPorPage = width > 1200 ? 5 : width > 900 ? 4 : width > 600 ? 3 : 2;
    const displayedProducts = products.slice(currentIndex, currentIndex + itemsPorPage);
    console.log(itemsPorPage, products.length);
    
    const areThereArrows = products.length > itemsPorPage ? true : false;
    const handleNext = () => {
      if (currentIndex + itemsPorPage < products.length) {
        setCurrentIndex(currentIndex + itemsPorPage);
      }
    };
  
    const handlePrev = () => {
      if (currentIndex - itemsPorPage >= 0) {
        setCurrentIndex(currentIndex - itemsPorPage);
      }
    };

  
    return (
      <div className="relative bg-black mb-5 flex flex-col gap-2 items-center rounded-xl">
        <h2 className="text-red-500  text-xl items-center font-extralight">PRODUCTOS SOLICITADOS</h2>
        <div className="product-grid">
          {displayedProducts.map(product => (
            <div key={product.id} className="product-card max-w-[200px]">
              <img src={product.image} alt={product.name} className="max-h-150px max-w-[200px]" />
              <h3>{product.name}</h3>
              <p className="text-black">${product.price}</p>
            </div>
          ))}
        </div>
          {
            areThereArrows &&
            <div className="">
            <button className="absolute z-10 left-2 top-1/2" onClick={handlePrev} disabled={currentIndex === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
            </button>
            <button className="absolute z-10 right-2 top-1/2"  onClick={handleNext} disabled={currentIndex + itemsPorPage >= products.length}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
          }
      </div>
    );
}