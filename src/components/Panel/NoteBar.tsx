'use client'
import {diffType, noteJsonType} from "@/libs/types/noteType";
import SmallButton from "@/components/Panel/SmallButton";
import React from "react";
import diffFormat from "@/libs/utils/diffFormat";


export default function NoteBar({ data, deleteHandler, isChecked, setIsChecked} : {data: noteJsonType, deleteHandler?: () => void, isChecked: boolean, setIsChecked: any} ) {

    const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(data.ID, event.currentTarget.checked);
    }

    return (
        <div
            className='flex flex-row items-center w-full basis-[2.75rem] flex-shrink bg-gradient-to-r from-gray-700 to-gray-800 my-0.5'>

            <div className='flex items-center h-full w-fit flex-grow flex-shrink'>
                <p className='h-fit ml-4'>{data.task_txt}</p>
            </div>

            <div className='flex h-full min-w-fit justify-end items-center flex-shrink flex-grow-0 space-x-2 mr-2'>
                <div className="w-fit h-full flex items-center justify-center">
                    <input className='block size-[1.5rem]'
                           type='checkbox'
                           checked={isChecked}
                           onChange={checkHandler}
                    />
                </div>

                {diffFormat(data.difficulty as diffType)}

                <div className='flex h-fit space-x-2'>
                    <SmallButton className='hover:from-red-700 hover:to-red-800'
                                 label='delete'
                                 onClick={deleteHandler != undefined && deleteHandler}
                    />
                </div>
            </div>
        </div>
    )
}