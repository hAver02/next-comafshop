// import GitHub from "next-auth/providers/github"
import { loginSchema } from "@/lib/zod";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from  './src/lib/db'
import bcrypt from 'bcryptjs';
import { signIn } from "next-auth/react";
export default {
  providers: [
    Credentials({
        authorize : async (credentials)  => {
          // console.log(credentials);
          const { data, success } = loginSchema.safeParse(credentials);
          if(!success) {
            throw new Error('invalid credentials')
          }

          const user = await prisma.user.findUnique({where : { email : data.email}})
          if(!user || !user.password) {
            throw new Error('User Not foundd')
          }
          const isValid = await bcrypt.compare(data.password, user.password)
          if(!isValid) throw new Error("Invalid Credentials. Incorrect Password");
          return user;
        }
    }),
  ], 
  pages : {
    signIn : '/login',
    error : '/login'
  },
  secret: process.env.AUTH_SECRET
  
} satisfies NextAuthConfig