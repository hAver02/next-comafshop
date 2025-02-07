
import CartProducts from "@/components/CartProducts";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";


export default async function CartPage(){
    const session  = await auth();
    if (!session || !session.user?.email) {
        return redirect('/login')
      }
    
    
    return (
        <CartProducts email={session.user?.email}/>
    )
}