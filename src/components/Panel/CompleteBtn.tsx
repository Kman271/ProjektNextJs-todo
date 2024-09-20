'use client'
export default function CompleteBtn({onClick}: {onClick: any}) {
    return(
        <div className='w-full'>
            <button onClick={onClick} className="block mr-4 ml-auto mb-4 px-4 py-2 w-fit bg-gradient-to-r from-blue-700 to-blue-800 rounded-md font-bold">Complete</button>
        </div>
    )
}
