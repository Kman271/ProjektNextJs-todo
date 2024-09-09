import CardWrapper from "@/components/CardWrapper";
import CardHeader from "@/components/CardHeader";
import CardContent from "@/components/CardContent";
import CardFooter from "@/components/CardFooter";
import Link from "next/link";
import React from "react";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterWindow() {

    return (
        <CardWrapper className="h-[32rem] w-[22rem] overflow-hidden">
            <CardHeader className="flex flex-col items-center justify-center flex-grow-[2] flex-shrink-0">
                <p className="text-[2rem] font-bold my-[1.25rem]">Register page</p>
                <hr className="w-[90%] h-1 border-0 rounded bg-gray-600"/>
            </CardHeader>

            <CardContent className="flex flex-col items-center flex-grow-[10] flex-shrink-0">
                <RegisterForm/>
            </CardContent>

            <CardFooter className="flex flex-col items-center flex-grow-[5] flex-shrink-0">
                <hr className="w-[90%] h-px border-0 rounded bg-gray-600 mb-2"/>
                <p className="w-fit mb-1 text-[1.1rem] text-gray-300">Already registered? Click <Link
                    className="text-orange-500 font-bold border-orange-500 underline underline-offset-3"
                    href="/auth/login">Here</Link></p>
            </CardFooter>
        </CardWrapper>
    )
}