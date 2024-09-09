"use client"
import RouteButton from "@/components/RouteButton";


export default function LoginButton({className = ""}:{className?: string}) {
    return(
        <RouteButton label="Login"
            className={`bg-gradient-to-br from-blue-500 to-blue-700
            
            text-white ${className}`}
            url="/auth/login"
        />
    )
}
