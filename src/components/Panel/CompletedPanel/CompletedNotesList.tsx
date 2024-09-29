'use client'
import PagerBar from "@/components/Panel/PagerBar";
import {noteJsonType} from "@/libs/types/noteType";
import React, {useCallback} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {dbDeleteNote} from "@/libs/data/data";
import CompletedNoteBar from "@/components/Panel/CompletedPanel/CompletedNoteBar";

export default function CompletedNotesList({userToken, data}: { userToken: string, data: noteJsonType[] }) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const deleteHandler = useCallback( (ID: number, isDone: boolean) => {
        dbDeleteNote(userToken, ID, isDone).then(p => (p))
        router.refresh();
    }, [router, userToken])

    let search: string = searchParams.get('search') || "";
    let page: number = parseInt(searchParams.get('page') as string || '1'); //1 for first page

    const pageLimit = 10; //10 per page
    const genData = (data: noteJsonType[]) => {
        //slice doesn't overflow, it stops at last element
        return data.filter(
            el => el.task_txt.toLowerCase()
                .includes(search.toLowerCase()))
            .slice( (page-1) * pageLimit, (page-1) * pageLimit + pageLimit);
    }

    const setSearchParams = useCallback(
        function setSearchParams(name: string, value: number) {
            let newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set(name, String(value));

            return newSearchParams.toString()
        },
        [searchParams]
    )

    const pagerClickHandler = useCallback(
        (newCurrentPage: number) => {
            router.push(pathname + '?' + setSearchParams('page', newCurrentPage))
        }
        , [router, pathname, setSearchParams]
    )

    const generatedData = genData(data);

    return (
        <div>

            <div
                className='flex flex-col justify-center items-center bg-transparent to-66% border-2 border-transparent overflow-hidden rounded-md'>

                {data.length > 0 ? (
                <ul className='flex flex-col items-center w-full h-fit space-y-1 my-1 p-1 '>
                    {generatedData.map((el, key) =>
                        <li key={el.ID} className='flex flex-col rounded-md overflow-hidden w-[99%] mx-auto'>
                            <CompletedNoteBar data={el} deleteHandler={() => deleteHandler(el.ID, el.isDone)} />
                        </li>
                    )}
                </ul>
                ) : (<h1 className='mt-4'>No data</h1>)
                }

                <PagerBar elPerPage={pageLimit}
                          elementsCount={data.length}
                          currPage={parseInt(searchParams.get('page') || '1')}
                          clickHandler={pagerClickHandler}
                />
            </div>

        </div>
    )
}