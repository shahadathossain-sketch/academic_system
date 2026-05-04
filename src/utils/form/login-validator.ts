import z from "zod"

export const signInSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be no more than 32 characters long"),
})

export const signUpSchema = signInSchema.extend({
    username: z.string().min(2, "Username must be at least 2 characters long"),
})
