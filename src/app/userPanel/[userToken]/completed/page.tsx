import SearchBar from "@/components/Panel/SearchBar";
import React from "react";
import CheckBar from "@/components/Panel/CheckBar";
import {noteJsonType} from "@/libs/types/noteType";
import {getData} from "@/libs/data/data";


export default async function CompletedPage({params} : {params : {userToken : string}} ) {

    let dataJson: noteJsonType[] = await getData(params.userToken, 'completed');

    return(
        <div className='h-full w-full flex items-start justify-center'>
            <div className='basis-[80rem] max-h-[60rem] mt-52 flex-shrink'>
                <SearchBar placeholder="find items"/>
                <ul className='flex flex-col items-center w-full h-fit space-y-1 my-1
            p-1
            bg-gradient-to-br from-gray-300 to-gray-400
            border-2 border-gray-600 shadow-md shadow-black overflow-hidden rounded-md'>
                    {
                        dataJson.length > 0 ? dataJson.map((el, key) =>
                            <li key={key} className='flex flex-col rounded-md overflow-hidden w-[99%] mx-auto'>
                                <CheckBar ID={el.ID} difficulty={el.difficulty} task_txt={el.task_txt} isDone={el.isDone}/>
                            </li>
                        ) : <p className='font-bold'>No data</p>}
                </ul>
            </div>
        </div>
    )
}