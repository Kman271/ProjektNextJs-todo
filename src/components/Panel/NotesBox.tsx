'use server'

import React from "react";
import SearchBar from "@/components/Panel/SearchBar";
import NotesList from "@/components/Panel/NotesList";
import {noteJsonType} from "@/libs/types/noteType";

export default async function NotesBox({userToken, data} : {userToken: string, data: noteJsonType[] }) {

    return (

        <div className='h-full w-full flex items-start justify-center'>
            <div className='relative basis-[80rem] min-h-[10rem] max-h-[60vh] mx-2 bg-gray-900 border-[1rem] border-transparent flex-shrink bg-clip-padding rounded-md
                            before:absolute before:content-[""] before:top-0 before:left-0 before:right-0 before:bottom-0
                            before:m-[-0.5rem] before:rounded-md before:bg-gradient-to-br before:from-indigo-500 before:via-rose-500 before:via-30% before:to-fuchsia-500 before:to-66% before:-z-20'>
                <SearchBar placeholder="find items" data={data}/>
                <NotesList userToken={userToken} data={data}/>
            </div>
        </div>

    )
}