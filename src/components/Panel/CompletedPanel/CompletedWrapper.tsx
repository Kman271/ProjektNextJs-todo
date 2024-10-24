import React from "react";
import {AuthSessionWrapper} from "@/components/AuthSessionWrapper";

export default function CompletedWrapper({children}: {children: React.ReactNode}) {

    return (
        <AuthSessionWrapper className='h-full w-full flex justify-center'>
                {children}
        </AuthSessionWrapper>
    )

}