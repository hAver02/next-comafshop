import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import RequestedProducts from "@/components/RequestedProducts";
import prisma from "@/lib/db";
import Image from "next/image";

export default async function Home() {

  const topProducts = await prisma.budgetProduct.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: 10,
  });
  
  const productIds = topProducts.map((bp) => bp.productId);
  
  const detailedProducts: any = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });
  
  return (
    <div className="flex flex-col min-h-screen  overflow-y-auto bg-blue-100">
      <Header />
      <div className="flex  h-full flex-col  px-5 pt-2">
        <Carousel />
        <div className=" py-2" >
          <p className="bg-blue-100 rounded-xl p-2 text-black font-semibold text-center text-lg flex" >
            Somos tu aliado confiable en la construcción y remodelación. 
              Ofrecemos una amplia variedad de materiales de primera calidad para todo tipo de proyectos, 
              desde pequeños arreglos hasta grandes construcciones. 
              Además, contamos con un servicio de entrega rápida a domicilio con nuestros propios camiones, 
              garantizando que tus pedidos lleguen a tiempo, justo cuando los necesitas.
            ¡Confía en nosotros para llevar tus proyectos al siguiente nivel!
          </p>
      </div>
      </div>
      <div className="mx-5 flex flex-col">
        <RequestedProducts products={detailedProducts} />
      </div>
      <div className="text-black px-5 flex justify-center items-center w-full gap-4 bg-gray-400 py-2 ">
          <div className="w-full">
              <h3 className="font-semibold text-lg text-center ">Materiales Comaf</h3>
              <p className="text-center">Una empresa dedicada a la venta y distribucion de materiales para la construccion.</p>
          </div>
          <div className="w-full text-center ">
              <h3 className="font-semibold text-lg ">SUCURSAL BECCAR</h3>
              <p>Av. Andres Rolon 2365 Beccar</p>
              <p>Tel: 4747-8902</p>
              <p>Cel: 15-6816-2020</p>
          </div>
      </div>
      <div className="bg-black h-10 flex items-center font-semibold text-white justify-center">
        <span>Hecho por hAver dev</span>
      </div>
    </div>
  );
}
