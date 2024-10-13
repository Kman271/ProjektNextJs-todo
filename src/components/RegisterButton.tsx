"use client"
import RouteButton from "@/components/RouteButton";
import {useRouter} from "next/navigation";
import {signOut} from "@/libs/auth/helpers";


export default function RegisterButton(
    {className = ""} : {className?: string} ) {

    const router = useRouter()

    return (
        <RouteButton label="Register"
                     className={`bg-gradient-to-br from-orange-500 to-orange-700 text-white
                     ${className}`}
                     onClick={(e) => {e.preventDefault(); router.push('auth/register')}}
        />
    )
}
