'use client'
import React from "react";
import SubmitButton from "@/components/SubmitButton";
import {useRouter} from "next/navigation";

export default function LoginForm() {

    const router = useRouter()
    let name = "Tomek"


    return (
        <form
        className={`flex flex-col relative h-fit w-72 mt-6 mx-6`}>

            <p className="text-[0.9rem] font-bold text-gray-500 ml-2">Username</p>
            <input className="bg-gray-800 border-2 border-gray-600 mb-6 rounded-xl h-[2.5rem] text-[1.1rem] p-4 shadow-xl shadow-gray-800 focus:border-gray-300
            placeholder:text-gray-300 placeholder:text-[1rem]"
                   name="username" type="username" placeholder="Enter username" required/>

            <p className="text-[0.9rem] font-bold text-gray-500 ml-2">Password</p>
            <input className="bg-gray-800 border-2 border-gray-600 mb-10 rounded-xl h-[2.5rem] text-[1.1rem] p-4 shadow-xl shadow-gray-800 focus:border-gray-300
            placeholder:text-gray-300 placeholder:text-[1rem]"
                   name="password" type="password" placeholder="Enter password" required/>

            <SubmitButton onClick={() => router.push(`/userPanel/${name}`)} label="Log in" type="submit"/>
        </form>
    )
}