'use client'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Category } from '../../types/CategoriesTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface props {
    categories : Category[]
}
export default function NavBarClient ({categories} : props){
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const handleSearchParams = (category : string, subcategory ?: string) => {
        const params = new URLSearchParams(searchParams)
        if(subcategory){
            params.set('category', category);
            params.set('subcategory', subcategory)
        }else{
            params.set('category', category);
            params.delete('subcategory');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return(
        <div>
        {categories.map((cat: Category) => (
            <Accordion key={cat.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} aria-controls="panel1-content" id="panel1-header"
                    className="text-center bg-black text-white"
                >
                    {cat.name.toUpperCase()}
                </AccordionSummary>
                <AccordionDetails>
                    <ul className='flex flex-col items-start'>
                        <button onClick={() => handleSearchParams(cat.name)}>
                            <li>TODOS</li>
                        </button>
                        {cat.subcategories.map((sub) => (
                            <button key={sub.id} onClick={() => handleSearchParams(cat.name, sub.name)} >
                                <li className="border-1 border-b hover:text-red-400 cursor-pointer">{sub.name.toUpperCase()}</li>
                            </button>
                        ) )}
                    </ul>
                </AccordionDetails>
            </Accordion>
        ))}
    </div>
    )
}