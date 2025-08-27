import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const role = req.nextauth.token?.role
        const { pathname } = req.nextUrl

        if (pathname.startsWith("/admin") && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/auth/agent/login", req.url))
        }

        if (pathname.startsWith("/agent") && role !== "AGENT") {
            return NextResponse.redirect(new URL("/auth/agent/login", req.url))
        }
        if (pathname.startsWith("/tenant") && role !== "TENANT") {
            return NextResponse.redirect(new URL("/auth/tenant/login", req.url))
        }

    }, {
    callbacks: {
        authorized: ({ token }) => !!token
    }
}
)

export const config = {
    matcher: ["/admin/:path*", "/agent/:path*", "/tenant/:path*"]
}