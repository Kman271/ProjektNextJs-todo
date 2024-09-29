"use client"
import RouteButton from "@/components/RouteButton";
import {useRouter} from "next/navigation";
import {signOut} from "@/libs/auth/helpers";


export default function LoginButton(
    {className = ""} : {className?: string}) {

    const router = useRouter()

    return(
        <RouteButton label="Login"
                     className={`bg-gradient-to-br from-blue-500 to-blue-700 text-white
                     ${className}`}
                     onClick={(e) => {e.preventDefault(); signOut("/auth/login").then()}}
        />
    )
}
