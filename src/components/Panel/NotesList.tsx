'use client'
import CheckBar from "@/components/Panel/CheckBar";
import NavBar from "@/components/Panel/NavBar";
import {noteJsonType} from "@/libs/types/noteType";
import {updateList} from "@/libs/data/data";
import AddBar from "@/components/Panel/AddBar";
import React from "react";
import CompleteBtn from "@/components/Panel/CompleteBtn";
import {useSearchParams} from "next/navigation";


export default function NotesList({userToken, data}: { userToken: string, data: noteJsonType[] }) {

    const searchParams = useSearchParams();
    let search: string = searchParams.get('search') || "";

    let page = 0; // 0 for first page
    let pageLimit = 5;

    const genData = (data: noteJsonType[]) => {
        //slice doesn't overflow, it stops at last element
        return data.filter(el => el.task_txt.toLowerCase().includes(search.toLowerCase())).slice(page * pageLimit, page * pageLimit + 5);
    }

    return (
        <div>
            <div
                className='flex flex-col justify-center bg-transparent to-66% border-2 border-transparent overflow-hidden rounded-md'>

                <ul className='flex flex-col items-center w-full h-fit space-y-1 my-1 p-1 '>
                    {genData(data).map((el, key) =>
                        <li key={el.ID} className='flex flex-col rounded-md overflow-hidden w-[99%] mx-auto'>
                            <CheckBar ID={el.ID} difficulty={el.difficulty} task_txt={el.task_txt}
                                      isDone={el.isDone}/>
                        </li>
                    )}
                </ul>

                <AddBar userToken={userToken}/>
                <NavBar elPerPage={pageLimit} elementsCount={data.length}/>
            </div>
            <CompleteBtn onClick={updateList}/>

        </div>
    )
}