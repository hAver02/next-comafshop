import {Products}   from "../../types/ProductsTypes"
import ProductCard from "./ProductCard"

interface props {
    products : Products[]
}


export default function Productos({products} : props){
    return(
        <>
        <div className="px-2 grid justify-center w-full sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
                  {products.map((pro: any) => (
                      <div key={pro.id}>
                          <ProductCard product={pro} />
                      </div>
              ))}
        </div>  
        </>
    )
}