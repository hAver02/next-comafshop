'use client'
import { loginSchema } from '@/lib/zod'
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
import { loginAction } from '../../actions/auth-action';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
// import LoginAction from '../../actions/auth-action';



export default function FormLogin(){

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password : ""
        },
    })
    const router = useRouter()
    const [error, setError ] = useState<String | null>('');
    const [isPending, startTransition] = useTransition();

    async function onSubmit(values: z.infer<typeof loginSchema>) {
      startTransition( async () => {
        const res = await loginAction(values);
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
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
                        <Input placeholder="shadcn" {...field} />
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