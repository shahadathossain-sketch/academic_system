export const dynamic = "force-dynamic"

import { auth } from "@/src/utils/auth"
import { connectMongoose } from "@/src/utils/mongoose-client"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET() {
    await connectMongoose()
    const db = mongoose.connection.db!

    await db.collection("users").deleteMany({
        email: { $in: ["admin@test.com", "user@test.com"] },
    })

    await auth.api.signUpEmail({
        body: {
            email: "admin@test.com",
            password: "password123",
            name: "Admin User",
        },
    })

    await auth.api.signUpEmail({
        body: {
            email: "user@test.com",
            password: "password123",
            name: "Regular User",
        },
    })

    await db.collection("users").updateOne(
        { email: "admin@test.com" },
        { $set: { role: "administrator" } }
    )

    return NextResponse.json({
        message: "Test users created",
        users: [
            { email: "admin@test.com", password: "password123", role: "administrator" },
            { email: "user@test.com", password: "password123", role: "user" },
        ],
    })
}
