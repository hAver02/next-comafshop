import Link from "next/link";

export default function Header(){
    return(
        <header className="flex justify-evenly bg-gray-400 px-5 py-2 items-center w-full  ">
        <div className="text-black font-bold lg:text-3xl font-serif text-base md:text-lg flex gap-5 items-center justify-between ">
            <div className="">
                <div className="flex gap-2 items-center justify-center text-sm" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                    </svg>
                    <span>4747-8902</span>
                </div>
                <div className="flex gap-2 items-center justify-center text-sm">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                        <title>WhatsApp icon</title>    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>15-2929-2020</span>
                </div>
            </div>
            <img src={'/comaf.png'} alt="" />
        </div>
        <nav className="text-black">
          <ul className="hidden md:flex gap-2 text-lg text-red-400 font-semibold">
            <Link href={'/'}><li>Inicio</li></Link>
            <Link href={'/products?category=materiales'}><li>Materiales</li></Link>
            <Link href={'/products?category=ferreteria'}><li>Ferreteria</li></Link>
            <Link href={'/products?category=sanitario'}><li>Sanitarios</li></Link>
            <Link href={'/contacto'}><li>Contacto</li></Link>
          </ul>
        </nav>
      </header>
    )
}