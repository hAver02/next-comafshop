
import InputProducts from "@/components/Input"
import prisma from "@/lib/db";
import PaginationProducts from "@/components/Pagination";
import Productos from "@/components/Products";
import { Suspense } from "react";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";

interface productsProps {
    searchParams : {
        query ?: string,
        category ?: string,
        subcategory?: string,
        page?: string
    }
}

export default async  function HomeProducts(props: productsProps){
    const {query = '', category, subcategory, page = 1 } = props.searchParams;
    const pageSize = 10;
    let whereCondition : any = {
        OR: [
          {
            name: {
              contains: query, 
              mode: 'insensitive', 
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive', 
            },
          },
        ],
    };
    if (category && subcategory) {
        whereCondition = {
          AND: [
            {
              subcategory: {
                name: subcategory,
                category: {
                  name: category,
                },
              },
            },
            whereCondition, // Incluimos el filtro de búsqueda por query
          ],
        };
    } else if (category) {
        // Si solo hay categoría
        whereCondition = {
          AND : [
            {
              subcategory: {
                category: {
                  name: category,
                },
              },
            },
            whereCondition, // Incluimos el filtro de búsqueda por query
          ],
        };
    }
    

    const products : any = await prisma.product.findMany({
        where: whereCondition,
        include: {
          subcategory: true,
        },
        skip: (Number(page) - 1) * pageSize, 
        take: pageSize,
    });
    
    const totalProducts = await prisma.product.count({
        where: whereCondition,
    });

    const totalPages = Math.ceil(totalProducts / pageSize);

    if(products.length == 0) return <div> No hay productos!</div>
    return (
        <section className="w-full flex flex-col pt-2 items-center h-full gap-2 overflow-y-auto pb-5 justify-between min-h-screen">
            <div className="flex flex-col w-full gap-2 ">
              <InputProducts />
              <Productos products={products} />
            </div>
            <PaginationProducts totalPages={totalPages}/>
        </section>
    )
}