'use client'
import {noteType} from "@/libs/types/noteType";
import CheckBar from "@/components/Panel/CheckBar";
import NavBar from "@/components/Panel/NavBar";
import React, {useState} from "react";

export default function NotesList({data}: { data: noteType[] }) {
    let page = 0; // 0 for first page
        let pageLimit = 5;

        return ( //slice doesn't overflow it stops at last element
            <div>
                    <ul className='flex flex-col items-center w-full h-fit space-y-1 my-1
            p-1
            bg-gradient-to-br from-gray-300 to-gray-400
            border-2 border-gray-600 shadow-md shadow-black overflow-hidden rounded-md'>
                            {data.slice(page * pageLimit, page * pageLimit + 5).map((el, key) =>
                                <li key={key} className='flex flex-col rounded-md overflow-hidden w-[99%] mx-auto'>
                                        <CheckBar ID={el.ID} difficulty={el.difficulty} text={el.text}
                                                  isDone={el.isDone}/>
                                </li>
                            )}
                    </ul>
                    <NavBar  currentPage={page} elPerPage={pageLimit} elementsCount={data.length}/>
            </div>
        )
}