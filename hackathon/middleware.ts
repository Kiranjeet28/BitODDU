// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token")?.value || // dev
    req.cookies.get("__Secure-next-auth.session-token")?.value; // prod (https)

  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

  if (token && isAuthPage) {
    // already logged in → redirect away from login/register
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !isAuthPage && !req.nextUrl.pathname.startsWith("/api")) {
    // not logged in and trying to access protected page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Match all routes except static files and api
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
