"use client"
import RouteButton from "@/components/RouteButton";
import {useSession} from "next-auth/react";
import {signIn, signOut} from "@/libs/auth/helpers";


export default function RegisterButton(
    {className = ""} : {className?: string} ) {

    const session = useSession();

    const routeClickHandler = session?.data?.user ?
        async () => {
            await signOut();
            await signIn();
        } : async () => {
            await signOut();
        }

    return (
        <RouteButton label="Register"
                     className={`bg-gradient-to-br from-orange-500 to-orange-700 text-white
                     ${className}`}
                     onClick={routeClickHandler}
        />
    )
}
