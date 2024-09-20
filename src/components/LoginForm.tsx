'use client'
import React from "react";
import SubmitButton from "@/components/SubmitButton";
import {useRouter} from "next/navigation";

export default function LoginForm() {

    const router = useRouter()
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const submitClickHandler = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if(username.length <= 0) return;
        //checkUsername(username);
        //checkPassword(password);


        router.push(`/userPanel/${username}`)
    }


    return (
        <form
            onSubmit={submitClickHandler}
            className='flex flex-col h-full w-[90%] mt-6'
        >

            <div className='flex-grow-[10] space-y-4'>

                <div className='flex flex-col justify-center'>
                    <p className="text-[0.9rem] font-bold text-gray-500 ml-2">
                        Username
                    </p>
                    <input
                        className="bg-gray-800 border-2 box-border border-gray-600 rounded-xl text-[0.9rem] px-3 h-[2rem] shadow-xl shadow-gray-800
                    focus:border-gray-300 placeholder:text-gray-300 placeholder:text-[0.9rem]"
                        name="username"
                        type="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}
                        required
                    />
                </div>

                <div className='flex flex-col justify-center'>
                    <p className="text-[0.9rem] font-bold text-gray-500 ml-2">
                        Password
                    </p>
                    <input
                        className="bg-gray-800 border-2 box-border border-gray-600 rounded-xl text-[0.9rem] px-3 h-[2rem] shadow-xl shadow-gray-800
                    focus:border-gray-300 placeholder:text-gray-300 placeholder:text-[0.9rem]"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
                        required
                    />
                </div>

            </div>

            <div className='flex-grow-[2]'>
                <SubmitButton label="Log in" type="submit"/>
            </div>
        </form>
    )
}