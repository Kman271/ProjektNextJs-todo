"use client"
import RouteButton from "@/components/RouteButton";
import {useRouter} from "next/navigation";
import {buttonProps} from "@/libs/types/buttonTypes";


export default function LoginButton(props: buttonProps) {

    const router = useRouter()

    return(
        <RouteButton label="Login"
                     className={`bg-gradient-to-br from-blue-500 to-blue-700 text-white
                     ${props.className}`}
                     onClick={ (e) => {
                         e.preventDefault();
                         router.push('auth/login')
                     }}
        />
    )
}
