'use server'

import { loginSchema, registerSchema } from "@/lib/zod";
import { z } from "zod";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs'
export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      return { success: true };
    } catch (error) {
      if (error instanceof AuthError) {
        return { ok : false, error: error.cause?.err?.message };
      }
      return { error: "error 500" };
    }
};



export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {

    const { data, success } = registerSchema.safeParse(values);
    if(!success) return {ok : false, error: "Invalid data sent!"}
    const user = await prisma.user.findUnique({ where : { email : data.email}})
    if(user) return { ok : false, error : 'User Already exists'};
    
    const hashPassword = await bcrypt.hash(data.password, 10);
    console.log(hashPassword);
    
    await prisma.user.create( { data : { 
      email : data.email,
      first_name : data.first_name,
      password : hashPassword,
      last_name : data.last_name
    }})
    
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success : true }

  } catch (error) {
    if (error instanceof AuthError) {
      return { ok : false, error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
}