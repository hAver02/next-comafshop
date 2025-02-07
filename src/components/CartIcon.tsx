'use client'

import { useCartStore } from "../lib/zustand/store"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartIcon(){
    const pathname = usePathname();

    
    const router = useRouter();
    const { products, loadCart, deleteCart, deleteProduct } = useCartStore();
    const [cart, setCart] = useState(false);
    useEffect(() => {
        loadCart()
    },[])

    
    return(
<div className="flex items-center justify-center">
        {cart ? 
        <div className="border-2 bg-slate-200 w-[350px] h-[calc(100vh-7rem)] border-red-400 rounded-xl flex flex-col" onMouseLeave={() => setCart(false)}>
            <div className="flex items-center justify-center text-red-500 font-bold mt-2">
                <Link href={'/cart'} className="text-xl">
                    CARRRITO DE COMPRAS 
                </Link>
            </div>
            <div className="flex h-full justify-between">
                {
                products.length == 0 ?
                <div className="text-white flex flex-col gap-3 items-center justify-center w-full">
                    <h3 className="text-black">Carrito vacio</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                </div> :
                <div className="w-full h-full px-1 mt-2 flex flex-col gap-2 justify-between"> 
                    <div className="overflow-y-auto">
                        {products.map(pro => (
                            <div key={pro.id} className="border-2 my-2 border-black shadow-md rounded-lg w-full flex gap-2">
                                <img src={pro.image} alt={pro.name}  className="h-[70px] w-1/2 px-2"/>
                                <div className="w-1/2 flex gap-2 justify-between items-center">
                                    <div className="flex flex-col gap-2 h-full justify-center">
                                        <p className="text-lg">{pro.name}</p>
                                        <span className="font-semibold">Cantidad: {pro.cantidad}</span>
                                    </div>
                                    <svg onClick={() => deleteProduct(pro.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-evenly mb-5">
                        <button onClick={() => router.push('/cart') } className="border-2 border-green-300 px-3 py-2 rounded-lg bg-slate-300 text-lg font-semibold hover:text-white hover:bg-green-300">Presupuestar</button>
                        <button onClick={() => deleteCart()} className="border-2 border-red-300 px-3 py-2 rounded-lg bg-slate-300 text-lg font-semibold hover:text-white hover:bg-red-300">Vaciar carrito</button>
                    </div>
                </div>
                
                }
            </div>
        </div> 
        :
        <div onMouseEnter={() => setCart(true)} className="relative"  >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${pathname == '/cart' ? 'text-black' : ' text-white' } w-12 h-12 ` }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="text-red-600 font-bold text-2xl absolute left-7 bottom-0">{products.length}</span>
        </div>
}
        </div>
    )
}