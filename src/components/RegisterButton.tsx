"use client"
import RouteButton from "@/components/RouteButton";
import {useRouter} from "next/navigation";
import {buttonProps} from "@/libs/types/buttonTypes";


export default function RegisterButton(props: buttonProps) {

    const router = useRouter()

    return (
        <RouteButton label="Register"
                     className={`bg-gradient-to-br from-orange-500 to-orange-700 text-white
                     ${props.className}`}
                     onClick={ (e) => {
                         e.preventDefault();
                         router.push('auth/register')
                     }}
        />
    )
}
