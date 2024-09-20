'use client'
import {diffType, noteJsonType} from "@/libs/types/noteType";
import SmallButton from "@/components/Panel/SmallButton";
import React, {useState} from "react";

function diffFormat(diffElement: diffType): React.ReactNode {

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

export default function CompletedNoteBar({ data, deleteHandler} : {data: noteJsonType, deleteHandler?: () => void} ) {

    const [checked, setChecked] = useState(data.isDone);
    const handleChange = () => setChecked(!checked);

    return (
        <div
            className='flex flex-row items-center w-full basis-[2.75rem] flex-shrink bg-gradient-to-r from-gray-700 to-gray-800 my-0.5'>

            <div className='flex items-center h-full w-fit flex-grow flex-shrink'>
                <p className='h-fit ml-4'>{data.task_txt}</p>
            </div>

            <div className='flex h-full min-w-fit justify-end items-center flex-shrink flex-grow-0 space-x-2 mr-2'>

                {diffFormat(data.difficulty as diffType)}

                <div className='flex h-fit space-x-2'>
                    { deleteHandler != null &&
                        <SmallButton className='hover:from-red-700 hover:to-red-800' label='delete'
                                 onClick={deleteHandler}/>
                    }
                </div>
            </div>
        </div>
    )
}