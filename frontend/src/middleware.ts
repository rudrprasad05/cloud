import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/me`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/cloud/:path*'], // Apply to these routes
};
