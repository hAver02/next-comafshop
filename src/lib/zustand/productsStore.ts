import { create } from "zustand";
import { Products } from "../../../types/ProductsTypes";

interface MainProducts {
    products : Products[]
    categoryId : number
    subcategoryId : number,
    getProducts : (limit : number, page : number) => void
    totalPages : number,
    currentPage : number
}


export const MainProductsStore =  create<MainProducts>((set, get)  : any => {
    return{
        products : [],
        categoryId : null,
        subcategoryId : null,
        getProducts : (limit : 10, page : 1) => {
            const { products } = get()
            set({products : products})
        },
        totalPages : null,
        currentPage : 1

    }
})