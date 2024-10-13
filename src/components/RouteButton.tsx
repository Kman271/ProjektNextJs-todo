"use client"
import {buttonProps} from '@/libs/types/buttonTypes'
import Button from "@/components/Button";


export default function RouteButton(props: buttonProps) {

    return(
        <Button label={props.label}
                className={`hover:scale-110 transition-transform ease-out duration-200 active:scale-95
                            ${props.className}`
                }
                onClick={props.onClick}
        />
    )}
