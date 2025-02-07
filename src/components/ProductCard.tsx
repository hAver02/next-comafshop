'use client'

import { useCartStore } from "../lib/zustand/store";
import { Products } from "../../types/ProductsTypes";


interface ProductCardProps {
  product : Products
}

export default function ProductCard({product} : ProductCardProps ){
  const { addProduct, products, updateQuantity } = useCartStore(); 
  
  function isItInTheCart(id : number){
    const findProduct = products.findIndex(pro => pro.id == id);
    if(findProduct == -1) return false;
    return true
  }
  function quantityInCart(id : number) {
    return products.find(pro => pro.id == id)?.cantidad;
  }
  return(
      <div key={product.id} className="flex mt-2 rounded-xl bg-gray-300  w-[250px] h-[280px] flex-col justify-center px-4 items-center shadow-md shadow-white  py-1">
          <img className="h-[170px] w-[200px] items-center flex " src={product.image || 'data:image/jpeg;base64,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'} alt="" />
          <p className="text-sm font-serif text-red-600 font-semibold text-center">{product.description}</p>
          <div className="flex items-center justify-between font-bold text-lg text-black gap-4"> 
            <p>{product.name}</p>
            <span>$ {product.price}</span>
          </div>
          {
          isItInTheCart(product.id) ?
          <div className="flex justify-center">
            <input 
              onChange={(e) => updateQuantity(product.id ,Number(e.target.value))} 
              className="w-1/2 px-1 rounded-md text-center" type="number" defaultValue={quantityInCart(product.id)} />
          </div>
          :
          <button
            onClick={() => {
              addProduct({...product, cantidad : 1});
            }}
            className="px-2 py-1 border-2 rounded-xl border-red-400 text-pretty font-bold w-1/2 hover:bg-red-500 hover:text-white ">
              Add Cart
          </button>
          }
      </div>
    )
}