import { z } from "zod"

export const loginSchema = z.object({
    email : z.string({required_error : "Email is required"}).email().min(5, "email is required").max(255),
    password : z.string({required_error : 'Password is required'}).min(6, "Password is required").max(30, "Max 30 caracters")

})

export const registerSchema = z.object({
    email : z.string({required_error : "Email is required"}).email().min(5, "email is required").max(255),
    password : z.string({required_error : 'Password is required'}).min(6, "Password is required").max(30, "Max 30 caracters"),
    first_name : z.string({required_error : 'First name is required'}).min(1, "Name is required").max(30, "Max 30 caracters"),
    last_name : z.string({required_error : 'last_name is required'}).min(1).max(30)

})

