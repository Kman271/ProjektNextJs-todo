'use client'
import NavBtn from "@/components/Panel/NavBtn";
import {useState} from "react";

export default function NavBar({elementsCount, elPerPage} : {elementsCount: number, elPerPage: number} ) {

    const [currPage, setCurrPage] = useState(1);
    function clickHandler(num: number) {
         setCurrPage( a => a+num )
    }

    let pagesCount = Math.ceil(elementsCount/elPerPage)
    let pages = pagesCount == 1 ? null : Array.from({length: pagesCount}, (_, i) => i+1)

    return(
        <ul className='flex justify-center items-center space-x-2'>
            {pages?.map((item, i) =>
                <li key={i} >
                    <NavBtn label={item} isCurrentPage={i == currPage} onClick={clickHandler}/>
                </li>
            )}
        </ul>
    )
}
