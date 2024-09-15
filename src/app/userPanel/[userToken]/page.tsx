'use server'
import React from "react";
import PanelHeader from "@/components/Panel/PanelHeader";
import PanelContent from "@/components/Panel/PanelContent";
import PanelWrapper from "@/components/Panel/PanelWrapper";
import {noteJsonType} from "@/libs/types/noteType";
import {getData} from "@/libs/data/data";
import {dataPair, switchType} from "@/libs/types/dataTypes";


export default async function UserPanelPage({ params }: { params: { userToken: string } }) {


    const dataPending: noteJsonType[] = await getData(params.userToken, 'pending' as switchType);
    const dataCompletedCount: number = (await getData(params.userToken, 'completed' as switchType)).length;


    return (
        <PanelWrapper>
            <hr className='mt-4 w-[95%] flex-shrink-0 flex-grow-0 h-px bg-gray-600 border-none rounded-full'/>
            <PanelHeader userToken={params.userToken} percent={ dataCompletedCount / (dataCompletedCount + dataPending.length) } />
            <hr className='w-[95%] flex-shrink-0 flex-grow-0 h-px bg-gray-600 border-none rounded-full'/>
            <PanelContent userToken={params.userToken} data={dataPending} />
        </PanelWrapper>
    )
}