import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import prisma from "@/lib/db";
import { Category } from "../../../../types/CategoriesTypes";
import CreateNewProduct from "@/components/CreateProduct";

export default async function CreateProduct() {
    const session = await auth();
    if(session?.user?.role !== 'admin') return redirect('/');

    const categories : Category[] = await prisma.category.findMany({include : {subcategories : true}});
    // console.log('categories', categories);
    
    return (
        <div className="w-3/5 h-full mx-auto rounded-xl shadow-blue-300 shadow-sm container grid my-3 py-5">
            <CreateNewProduct categories={categories}/>
        </div>
    )
}