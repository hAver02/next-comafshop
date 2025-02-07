'use server'

import ProductCard from "@/components/ProductCard"
import { ProductsCart } from "../types/CartTypes"
import prisma from "@/lib/db"


export const createBudget = async (email : string, products : ProductsCart[]) => {
    try {
        if(!products || !email || products.length == 0) return { ok :false, error : 'Incorrect data sent'};
        const user = await prisma.user.findUnique( { where : {email : email}});
        if(!user) return { ok : false, error : 'Error con el user'};
        
        const newBudget = await prisma.budget.create({ data : {
            userId : user.id,
            totalAmount : 0
        }})
        let amount = 0;
        const budgetProducts = await Promise.all(
            products.map(async (pro) => {
                const totalProduct = pro.price * pro.cantidad;
                amount += totalProduct;

                await prisma.budgetProduct.create({
                    data : {
                        budgetId : newBudget.id,
                        productId : pro.id,
                        quantity : pro.cantidad,
                        price : pro.price
                        
                    }
                })
            })
        )

        await prisma.budget.update({where : {id : newBudget.id}, data : {totalAmount : amount}});
        
        return { ok : true, message : 'Budget created succesfully'};
    } catch (error) {
        return { ok : false, error : error}
    }
}

export const updateTotalBudget = async (id : number, newTotal: number) =>{
    try {
        const updatedBudget = await prisma.budget.update({ where : { id : id}, data : { totalAmount : newTotal}});
        return { ok : true, message : 'Budget updated sucesfully!'}
    } catch (error) {
        return { ok  : false, error : error}
    }
}

export const updateAnswered = async (id : number) => {
    try {
        const data = await prisma.budget.update({where : { id : id}, data : {answered : true}});
        return { ok : true, message : 'budget updated succesfully!'}
    } catch (error) {
        return { ok : false, meesage:'something went wrong!'}
    }
}


export const deleteBudget = async (id : number) => {
    try {
        const budgetDeleted = await prisma.budget.delete({where : { id : id}})
        return { ok : true, message : 'Budget deleted succesfully!'}
    } catch (error) {
        console.log(error);
        return { ok : false, message : 'Error deleting budget!'}
                
    }
}