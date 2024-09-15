'use client'
import clsx from "clsx";

export default ({label, isCurrentPage, onClick}: {
    label: number,
    isCurrentPage: boolean,
    onClick: (el: number) => void
}) => (
    <button onClick={(e) => {
        e.preventDefault();
        onClick(label)
    }}
            className={clsx('py-2 px-4 rounded bg-gray-800 shadow-md shadow-black font-bold text-white',
                {
                    'bg-blue-500': isCurrentPage,
                    'bg-gray-800': !isCurrentPage
                }
            )}>{label.toString()}</button>
)