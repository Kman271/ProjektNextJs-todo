'use client'
import PagerBtn from "@/components/Panel/PagerBtn";

export default function PagerBar({elementsCount, elPerPage, currPage, clickHandler}: {
    elementsCount: number,
    elPerPage: number,
    currPage: number,
    clickHandler: any
}) {

    let pagesCount = Math.ceil(elementsCount/elPerPage)
    let pages = pagesCount == 1 ? null : Array.from({length: pagesCount}, (_, i) => i+1)

    return(
        <ul className='flex justify-center items-center space-x-2'>
            {pages?.map((item) =>
                <li key={item} >
                    <PagerBtn label={item} isCurrentPage={item === currPage} onClick={clickHandler}/>
                </li>
            )}
        </ul>
    )
}
