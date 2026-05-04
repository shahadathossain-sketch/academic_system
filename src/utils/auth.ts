import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { nextCookies } from "better-auth/next-js"
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables")
}

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const mongoClientConnect = mongoClient.connect().catch((error) => {
    console.error("MongoDB connection failed:", error)
    throw error
})

const db = mongoClient.db(process.env.MONGO_DB || "academic_system")

void mongoClientConnect

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client: mongoClient,
        usePlural: true,
        transaction: false,
    }),
    emailAndPassword: { enabled: true },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        cookieCache: { enabled: true, maxAge: 5 * 60 },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
            },
        },
    },
    plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session
