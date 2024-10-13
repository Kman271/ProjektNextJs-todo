'use client'

import {useDebouncedCallback} from "use-debounce";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {noteJsonType} from "@/libs/types/noteType";
import React, {useCallback} from "react";

export default function SearchBar({placeholder, data} : {placeholder: string, data: noteJsonType[]}) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback( (name: string, value: string) => {

        let newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set(name, value);

        return newSearchParams.toString()
        }, [searchParams]
    )

    async function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {

        e.stopPropagation();
        router.push(pathname + '?' + createQueryString('search', e.target.value))

    }

    return(

        <div className='flex flex-row items-center justify-end mr-4 mb-3 mt-4'>
            <label className='mr-2 font-bold'>Search</label>
            <input placeholder={placeholder}
            className='p-2 pl-3 rounded-md placeholder:text-gray-500 text-black'
            onChange={useDebouncedCallback( (e) => (
                searchHandler(e)), 300
            )}
            />
        </div>

    )
}