"use client"
import {buttonProps} from "@/libs/types/buttonTypes";

export default function Button(props: buttonProps) {

    return(

        <button className={`text-[1.5rem] px-[2.5rem] py-[0.5rem] font-bold rounded-2xl shadow-md shadow-gray-900
                            ${props.className}`}
                onClick={ props.onClick }
        >
            {props.label}
        </button>

    )

}
