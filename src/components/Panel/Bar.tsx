'use client'

export default function Bar({percent = 0}: { percent: number }) {

    if (percent > 100 || percent < 0) {
        throw RangeError('Wrong percent value');
    } else if (isNaN(percent)) {
        percent = 0;
    }

    return (

        <div className='flex items-center basis-[60rem] flex-grow-0 flex-shrink h-full'>
            <div
                className="flex items-center w-[80%] h-12 mr-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-md outline outline-4 outline-gray-200 shadow-md overflow-hidden">
                <div
                    className={`flex items-center h-full bg-gradient-to-r from-indigo-500 via-rose-500 to-fuchsia-500 rounded-r-md z-20`}
                    style={{width: `${percent}%`}}>
                    <p className='my-auto ml-3 mr-auto font-bold z-30'>{percent < 10 ? percent.toPrecision(3) : percent.toPrecision(4)}%</p>
                </div>
            </div>
        </div>

    )
}