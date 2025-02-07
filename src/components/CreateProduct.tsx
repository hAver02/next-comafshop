'use client'
import { InputLabel, MenuItem, Select, TextField, dividerClasses } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "../../types/CategoriesTypes";

interface props {
    categories : Category[]
}
export default function CreateNewProduct({categories} : props){

    const { register, handleSubmit } = useForm()
    const [categoria, setCategoria] = useState<Category | null>(null);
    const [subCategoria, setSubCategoria] = useState(null)
    const [file, setFile] = useState<File | null>(null)
    
    const handleChangeCategoria = (event : any) => {
        const category = categories.find(cat => cat.name == event.target.value)
        if(!category) return setCategoria(null)
        setCategoria(category);
    };
    const handleChangeSubCategoria = (event : any) => {
        setSubCategoria(event.target.value)
    }
    
    const route = useRouter()

    return(
        <div className="flex flex-col gap-3 h-full mt-2 ">
                <h2 className="text-center text-green-300 font-bold text-3xl mt-2">Nuevo Producto</h2>
                <div className="">
                    <form onSubmit={handleSubmit(async (values) => {
                        if(!categoria || !subCategoria) return // Marcar un error
                        const formData = new FormData()
                        formData.append('nombre', values.nombre)
                        formData.append('descripcion', values.descripcion)
                        formData.append('precio', values.precio)
                        formData.append('subcategoria', subCategoria)
                        if(file == null){}
                        else{
                            formData.append('img', file)
                        }

                        console.log(values, categoria, subCategoria);
                        
                        const res = await axios.post('/api/product', formData, {
                            headers : {
                                "Content-Type" : "multipart/form-data"
                            }
                        })
                        console.log(res);
                        
                        if(!res.data.ok) return // manejar error
                        return route.push('/products')
                        

                        
                        
                    })} className="flex flex-col gap-3 items-center m-auto">
                        <TextField label="Nombre" id="fullWidth" className="w-2/3 bg-white " {...register('nombre', {required : true})} />
                        <TextField label="Descripcion" multiline rows={2} className="w-2/3 bg-white" {...register('descripcion', {required : true})} />
                        <TextField type="number" label="Precio" id="fullWidth" className="w-2/3 bg-white" {...register('precio', {required : true})}/>
                        <div className="flex w-2/3 gap-4">
                        <div className="flex w-2/3 gap-4">
                            <div className=" w-full flex flex-col">
                                <InputLabel id="demo-simple-select-required-label" className="text-white">Categoria</InputLabel>
                                <Select className="bg-white text-black" size="small" value={categoria?.name ?? ''} label="Categoria" onChange={handleChangeCategoria}>
                                    <MenuItem value={''}> <em>None</em> </MenuItem>
                                    {categories.map(cat => (
                                        <MenuItem key={cat.id} value={cat.name}> {cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                            

                            </div>
                                {!categoria ? <div className="flex flex-col w-full">
                                <InputLabel className='text-white'>Subcategoria</InputLabel>
                                    <Select size="small" className="bg-white" disabled value={''} >
                                </Select>
                            </div>
                            :
                            <div className="flex flex-col w-full">
                                <InputLabel className='text-white'>Subcategoria</InputLabel>
                                <Select size={'small'} className="bg-white" value={subCategoria ?? ''} label='SubCategoria' onChange={handleChangeSubCategoria} >
                                        {
                                            categoria.subcategories.map((sub) => (
                                                <MenuItem value={sub.id} key={sub.id}>{sub.name}</MenuItem>
                                            ))
                                        }                    
                                </Select>
                            </div>
    
                        }
                        </div>
                        <div className="flex items-center justify-center w-2/3 gap-1"> 
                            <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-blck font-semibold">Imagen</label>
                            <input type="file" className="text-white" {...register('img')} onChange={(e) => {
                                if(e.target.files == null ) return
                                // console.log(e.target.files[0]);
                                setFile(e.target.files[0])
                                
                            }}/>
                            </div>
                            {file && 
                            <div className="w-2/3 h-[150px] ">
                                <img src={URL.createObjectURL(file)} alt="" className="h-full w-full m-auto px-10" />
                            </div>
                            }
                        </div>

                        <div>
                            <button type="submit" className="text-black border-2 border-green-300 px-4 py-3 rounded-lg hover:text-lg hover:bg-green-200 hover:text-blue-400">Crear producto</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}