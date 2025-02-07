import { ProductsCart } from "../../../types/CartTypes"
import { Products } from '../../../types/ProductsTypes';
import { create } from 'zustand';
interface Cart  {
    products : ProductsCart[],
    loadCart : () => void,
    addProduct : (data : ProductsCart) => void,
    updateQuantity : (id: number, newValue : number) => void,
    deleteProduct :(id  : number) => void,
    deleteCart : () => void;
}
const localStorageName  = 'ComafCart'
const getLocalStorage = () => {
    const products = localStorage.getItem(localStorageName)
    if(products == null) return false
    const data = JSON.parse(products)
    return data
}
const setLocalStorage = (products : ProductsCart[]) => {
    const data = JSON.stringify(products)
    return localStorage.setItem(localStorageName, data)
}



export const useCartStore = create<Cart>((set, get) : any => {
    return {
        products : [],
        addProduct : (data : ProductsCart) => {
            const { products } = get();
            products.push(data);
            setLocalStorage(products)
            set({products})
        },
        loadCart : () => {
            // const products = localStorage.getItem(localStorageName)
            const data = getLocalStorage()
            // console.log(data);
            if(!data) return 
            set({products : data})
            
        },
        updateQuantity(id : number , newValue: number){
            const { products } = get();
            const index = products.findIndex(pro => pro.id == id);
            if(index == -1) return;
            if(newValue <= 0 ){
                products[index].cantidad = 0;
                products.splice(index,1);
            }else{
                products[index].cantidad = newValue;
            }
            setLocalStorage(products);
            set({products : products});
        },
        deleteCart() {
            setLocalStorage([]);
            set({products : []});
        },
        deleteProduct :  ( id: number ) => {
            const { products } = get()
            const copyProducts = structuredClone(products)
            const index = copyProducts.findIndex(pro => pro.id === id)
            if(index == -1) return 
            copyProducts.splice(index,1)
            setLocalStorage(copyProducts)
            set({products : copyProducts})

        },  
    }
})