'use client'
import React from "react";
import {diffType, noteJsonType, noteType} from "@/libs/types/noteType";
import {getData} from "@/libs/data/data";
import CompleteBtn from "@/components/Panel/CompleteBtn";
import {updateList} from "@/libs/data/data";
import SearchBar from "@/components/Panel/SearchBar";
import NotesList from "@/components/Panel/NotesList";

interface CheckListProps {
    userToken?: string
}

export default async function CheckList({userToken}: { userToken: string }) {

    let dataJson: noteJsonType[] = await getData(userToken, 'pending');
    let data: noteType[] = dataJson.map(e => (
        {
            ...e,
            difficulty: e.difficulty as diffType,
            isDone: e.isDone ? 'completed' : 'pending',
        }
    ))

    return (
        <div className='h-full w-full flex items-start justify-center'>
            <div className='basis-[80rem] max-h-[60rem] flex-shrink'>
                <SearchBar placeholder="find items"/>
                <NotesList data={data}/>
                <CompleteBtn onClick={updateList}/>
            </div>
        </div>
    )
}