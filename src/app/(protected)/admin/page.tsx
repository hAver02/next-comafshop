import LogoutButton from "@/components/LogoutButton";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import BudgetsCard from "@/components/BudgetsCards";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default async  function AdminHome(){
    const session = await auth();
    if(session?.user?.role !== 'admin') return redirect('/products');
    
    const budgets : any  = await prisma.budget.findMany({
        where: { answered: false },
        include: {
          budgetProducts: {
            include: {
              product: true,
            },
          },
          user: true,
        },
    });

  return(
    <div className="min-h-screen bg-gray-100 py-8 flex flex-col gap-2">
      <div className="flex items-center justify-evenly">
        <Link href={'/create'}>
          <Button>NewProduct</Button>
        </Link> 
        <LogoutButton />
      </div>
      <BudgetsCard budgets={budgets} />
    </div>
  )
}