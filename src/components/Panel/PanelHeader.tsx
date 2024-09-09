import Bar from "@/components/Panel/Bar";

function getUserName(userToken: string) {
    return userToken;
}

export default function PanelHeader({userToken} : {userToken: string}) {

    let username = getUserName(userToken)
    let barPercent = 73;

    return(
        <div className='flex flex-row flex-grow-0 flex-shrink-0 items-center justify-center basis-[12rem] w-full space-x-4'>
            <h2 className='block ml-16 basis-[28rem] flex-grow-0 flex-shrink'>{username}</h2>
            <Bar percent={barPercent}/>
        </div>
    )
}