'use client'
import {noteJsonType} from "@/libs/types/noteType";
import React, {useCallback, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {dbDeleteNote, dbUpdateList} from "@/libs/data/data";
import NoteBar from "@/components/Panel/NoteBar";
import AddBar from "@/components/Panel/AddBar";
import PagerBar from "@/components/Panel/PagerBar";
import CompleteBtn from "@/components/Panel/CompleteBtn";

export default function NotesList({userToken, data}: { userToken: string, data: noteJsonType[] }) {

    const [isCheckedArr, setCheckedArr] = useState<{ [key: number] : boolean }>({});

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    let search: string = searchParams.get('search') || "";
    let page: number = parseInt(searchParams.get('page') || '1') - 1;

    const deleteHandler = useCallback( (ID: number, isDone: boolean) => {
        dbDeleteNote(userToken, ID, isDone).then(p => (p))
        router.refresh();
    }, [userToken, router])

    const pageLimit = 5;
    const genData = (data: noteJsonType[]) => {
        //slice doesn't overflow, it stops at last element
        return data.filter(el => el.task_txt.toLowerCase()
            .includes(search.toLowerCase()))
            .sort((a,b) => (a.ID < b.ID ? -1 : 1 ))
            .slice(page * pageLimit, page * pageLimit + 5);
    }

    const setSearchParams = useCallback(
        function setSearchParams(name: string, value: number) {
            let newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set(name, String(value));

            return newSearchParams.toString()
        },
        [searchParams]
    )

    const checkHandler = (id:number, isChecked: boolean) => {
        setCheckedArr((checked) => ({...checked, [id]: isChecked}) )
    }

    const pagerClickHandler = useCallback(
        (newCurrentPage: number) => {

            router.push(pathname + '?' + setSearchParams('page', newCurrentPage))

        }, [router, pathname, setSearchParams]
    )

    const generatedData = genData(data);
    const genIDs: number[] = Object.keys(isCheckedArr)
        .filter((key)=>(isCheckedArr[parseInt(key)]))
        .map((key) => parseInt(key));

    const completeClickHandler = useCallback( () => {

            dbUpdateList(genIDs).then(p => p);
            router.refresh();

        }, [genIDs, router]
    )

    return (
        <div>
            <div
                className='flex flex-col justify-center bg-transparent to-66% border-2 border-transparent overflow-hidden rounded-md'>

                <ul className='flex flex-col items-center w-full h-fit space-y-1 my-1 p-1 '>
                    {generatedData.map((el, _key) =>
                        <li key={el.ID} className='flex flex-col rounded-md overflow-hidden w-[99%] mx-auto'>
                            <NoteBar
                                data={el}
                                deleteHandler={() => deleteHandler(el.ID, el.isDone)}
                                setIsChecked={checkHandler}
                                isChecked={isCheckedArr[el.ID]}
                            />
                        </li>
                    )}
                </ul>

                <AddBar userToken={userToken}/>
                <PagerBar
                    elPerPage={pageLimit}
                    elementsCount={data.length}
                    currPage={parseInt(searchParams.get('page') || '1')}
                    clickHandler={pagerClickHandler}/>
            </div>
            <CompleteBtn onClick={completeClickHandler}/>

        </div>
    )
}