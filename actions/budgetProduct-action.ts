'use server'
import prisma from "@/lib/db"


export async function updateBudgetProduct (id : number, newPrice : number) {
    try {
        const updatedBP = await prisma.budgetProduct.update({where : {id : id}, data : {
            price : newPrice
        }})
        return { ok : true, message : 'BudgetProduct updated sucesfully'}
    } catch (error) {
        return { ok : false, error : error}
    }
}

export async function deleteBudgetProductById(idBudget : number ){
    try {
        const deletedBP = await prisma.budgetProduct.deleteMany({where : { budgetId : idBudget}});
        return { ok : true, message : 'BudgetProduct deleted succesfully!'}
    } catch (error) {
        return { ok : false, error : error}
    }
}