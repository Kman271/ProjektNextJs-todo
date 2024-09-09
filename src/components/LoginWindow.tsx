import CardWrapper from "@/components/CardWrapper"
import CardHeader from "@/components/CardHeader"
import CardContent from "@/components/CardContent"
import CardFooter from "@/components/CardFooter"
import React from "react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginWindow() {

    return (
        <CardWrapper className="h-[29rem] w-[22rem] overflow-hidden">
            <CardHeader className="flex flex-col items-center justify-center flex-grow-[6] flex-shrink-0">
                <p className="text-[2rem] font-bold my-auto">Login page</p>
                <hr className="w-[90%] h-1 border-0 my-0 rounded bg-gray-600"/>
            </CardHeader>

            <CardContent className="flex flex-col items-center flex-grow-[10] flex-shrink-0">
                <LoginForm/>
            </CardContent>

            <CardFooter className="flex flex-col items-center flex-grow-[4] flex-shrink-0">
                <hr className="w-[90%] h-px border-0 rounded bg-gray-600 my-0"/>
                <p className="w-fit my-auto text-[1.1rem] text-gray-300">No account? Create it <Link
                    className="text-white font-bold border-orange-500 underline underline-offset-3"
                    href="/auth/register">Here</Link></p>
            </CardFooter>
        </CardWrapper>
    )
}