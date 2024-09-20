'use server'
import React from "react";
import PanelContent from "@/components/Panel/PanelContent";
import {noteJsonType} from "@/libs/types/noteType";
import {getData} from "@/libs/data/data";
import {switchType} from "@/libs/types/dataTypes";


export default async function UserPanelPage({ params }: { params: { userToken: string } }) {


    const dataPending: noteJsonType[] = await getData(params.userToken, 'pending' as switchType);


    return (
        <PanelContent userToken={params.userToken} data={dataPending}/>
    )
}