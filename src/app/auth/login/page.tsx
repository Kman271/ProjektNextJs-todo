import LoginWindow from "@/components/LoginWindow";
import React, {Suspense} from "react";

export default function LoginPage() {


    return(
        <Suspense fallback={<div>Loading login page...</div>}>
            <LoginWindow/>
        </Suspense>
    )
}