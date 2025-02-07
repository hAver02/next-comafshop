
import Link from "next/link"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Category } from "./../../types/CategoriesTypes";
import prisma from "@/lib/db";
import NavBarClient from "./NavBarCategoriesClient";



const categories = ['Aridos', 'Bolsas', 'Hierros', 'Mallas', 'Ladrillos', 'Pegamentos', 'Viguetas']
export default async function NavCategories(){
    const data = await prisma.category.findMany({include : {subcategories : true}});
    if(!data) return;
    const categories = data;
    
    return(
        <div className="h-full flex flex-col gap-3 justify-center w-full h-max-full overflow-y-auto absolute">
            <h1 className="text-red-500 text-xl font-bold text-center">Categorias</h1>
            <NavBarClient categories={categories} />
        </div>
    )
}