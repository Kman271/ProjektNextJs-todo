'use client'
import NavBtn from "@/components/Panel/NavBtn";
import {useState} from "react";
import {number} from "prop-types";

export default function NavBar({elementsCount, elPerPage, currentPage} : {elementsCount: number, elPerPage: number, currentPage: number, onClick: (page: number) => void}) {

    const [currPage, setCurrPage] = useState(1);
    function clickHandler(num: number) {
         setCurrPage( a => a+number )
    }

    let pagesCount = Math.ceil(elementsCount/elPerPage)
    let pages = pagesCount == 1 ? null : Array.from({length: pagesCount}, (_, i) => i+1)

    return(
        <ul className='flex justify-center items-center space-x-2'>
            {pages?.map((item, i) =>
                <li key={i} >
                    <NavBtn label={item} isCurrentPage={i == currentPage} onClick={setCurrPage}/>
                </li>
            )}
        </ul>
    )
}
