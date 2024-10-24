'use client'
import {auth, BASE_PATH} from "@/auth";
import {SessionProvider} from "next-auth/react";
import React from "react";


export function AuthSessionWrapper(

    {className = "", children, session = undefined} : {className?: string | undefined, children: React.ReactNode, session?: any} ) {

    // const session = await auth()
    // if(session && session.user) {
    //     session.user = {
    //         name: session.user.name,
    //     }
    // }

    return (

        <div className={`${className}`}>
            <SessionProvider basePath={BASE_PATH}
                             session={session}
            >
                {children}
            </SessionProvider>
        </div>

    )
}