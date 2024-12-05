import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./utils/getToken";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { token } = await getToken();
  if (token) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = { matcher: "/" };
