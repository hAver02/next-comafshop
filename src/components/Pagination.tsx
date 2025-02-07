'use client'
import { Pagination, Stack } from "@mui/material";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { number } from "zod";
interface props {
    totalPages : number
}
export default function PaginationProducts ({totalPages} : props){
    const searchParams = useSearchParams()
    const {replace } = useRouter();
    const pathname = usePathname()
    const handlePagination = (page : number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString());
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div>
            <Stack>
                <Pagination count={totalPages} color="primary" onChange={(e, page) => handlePagination(page)}  />
            </Stack>
        </div>
    )
}