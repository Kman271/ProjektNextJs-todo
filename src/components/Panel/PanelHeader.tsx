import Bar from "@/components/Panel/Bar";

export default function PanelHeader( {userToken, percent}: {userToken: string, percent: number} ) {

    return(

        <div className='flex flex-row flex-grow-0 flex-shrink-0 items-center justify-center basis-[12rem] w-full space-x-4'>
            <h2 className='block ml-16 basis-[28rem] flex-grow-0 flex-shrink'>{userToken}</h2>
            <Bar percent={percent}/>
        </div>

    )
}