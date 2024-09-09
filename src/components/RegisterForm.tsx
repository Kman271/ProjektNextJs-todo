'use client'
import React from "react";
import SubmitButton from "@/components/SubmitButton";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function RegisterForm() {

    const router = useRouter()
    let name = "Tomek"

    return (
        <form
            className={`flex flex-col relative space-between h-fit w-72 mt-6 mx-6`}>
            <p className="text-[0.9rem] font-bold text-gray-500 ml-2">Username</p>
            <input
                className="placeholder:text-gray-300 bg-gray-800 border-2 border-gray-600 mb-6 rounded-xl h-[2.5rem] text-[1.1rem] p-4 shadow-xl shadow-gray-800 focus:border-gray-300"
                name="username" type="username" placeholder="Enter username" required/>
            <p className="text-[0.9rem] font-bold text-gray-500 ml-2">Password</p>
            <input
                className="placeholder:text-gray-300 bg-gray-800 border-2 border-gray-600 mb-6 rounded-xl h-[2.5rem] text-[1.1rem] p-4 shadow-xl shadow-gray-800 focus:border-gray-300"
                name="password" type="password" placeholder="Enter password" required/>
            <p className="text-[0.9rem] font-bold text-gray-500 ml-2">Confirm password</p>
            <input
                className="placeholder:text-gray-300 bg-gray-800 border-2 border-gray-600 mb-10 rounded-xl h-[2.5rem] text-[1.1rem] p-4 shadow-xl shadow-gray-800 focus:border-gray-300"
                name="confirmPassword" type="password" placeholder="Enter password again" required/>
            <SubmitButton onClick={() => router.push(`/userPanel/${name}`)} label="Register" type="submit"/>

        </form>
    )
}