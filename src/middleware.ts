import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let deactivated: string | null
function getStatus() {
  if (typeof window !== "undefined" && window.localStorage) {
    let status = localStorage.getItem("deactivated")
    if (status !== null) return JSON.parse(status)
    else return false
  }
}
deactivated = getStatus()

const notProtected = ["/", "/register", "/login"];

export default function middleware(req: NextRequest) {
  if (deactivated && !notProtected.includes(req.nextUrl.pathname)) {
    const newURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newURL.toString())
  }
}