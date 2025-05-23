import { NextResponse } from 'next/server'
export function middleware(request) {

    const headers = new Headers(request.headers)
    headers.set('x-pathname', request.nextUrl.pathname);

    // if (
    //     request.nextUrl.pathname.startsWith('/thank-you') &&
    //     (!request.referrer || request.referrer === "about:client")
    // ) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    if (request.nextUrl.pathname.startsWith("/check-out") &&

        (
            !request.nextUrl.searchParams.get("merchant_id") ||
            !request.nextUrl.searchParams.get("accessCode") ||
            !request.nextUrl.searchParams.get("encRequest")
        )
    ) return NextResponse.redirect(new URL('/', request.url));

    return NextResponse.next({
        request: {
            headers,
        },
    });
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}