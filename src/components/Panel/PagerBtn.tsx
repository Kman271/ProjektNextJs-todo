'use client'
import clsx from "clsx";

export default function PagerBtn({label, isCurrentPage, onClick}: {
    label: number,
    isCurrentPage: boolean,
    onClick: any
}) {

    return (

        <button onClick={ (e) =>
        {
            e.preventDefault();
            onClick(label);
        }}
                className={clsx('py-2 px-4 rounded shadow-md shadow-black font-bold text-white',
                    {
                        'bg-blue-500': isCurrentPage,
                        'bg-gray-800': !isCurrentPage
                    }
                )}
        >
            {label.toString()}
        </button>

    )
}