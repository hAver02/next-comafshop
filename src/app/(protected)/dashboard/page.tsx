import LogoutButton from "@/components/LogoutButton";
import { auth } from "../../../../auth"
import { redirect } from "next/navigation";
import InfoUser from "@/components/InfoUser";
import prisma from "@/lib/db";
 
export default async function Page() {
  const session = await auth()
 
  if (session?.user?.role !== 'user' || !session || !session.user.email) {
    return redirect('/products')
  }

  const data : any = await prisma.user.findUnique({
    where : { 
      email : session.user.email
    },
    include: { budgets: { include: { budgetProducts: { include: { product: true }}}}
    }
  });

  

  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="flex justify-around items-center py-2 bg-blue-300 ">
        <h3 className="text-lg font-semibold">Bienvenidos {data?.first_name} {data?.last_name}</h3>
        <LogoutButton />
      </div>
      <div>
        <InfoUser budgets={data?.budgets}/>
      </div>
    </div>
  )
}