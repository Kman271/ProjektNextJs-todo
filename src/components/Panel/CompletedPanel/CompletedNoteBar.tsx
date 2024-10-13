'use client'
import {diffType, noteJsonType} from "@/libs/types/noteType";
import SmallButton from "@/components/Panel/SmallButton";
import React from "react";
import diffFormat from "@/components/utils/diffFormat";


export default function CompletedNoteBar({ data, deleteHandler} : {data: noteJsonType, deleteHandler?: () => void} ) {

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
                        <SmallButton className='hover:from-red-700 hover:to-red-800'
                                     label='delete'
                                     onClick={deleteHandler}
                        />
                    }
                </div>
            </div>
        </div>

    )
}