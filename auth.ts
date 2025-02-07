import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./src/lib/db";
 
// const prisma = new PrismaClient()
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks : {
    //jwt() se ejectura cada vez que se crea o actauliza un token!
    // aqui se puede agregar info adicional al token
    jwt({token, user}) {
      if(user){
        token.role = user.role
      }
      return token
    },
    // session( ) se utliza para agregar info del token a la session del usuario
    // esta disponible en el cliente!
    session({session, token}){
      if(session.user){
        session.user.role = token.role
      }
      return session
    }
  }
})