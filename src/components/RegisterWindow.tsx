import CardWrapper from "@/components/CardWrapper";
import CardHeader from "@/components/CardHeader";
import CardContent from "@/components/CardContent";
import CardFooter from "@/components/CardFooter";
import Link from "next/link";
import React from "react";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterWindow() {

    return (

        <CardWrapper className='h-[28rem]'>
            <CardHeader className="flex-grow-[3] flex-shrink-0">
                <h1 className="text-[1.5rem] leading-loose font-bold my-auto">Register page</h1>
                <hr className="w-[90%] h-0.5 border-0 my-0 rounded bg-gray-600"/>
            </CardHeader>

            <CardContent className="flex-grow-[10]">
                <RegisterForm/>
            </CardContent>

            <CardFooter className="flex flex-col items-center flex-grow-[2] flex-shrink-0">
                <hr className="w-[90%] h-px border-0 rounded bg-gray-600 my-0"/>
                <p className="w-fit my-auto text-[0.8rem] text-gray-400">Already have an account? Login <Link
                    className="text-gray-100 font-bold border-orange-500 underline underline-offset-3"
                    href="/auth/login">Here</Link>
                </p>
            </CardFooter>
        </CardWrapper>

    )
}
