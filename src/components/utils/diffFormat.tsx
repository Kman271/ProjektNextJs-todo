import {diffType} from "@/libs/types/noteType";
import React from "react";

export default function diffFormat(diffElement: diffType): React.ReactNode {

    let bgColor1: string;
    let bgColor2: string;

    switch (diffElement) {
        case "easy":
            bgColor1 = '#84cc16' //lime 500
            bgColor2 = '#65a30d' //lime 600
            break
        case "medium":
            bgColor1 = '#f59e0b' //amber 500
            bgColor2 = '#ca8a04' //amber 600
            break
        case "hard":
            bgColor1 = '#ef4444' //red 500
            bgColor2 = '#dc2626' //red 600
            break
    }

    return (
        <span className='flex items-center justify-center basis-[10ch] flex-shrink-0 flex-grow-0 h-full'
              style={{'backgroundImage': `linear-gradient(to bottom right, ${bgColor1}, ${bgColor2})`}}>
            <p className='text-center font-bold'>{diffElement}</p>
        </span>
    )
}
