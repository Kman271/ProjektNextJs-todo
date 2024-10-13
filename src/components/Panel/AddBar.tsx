'use client'

import AddBtn from "@/components/Panel/AddBtn";
import {diffType} from "@/libs/types/noteType";
import {noteJsonType} from "@/libs/types/noteType";
import React, {useState} from "react";
import {dbAddNote} from "@/libs/data/data";
import {useRouter} from "next/navigation";

export default function AddBar({userToken}: { userToken: string }) {

    const router = useRouter();
    const diffObj: diffType[] = ['easy', 'medium', 'hard'];

    const [noteTxt, setNoteTxt] = useState<string>('');
    const [noteDiff, setNoteDiff] = useState<diffType>('easy');


    function handleAdd(event: React.FormEvent<HTMLFormElement> ) {
        event.stopPropagation();
        event.preventDefault();

        const noteObj : noteJsonType = {
            ID: -1,
            isDone: false,
            difficulty: noteDiff,
            task_txt: noteTxt
        };

        dbAddNote(userToken, noteObj).then(r => (console.log(r)));
        setNoteTxt('');

        router.refresh();
    }


    return (

        <form className='w-[98%] flex flex-row items-center justify-center space-x-2 mr-4 ml-auto mb-3'
        onSubmit={handleAdd}>
            <input required={true}
                   placeholder="Type note description here..."

                   className='p-2 pl-3 basis-full flex-shrink flex-grow rounded-md placeholder:text-gray-300 text-white
                              bg-gradient-to-r from-gray-800 to-gray-700'

                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                       setNoteTxt(event.target?.value.toString())
                   }}

                   value={noteTxt}
            />
            <div
                className='p-2 pl-3 flex justify-center items-center basis-[10ch] flex-grow-0 flex-shrink-0 h-full bg-gray-700 rounded shadow overflow-hidden'>

                <select className='w-fit text-white bg-gray-700'
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            setNoteDiff( event.target?.value as diffType || "easy" as diffType )
                        }}
                        value={noteDiff} >
                    { diffObj.map(( (e, index) => (<option key={index}>{e}</option>) )) }
                </select>

            </div>
            <AddBtn/>
        </form>

    )
};
