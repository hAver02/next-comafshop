import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const data = await prisma.user.update({where : { id : 1}, data : {role : 'admin'}});
        console.log(data);
        
        return NextResponse.json( { ok : true, message : 'User updated succesfully!'});

    } catch (error) {
        return NextResponse.json({ ok : false, message: error})
    }
}