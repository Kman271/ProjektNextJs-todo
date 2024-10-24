import RegisterWindow from "@/components/RegisterWindow";
import {AuthSessionWrapper} from "@/components/AuthSessionWrapper";
import {Suspense} from "react";


export default function RegisterPage() {
    return(
        <Suspense fallback={<div>Loading login page...</div>}>
            <RegisterWindow/>
        </Suspense>
    )
}