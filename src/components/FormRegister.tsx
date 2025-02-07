'use client'
import { registerSchema } from '@/lib/zod'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginAction, registerAction } from '../../actions/auth-action';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
// import LoginAction from '../../actions/auth-action';



export default function FormRegister(){

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
          email: "",
          password : "",
          last_name : "",
          first_name : ""
        },
    })
    const router = useRouter()
    const [error, setError ] = useState<String | null>('');
    const [isPending, startTransition] = useTransition();

    async function onSubmit(values: z.infer<typeof registerSchema>) {
      startTransition( async () => {
        const res = await registerAction(values);
        console.log('response', res);
        if(res.error){
          setError(res.error);
        }else{
          router.push('/dashboard')
        }

      })
      
    }
        return (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Luca.Gomez@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Gomez" {...field} />
                      </FormControl>
  
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Lucas" {...field} />
                      </FormControl>
  
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Secure password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>Submit</Button>
                {error && <div className='text-red-400'>{error}</div>}
              </form>
            </Form>
          )
    
}