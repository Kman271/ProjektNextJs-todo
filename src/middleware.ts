import {NextResponse} from "next/server";
import {auth} from "@/auth";
import {getToken, GetTokenParams} from "@auth/core/jwt";


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Home.jpg).*)"]
};

export default auth(async (req) => {

    try {
        const pathname = req.nextUrl.pathname;
        const currRoute = pathname.split('/');
        const currLast = currRoute.pop() // might be username or userPanel
        const currBeforeLast = currRoute.pop(); // might be userPanel or else

        if(process.env.NEXTAUTH_SECRET === undefined) {
            console.log("NEXTAUTH_SECRET is undefined, needed in middleware!")
            throw new Error("NEXTAUTH_SECRET is undefined, needed in middleware!");
        }

        const tokenParams: GetTokenParams<false> = {req, secret: process.env.NEXTAUTH_SECRET};
        const token = await getToken(tokenParams);
        const username = token?.name || "unknown";

        console.log("Middleware for token:", token, "for tokenParams:", tokenParams, "Pathname:", pathname)
        console.log("Middleware for user:", username);
        // if (token && ["/auth/login", "/auth/register"].includes(pathname)) {
        //     const url = `/userPanel/${username}`
        //     console.log("Middleware redirects to correct panel:", url, "request:", req.url)
        //     return NextResponse.redirect(
        //         new URL(url, req.url)
        //     )
        // }

        if(!token && ["/auth/login", "/auth/register"].includes(pathname) ) {
            console.log("Middleware ignores")
            return NextResponse.next()
        }

        if (token && pathname.startsWith('/userPanel/') &&
            !(currLast === username || (currLast === 'completed' && currBeforeLast === username))) {
            console.log("Middleware on incorrect userPanel route")
            return NextResponse.redirect(
                new URL(`/userPanel/${username}`,
                    req.url
                )
            );
        }

        if(pathname === '/' || (token && [`/userPanel/${username}`, `/userPanel/${username}/completed`].includes(pathname) )) {
            console.log("Middleware skip routing")
            return NextResponse.next();
        }

            console.log("Middleware on else route", pathname, "and pathname starts with user panel?:", pathname.startsWith('/userPanel/'))
            console.log( "currLast:", currLast, "currBeforeLast:", currBeforeLast)
            const newUrl = req.nextUrl.clone();
            newUrl.pathname = "/";
            return NextResponse.redirect(newUrl);

    } catch (error) {
        console.error("Error while redirecting:", error);
        throw error;
    }
})
