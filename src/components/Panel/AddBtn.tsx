'use client'
import React from "react";

export default function AddBtn({onClick}: {onClick: React.ReactEventHandler<HTMLButtonElement>}) {
    return(
        <div className=''>
            <button type='submit' onSubmit={onClick} className="px-4 py-2 bg-gradient-to-br from-green-700 to-green-800 rounded-md">Add</button>
        </div>
    )
}
