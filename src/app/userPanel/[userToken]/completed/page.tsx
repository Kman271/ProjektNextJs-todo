'use server'

import {noteJsonType} from "@/libs/types/noteType";
import {getData} from "@/libs/data/data";
import React from "react";
import CompletedWrapper from "@/components/Panel/CompletedPanel/CompletedWrapper";
import CompletedNotes from "@/components/Panel/CompletedPanel/CompletedNotes";


export default async function CompletedPage({params} : {params : {userToken : string}} ) {

    const data: noteJsonType[] = await getData(params.userToken, 'completed');

    return (
        <CompletedWrapper>
            <CompletedNotes userToken={params.userToken} data={data} />
        </CompletedWrapper>
    )

}