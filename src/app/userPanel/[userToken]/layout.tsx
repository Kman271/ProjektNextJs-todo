import Link from "next/link";

export default function UserPanelLayout(
    {children, params} : Readonly<{ children: React.ReactNode; params : {userToken: string} }>
) {
    return(
        <div className="flex flex-row w-full h-full">
            <div className="flex-shrink-0 basis-[14rem] h-full bg-gradient-to-b from-gray-800 to-gray-900 bg-cover bg-fixed z-[3]">
                <nav className="flex flex-col h-full w-full">
                    <div
                        className='flex flex-row justify-center items-center w-full basis-[5rem] flex-shrink-0 space-x-2'>
                        <div className="block bg-white rounded-full w-[1.5rem] h-[1.5rem]"/>
                        <p className="font-bold">LevelNote</p>
                    </div>
                    <ul className='mb-20 flex flex-col justify-center items-center basis-full flex-grow space-y-3 w-full text-white'>
                        <li className='basis-[3rem]'>
                            <Link href={`/userPanel/${params.userToken}`}
                                  className='flex items-center h-full w-[10rem] rounded-md shadow-md shadow-gray-900
                                  bg-gradient-to-br from-gray-600 to-gray-700
                                  hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700'>
                                <span className="ml-4">Home</span>
                            </Link>
                        </li>
                        <li className='basis-[3rem]'>
                            <Link href={`/userPanel/${params.userToken}/completed`}
                                  className='flex items-center h-full w-[10rem] rounded-md shadow-md shadow-gray-900
                                  bg-gradient-to-br from-gray-600 to-gray-700
                                  hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700'>
                                <span className="ml-4">Completed</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="basis-1 flex-grow-0 flex-shrink-0 h-full
            bg-gradient-to-b from-indigo-500 via-rose-500 via-30% to-fuchsia-500 to-66% z-[3]"/>

            <div className="w-full
            bg-gradient-to-br from-gray-900 to-black z-[2]">
                {children}
            </div>
        </div>
    )
}