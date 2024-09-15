'use client'

import AddBtn from "@/components/Panel/AddBtn";
import {diffType} from "@/libs/types/noteType";
import React from "react";

export default function AddBar({userToken}: { userToken: string }) {

    const diffObj: diffType[] = ['easy', 'medium', 'hard'];

    const [noteTxt, setNoteTxt] = React.useState<string>('');

    function handleAdd(event: React.SyntheticEvent<HTMLButtonElement>) {
        event.stopPropagation();
        event.preventDefault();
        console.log(noteTxt);
    }


    return (
        <form className='w-[90%] flex flex-row items-center justify-center space-x-2 mx-auto mb-3'>
            <input required={true} placeholder="Type note description here..."
                   className='p-2 pl-3 basis-full flex-shrink flex-grow rounded-md placeholder:text-gray-300 text-white
                   bg-gradient-to-r from-gray-800 to-gray-700'
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                       setNoteTxt(event.target?.value.toString())
                       console.log(event.target?.value);
                   }}
            />
            <div
                className='p-2 pl-3 flex justify-center items-center basis-[10ch] flex-grow-0 flex-shrink-0 h-full bg-gray-700 rounded shadow overflow-hidden'>
                <select className='w-fit text-white bg-gray-700'>
                    {
                        diffObj.map(((e, index) =>
                                (<option key={index}>{e}</option>)
                        ))}
                </select>
            </div>
            <AddBtn onClick={event => (handleAdd(event))}/>
        </form>
    )
};
