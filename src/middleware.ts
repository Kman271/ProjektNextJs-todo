import {NextResponse} from "next/server";
import {auth} from "@/auth";
import {getToken} from "@auth/core/jwt";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {signOut} from "@/libs/auth/helpers";



export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Home.jpg).*)"]
};

export default auth(async (req) => {

    try {

        const pathname = req.nextUrl.pathname;

        if(process.env.NEXTAUTH_SECRET === undefined) {
            console.log("NEXTAUTH_SECRET is undefined, needed in middleware!")
            throw new Error("NEXTAUTH_SECRET is undefined, needed in middleware!");
        }

        // console.log("Request cookies in middleware:", req.cookies);
        const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
        // console.log("Retrieved token:", token);

        const username = token?.name || "unknown";

        console.log("pathname:", pathname)



        if(pathname === '/') {
            return NextResponse.next();
        }

        // if logged in redirect from sign form to panel
        console.log("token is:", token);
        if(token && ['/auth/login', '/auth/register'].includes(pathname)) {
            return NextResponse.redirect(
                new URL(`/userPanel/${username}`,
                    req.url
                ));
        }

        // if not logged in and not in sign form or root domain then redirect
        if(!token && !['/auth/login', '/auth/register', '/'].includes(pathname)) {
            return NextResponse.redirect(
                new URL('/',
                    req.url
                ));
        }

        // if logged in and on wrong site then redirect
        if(token && !pathname.startsWith(`/userPanel/${username}`) ) {
            return NextResponse.redirect(
                new URL('/',
                    req.url
                ));
        }

        console.log("not redirecting")
        return NextResponse.next();


    } catch (error) {
        console.error("Error while redirecting:", error);
        throw error;
    }
})
