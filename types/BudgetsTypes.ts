import { Products } from "./ProductsTypes"
import { User } from "./UserType"

export interface BudgetProducts {
    id :number
    budgetId : number
    ProductId : number
    quantity : number
    price : number
    product : Products
}



export interface Budgets { 
    id : number
    userId : number
    totalAmount : number
    answered : boolean
    budgetProducts : BudgetProducts[]
    user : User
}
