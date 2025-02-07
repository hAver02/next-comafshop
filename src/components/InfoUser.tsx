'use client'
import { useState } from "react";
import { deleteBudget } from "../../actions/auth-budget";
import { deleteBudgetProductById } from "../../actions/budgetProduct-action";
import { Budgets } from "../../types/BudgetsTypes";

interface props {
    budgets : Budgets[]
}

export default function InfoUser({budgets} : props) {
    const [budgetUsers, setBudgetUsers] = useState(budgets);
    const handleDelete = async (id : number) => {
        const res1 = await deleteBudgetProductById(id);
        if(!res1.ok) return 
        const res = await deleteBudget(id);
        if(!res.ok) return;
        const copyBudget = structuredClone(budgetUsers);
        const index = copyBudget.findIndex(bud => bud.id == id);
        copyBudget.splice(index,1);
        setBudgetUsers(copyBudget);
        
    }
    return (
        <div className="flex flex-col gap-4 p-6 bg-gray-100  rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Tus Presupuestos</h3>
            {budgetUsers.length > 0 ? (
            budgetUsers.map((budget) => (
                <div key={budget.id} className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm transition duration-200 hover:shadow-md">
                <div className="flex justify-evenly items-center">
                    <h4 className="font-semibold text-lg text-green-600">Presupuesto ID: {budget.id}</h4>
                    {budget.answered ? <h3 className="text-lg font-semibold text-green-600" >Presupuesto contestado</h3> : <h3 className="text-lg font-semibold text-red-500">Presupuesto en espera</h3>}
                </div>
                {budget.answered &&  <p className="text-gray-600">Total: <strong>${budget.totalAmount.toFixed(2)}</strong></p>}
                <h5 className="font-semibold mt-2">Productos:</h5>
                <ul className="list-disc ml-5">
                    {budget.budgetProducts.map((item) => (
                    <li key={item.id} className="text-gray-800">
                        {item.quantity} - {item.product.name}  { budget.answered &&  <strong>- ${item.price.toFixed(2)}</strong>}
                    </li>
                    ))}
                </ul>
                <div className="flex justify-end mt-4">
                    {!budget.answered && 
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">
                            Editar
                        </button>
                    } 
                    <button
                        onClick={() => handleDelete(budget.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 ml-2">
                            Eliminar
                    </button>
                </div>
                </div>
            ))
            ) : (
            <p className="text-gray-600">No tienes presupuestos disponibles.</p>
            )}
      </div>
    )
}