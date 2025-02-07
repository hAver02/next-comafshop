'use client'

import { useCartStore } from "@/lib/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { createBudget } from "../../actions/auth-budget";

interface Props {
    email : string
}

export default function CartProducts ({ email } : Props) {
    const { products, deleteProduct, updateQuantity, loadCart, deleteCart} = useCartStore();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    async function handleBudget() {
        startTransition( async () => {
            const res = await createBudget(email, products);
            if(res.ok){
                deleteCart()
                router.push('/products');
            }else{
                console.log(res.error);
                
            }
            
    })}
    useEffect(() => {
        loadCart()
    },[])
    
    return (
        <div className="h-full flex flex-col w-full py-10 gap-5 2xl:w-4/5 2xl:m-auto px-2 bg-white">
                <div className="flex flex-col items-center text-white">
                    <h1 className="px-2 text-gray-400 text-xl sm:text-2xl md:text-3xl font-bold">Lista de presupuesto</h1>
                    <span className="text-red-500 text-base md:text-lg px-2">Tener en cuenta que los pedidos de presupuesto, no son una confirmacion de compra.</span>
                    <span className="md:block hidden text-red-500 text-base md:text-lg">Una vez solicitado el presupuesto el equipo de Comaf se contactara con ustedes para seguir adelante con la compra.</span>
                </div>
                <div className="flex flex-col items-center gap-2 mx-2 lg:m-0">
                    {products.map(pro => (
                        <div key={pro.id} className="border-2 rounded-xl shadow-blue-900 shadow-inner w-full xl:w-4/5 flex justify-between items-center py-1 px-2 ">
                            <img src={pro.image} alt={pro.name}  className="h-[50px] sm:h-[60px] lg:h-[70px] 2xl:h-[100px] w-1/6 rounded-md"/>
                            <div className="flex flex-col">
                                <span className="text-black">{pro.name}</span>
                                <span className="sm:text-base text-sm text-black opacity-4">{pro.description}</span>
                            </div>
                            <div>
                                <input className="w-1/2 rounded-sm px-2 py-2 bg-blue-900 text-white" type="number" defaultValue={pro.cantidad} 
                                    onChange={(e) => updateQuantity(pro.id, Number(e.target.value))} 
                                />
                            </div>
                            <div>
                                <svg onClick={() => deleteProduct(pro.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" cursor-pointer sm:w-11 sm:h-11 h-8 w-8 text-black border-2 border-blue-900 rounded-xl hover:bg-blue-900">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-10">
                    <button onClick={() => router.push('/products')} className="border-2 border-blue-900 px-4 py-2 rounded-xl bg-gray-400 hover:bg-red-500 hover:text-white">Volver a productos</button>
                    <button onClick={() => handleBudget()} 
                        className="border-2 border-blue-900 px-4 py-2 rounded-xl bg-gray-400 hover:bg-green-500 hover:text-white">Realizar presupuesto</button>
                </div>
        </div>
    )
}