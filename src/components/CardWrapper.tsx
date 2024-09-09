import React from "react";
import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function CardWrapper({children, className="" } :WrapperProps) {

    return(
        <div className="p-1 bg-gradient-to-br from-indigo-500 via-rose-500 via-30% to-fuchsia-500 to-66% rounded-2xl">
            <div className={`flex flex-col rounded-xl shadow-sm shadow-gray-700
                bg-gradient-to-br from-gray-700 to-gray-800 ${className}`}>
            {children}
            </div>
        </div>
    )
}