import React from "react";
import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function CardWrapper({children, className="" } :WrapperProps) {

    return(
        <div className={`flex justify-center items-center  w-[19rem] bg-gradient-to-br from-indigo-500 via-rose-500 via-30% to-fuchsia-500 to-66% rounded-2xl ${className}`}>
            <div className='mx-2 basis-full flex-shrink flex-grow-0 h-full max-h-[calc(100%-0.75rem)] flex flex-col rounded-xl shadow-sm
            shadow-gray-700 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800'>

                {children}

            </div>
        </div>
    )
}