"use client"
import RouteButton from "@/components/RouteButton";


export default function RegisterButton({className = ""}:{className?: string}) {
    return(
        <RouteButton label="Register"
                     className={`bg-gradient-to-br from-orange-500 to-orange-700
                      text-white ${className ? className : ""}`}
                     url="/auth/register"
        />
    )
}
