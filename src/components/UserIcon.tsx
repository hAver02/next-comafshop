import { Avatar, Stack } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { auth } from "../../auth";
import Link from "next/link";
import prisma from "@/lib/db";

export default async  function UserIcon () {
    const session = await auth()
    let initials;
    if(session && session.user?.email){
        const data = await prisma.user.findUnique({where : {email : session?.user?.email}})
        if(!data) return;
        initials = `${data.first_name[0].toUpperCase()}${data.last_name[0].toUpperCase()}`;

    }
    
    return (
        <div className="">
            { session ?
                <Stack direction="row" >
                    <Link href={session.user?.role == 'admin' ? '/admin' : '/dashboard'}>
                        <Avatar className="text-center" sx={{ bgcolor: deepPurple[500] }}>{initials}</Avatar>
                    </Link>
                </Stack>
                :
                <Stack>
                    <Link href={'/login'}>
                    <Avatar sx={{bgcolor : deepPurple[500]}}></Avatar>
                    </Link>
                </Stack> 
            }
        </div>
      );
}