import React from "react";
import PanelHeader from "@/components/Panel/PanelHeader";
import PanelContent from "@/components/Panel/PanelContent";
import PanelWrapper from "@/components/Panel/PanelWrapper";


export default function UserPanelPage({ params }: { params: { userToken: string } }) {


    return (
        <PanelWrapper>
            <hr className='mt-4 w-[95%] flex-shrink-0 flex-grow-0 h-px bg-gray-600 border-none rounded-full'/>
            <PanelHeader userToken={params.userToken} />
            <hr className='w-[95%] flex-shrink-0 flex-grow-0 h-px bg-gray-600 border-none rounded-full'/>
            <PanelContent userToken={params.userToken} />
        </PanelWrapper>
    )
}