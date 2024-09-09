'use client'

import {useDebounce, useDebouncedCallback} from "use-debounce";

export default function SearchBar({placeholder} : {placeholder: string}) {

    function handleSearch (term: string) {
        console.log(term);
    }

    return(
        <div className='flex flex-row items-center justify-end mr-4 mb-3'>
            <label className='mr-2'>Search</label>
            <input placeholder={placeholder}
            className='p-2 pl-3 rounded-md placeholder:text-gray-500 text-black'
            onChange={useDebouncedCallback((e) => (handleSearch(e.target.value)), 300)}/>
        </div>
    )
}