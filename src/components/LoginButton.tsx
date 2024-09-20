"use client"
import RouteButton from "@/components/RouteButton";
import {useSession} from "next-auth/react";
import {signIn, signOut} from "@/libs/auth/helpers";


export default function LoginButton(
    {className = ""} : {className?: string}) {

    const session = useSession();

    const routeClickHandler = session?.data?.user ?
        async () => {
            await signOut();
            await signIn();
        } : async () => {
            await signIn();
        }

    return(
        <RouteButton label="Login"
                     className={`bg-gradient-to-br from-blue-500 to-blue-700 text-white
                     ${className}`}
                     onClick={routeClickHandler}
        />
    )
}
