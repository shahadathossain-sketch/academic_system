import { NextResponse, type NextRequest } from "next/server"

// Next.js 16 uses proxy.ts instead of middleware.ts
export function proxy(request: NextRequest) {
    const sessionCookie =
        request.cookies.get("better-auth.session_token") ??
        request.cookies.get("__Secure-better-auth.session_token")

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/signin", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}
