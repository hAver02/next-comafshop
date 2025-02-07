'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce' 
export default function InputProducts(){
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const handleSerach = useDebouncedCallback((term : string) => {
        const params = new URLSearchParams(searchParams)
        if(term){
            params.set('query', term);
        }else{
            params.delete('query');
        }
        params.set('page', '1')
        replace(`${pathname}?${params.toString()}`);
        
    }, 1000)

    return(
        <div className="w-full flex justify-center">
            <input onChange={(e) => handleSerach(e.target.value)} className="w-1/2 py-2 rounded-xl text-center" type="text" placeholder="Cemento, Plasticro, Arena ..." />
        </div>  
    )
}