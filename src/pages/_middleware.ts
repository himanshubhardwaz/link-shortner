import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname.startsWith("/api/") ||
        req.nextUrl.pathname === "/"
    ) {
        return;
    }
    const slug = req.nextUrl.pathname.split("/").pop();

    const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
    if (slugFetch.status === 404) {
        return NextResponse.rewrite(req.nextUrl.origin);
    }
    const data = await slugFetch.json();

    if (data?.url) {
        return NextResponse.rewrite(data.url);
    }
}