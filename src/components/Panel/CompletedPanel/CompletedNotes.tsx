'use client'
import SearchBar from "@/components/Panel/SearchBar";
import React from "react";
import {noteJsonType} from "@/libs/types/noteType";
import {useSearchParams} from "next/navigation";
import CompletedNotesList from "@/components/Panel/CompletedPanel/CompletedNotesList";


export default function CompletedNotes( {userToken, data} : { userToken: string, data: noteJsonType[] } ) {

    const searchParams = useSearchParams();
    let search: string = searchParams.get('search') || "";

    const pageLimit = 10;
    const genData = (data: noteJsonType[]) => {
        let page = 0; // 0 for first page
        //slice doesn't overflow, it stops at last element
        return data.filter(el => el.task_txt.toLowerCase().includes(search.toLowerCase())).slice(page * pageLimit, page * pageLimit + 10);
    }

   return (
       <div className='relative basis-[80rem] h-fit min-h-[18rem] max-h-[60vh] mx-2 bg-gray-900 border-[1rem] border-transparent flex-shrink bg-clip-padding rounded-md mt-4
            before:absolute before:content-[""] before:top-0 before:left-0 before:right-0 before:bottom-0
            before:m-[-0.5rem] before:rounded-md before:bg-gradient-to-br before:from-indigo-500 before:via-rose-500 before:via-30% before:to-fuchsia-500 before:to-66% before:-z-20'>
           <SearchBar placeholder="find items" data={data}/>
           <CompletedNotesList userToken={userToken} data={data}/>
       </div>
   )
}