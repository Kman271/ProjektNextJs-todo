"use client"
import {buttonProps} from '@/libs/types/buttonTypes'
import {useRouter} from "next/navigation";
import Button from "@/components/Button";


export default function RouteButton(props: buttonProps) {
    const router = useRouter();

    return(
        <Button label={props.label}
                className={`
                hover:scale-110 transition-transform ease-out duration-200
                active:scale-95
                ${props.className}`}
                onClick={props.onClick}/>
    )
}
