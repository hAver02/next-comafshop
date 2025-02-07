import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/db";
import { unlink, writeFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import path from "path";

export  async function GET(req: NextApiRequest, res: NextApiResponse){
try {
      const { page = 1, limit = 2, category, subcategory, query = '' } = req.query
      console.log(category, subcategory);
      
      const pageNumber = parseInt(page as string, 10) || 1
      const limitNumber = parseInt(limit as string, 10) || 10
      const skip = (pageNumber - 1) * limitNumber
  
      const where : any = {}
    
      if (category) {
        where.subcategory = {
          category: {
            name: category as string, 
          },
        }
      }
      if (subcategory) {
        where.subcategory = {
          ...where.subcategory,
          name: subcategory as string,
        }
      }
  
      const products = await prisma.product.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
        include: {
          subcategory: {
            include: {
              category: true,
            },
          },
        },
      })
    
      const totalProducts = await prisma.product.count({ where })
    
      res.status(200).json({
        products,
        totalPages: Math.ceil(totalProducts / limitNumber),
        currentPage: pageNumber,
      })
} catch (error) {
  res.json({ ok : false })
}
  

}

export  async function POST(request: Request){
  try {
    const formData = await request.formData() 
    const img : any  = formData.get('img')
    const nombre : any = formData.get('nombre')
    const descripcion : any = formData.get('descripcion')
    const precio : any = formData.get('precio')
    const subCategoria : any = formData.get('subcategoria')
    if(!img || !nombre || !descripcion || !precio || !subCategoria  ) return NextResponse.json({ok : false, message : 'Missing information to create product'})

    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const filePath = path.join(process.cwd(),'public', img.name)
    await writeFile(filePath,buffer)
    const res = await cloudinary.uploader.upload(filePath)
    const url_image = res.secure_url
    
    const newProduct = await prisma.product.create({
        data : {
            name : nombre,
            description : descripcion,
            price : Number(precio),
            subcategoryId : Number(subCategoria),
            image : url_image
        }
    })
    console.log('new product', newProduct);
    
    if(!newProduct) return NextResponse.json({ ok : false, message : 'Error creating product'})
    await unlink(filePath)
    return NextResponse.json({ok : true, message : 'Product created succesfully'})

} catch (error) {
    console.log(error);
    
    return NextResponse.json({ok : false, message : 'error creating product'})
}
}