'use server'
import NotesBox from "@/components/Panel/NotesBox";
import React from "react";
import {noteJsonType} from "@/libs/types/noteType";

export default async function PanelContent( {userToken, data} : { userToken: string, data: noteJsonType[] } ) {

    return(

        <div className='flex items-center justify-center h-fit w-full'>
            <div className='flex flex-col items-center justify-center mx-auto my-4 w-[90%] max-h-[98%]'>
                <NotesBox userToken={userToken} data={data}/>
            </div>
        </div>

    )
}