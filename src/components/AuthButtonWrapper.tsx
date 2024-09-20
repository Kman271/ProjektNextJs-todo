'use server'
import {auth, BASE_PATH} from "@/auth";
import {SessionProvider} from "next-auth/react";


export async function AuthButtonWrapper(
    {className = "", children} : {className?: string | undefined, children: React.ReactNode} ) {

    const session = await auth()
    if(session && session.user) {
        session.user = {
            name: session.user.name,
            email: session.user.email
        }
    }

    return (
        <div className={`${className}`}>
        <SessionProvider basePath={BASE_PATH} session={session}>
            {children}
        </SessionProvider>
        </div>
    )
}