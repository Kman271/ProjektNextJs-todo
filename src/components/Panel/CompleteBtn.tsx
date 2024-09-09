'use client'
export default function CompleteBtn({onClick}: {onClick: React.ReactEventHandler<HTMLButtonElement>}) {
    return(
        <div className='w-full'>
            <button onClick={onClick} className="block mr-8 mt-3 ml-auto px-4 py-2 w-fit bg-gradient-to-r from-blue-700 to-blue-800 rounded-md">Complete</button>
        </div>
    )
}
