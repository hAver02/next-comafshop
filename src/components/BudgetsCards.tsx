'use client'


import { useEffect, useState } from "react";
import { BudgetProducts, Budgets } from "../../types/BudgetsTypes";
import { updateBudgetProduct } from "../../actions/budgetProduct-action";
import { updateAnswered, updateTotalBudget } from "../../actions/auth-budget";

import axios from "axios";
import { useBudgetStor } from "@/lib/zustand/budgetStore";
// import { sendEmail } from "@/lib/resend"
// import { sendEmail } from "@/lib/brevo";

interface Props {
    budgets : Budgets[]
}
export default function BudgetsCard({budgets} : Props){
    const { saveBudget, budgets : budgs, deleteBudget } = useBudgetStor()
    const [modify, setModify] = useState(false)
    const [idModify, setIdModify] = useState<Number>(0)
    const [newPrices, setNewPrices] = useState({})

    useEffect(() => {
        saveBudget(budgets);
    }, [])
    
    const handlePresupuesto = async (budget : Budgets)=> {
        try {
            const { totalAmount, budgetProducts, user } = budget;
            const {data} = await axios.post('/api/send', {totalAmount, budgetProducts, user});
            if(!data.ok) {
                return;
                //hacer algo
            }
            const updatedAnswered = await updateAnswered(budget.id);
            deleteBudget(budget.id)
            
        } catch (error) {
           console.log(error);
            
        }  
        
    }

    const handleUpdatePrices = async () => {
        try {
            if(Object.entries(newPrices).length == 0 ){
                return;
            }
            const budget = budgs.find((bud) => bud.id == idModify );
            if(!budget) return
            let total = budget?.totalAmount || 0;
            await Promise.all(Object.entries(newPrices).map(async (newPr) => {
                const budgetProduct = budget?.budgetProducts.find(bg => bg.id == Number(newPr[0]))
                if(budgetProduct?.price == Number(newPr[1]) || !budgetProduct)return
    
                if(budgetProduct?.price < Number(newPr[1])){
                    total = total + ((Number(newPr[1]) - budgetProduct?.price) * budgetProduct.quantity)
                }else{               
                    total = total - (budgetProduct.price - Number(newPr[1]) * budgetProduct.quantity );
                }
                const data = await updateBudgetProduct(Number(newPr[0]), Number(newPr[1]));    
            }))
            await updateTotalBudget(budget.id, total)
            setIdModify(0);
            setNewPrices({});
            setModify(false)
            window.location.reload();
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const handleChangePrince =  (newPrice : number, budgetProductId : number) => {
        // console.log('handle change price');
        const newPricesCopy : any = structuredClone(newPrices);
        newPricesCopy[`${budgetProductId}`] = newPrice;
        setNewPrices(newPricesCopy)
    }

    return (
        <>
            <div className="flex items-center justify-center ">
                <h1 className="text-black font-bold text-2xl text-center ">Informacion Adminisitrador</h1>
            </div>
   
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-5">
                {budgs.map((budget) => (
                <div key={budget.id} className="bg-white p-3 rounded-lg shadow-md hover:shadow-xl h-80 w-full overflow-y-auto transition-shadow border-2 border-red-500">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Presupuesto #{budget.id}</h2>
                    <p className="text-gray-600">Usuario: <span className="font-medium">{budget.user.email}</span></p>
                    <p className="text-red-400 mb-4">Monto total: <span className="font-medium">${budget.totalAmount.toFixed(2)}</span></p>
                    
                    <p className="text-gray-700 font-semibold mb-2">Productos solicitados:</p>
                    <ul className="divide-y divide-gray-200">
                    {budget.budgetProducts.map((bp : BudgetProducts) => (
                        <li key={bp.id} className="py-2">
                        <div className="flex justify-between">
                            <span>{bp.product.name} (x{bp.quantity})</span>
                            {(modify && idModify == budget.id)  ? 
                                <input type="number" name={bp.id.toString()} 
                                    onChange={((e) => handleChangePrince(Number(e.target.value), bp.id))} 
                                    defaultValue={bp.price} 
                                /> 
                            :
                                <span className="font-medium">${bp.price.toFixed(2)}</span>
                            }   
                        </div>
                        </li>
                    ))}
                    </ul>
                    {(modify && idModify == budget.id) ?
                        <div className="mt-4 grid grid-cols-2 h-[2rem] mb-1 gap-4 justify-center ">
                            <button
                                onClick={() => handleUpdatePrices()} 
                            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                Aceptar
                            </button>
                            <button
                                onClick={()  => {
                                    setNewPrices({})
                                    setModify(false)
                                }}
                            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                Cancelar
                            </button>
                        </div>
                    :
                        <div className="mt-4 grid grid-cols-2 h-[2rem] mb-1 gap-4">
                            <button
                                onClick={() => handlePresupuesto(budget)} 
                            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                Enviar Presupuesto
                            </button>
                            <button
                                onClick={()  => {
                                    setModify(true)
                                    setIdModify(budget.id)
                                }}
                                
                            className="w-full  bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                Modificar Valor
                            </button>
                        </div>
                    }
                </div>
            ))}
      </div>
        
        
        </>
    )
}