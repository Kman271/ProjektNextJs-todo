'use client'
import React, {useEffect, useState} from "react";
import SubmitButton from "@/components/SubmitButton";
import {usePathname, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {SignUpSchema} from "@/libs/auth/definitions";
import {dbAddUser} from "@/libs/data/data";
import {z} from "zod"
import {signIn} from "@/libs/auth/helpers";

export default function RegisterForm() {

    const router = useRouter()
    const {data: session, status} = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            console.log("Redirecting to user panel...")
            router.push(`/userPanel/${session?.user?.name}`);
        }
    }, [session?.user?.name, status, router]);

    const pathname = usePathname();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [error, setError] = React.useState<string | null>(null);

    const submitClickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            SignUpSchema.parse({name: username, password: password});
            if (password !== confPassword) throw new Error("Passwords don't match");

            console.log("begin to register Data:", {username, password});
            dbAddUser(username, password).then((res) => {
                    console.log("User add finished");

                    const formData = new FormData()
                    formData.append("username", username);
                    formData.append("password", password);
                    signIn(username, formData, pathname).then((responseSign) => {

                        const stringEnd =  responseSign.url.substring(responseSign.url.lastIndexOf('/', responseSign.url.lastIndexOf('/')-1))
                        console.log("Response of sign in after register:", responseSign)

                        if (stringEnd === `/userPanel/${username}`) {
                            console.log("Redirecting to:", responseSign)
                            router.push(responseSign.url);
                            return;
                        }

                        setError("Login after register failed.");
                        console.error("Register signIn Error");
                        return;
                    })
                }
            )
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                setError(error.errors[0].message);
                console.error("Data validation in register Error:", error.errors[0].message);
                return;
            }

            setError(error.message);
            console.error("Register Error:", error.message);
            return;
        }
    }

    if(status === 'loading') return <div>Loading...</div>;
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

                <div className='flex flex-col justify-center'>
                    <p className="text-[0.9rem] font-bold text-gray-500 ml-2">
                        Confirm password
                    </p>
                    <input
                        className="bg-gray-800 border-2 box-border border-gray-600 rounded-xl text-[0.9rem] px-3 h-[2rem] shadow-xl shadow-gray-800
                    focus:border-gray-300 placeholder:text-gray-300 placeholder:text-[0.9rem]"
                        name="confPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={confPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setconfPassword(e.target.value)}}
                        required
                    />
                </div>

            </div>

            { (error) && <p className='text-red-600'>{error?.toString()}</p>}

            <div className='flex-grow-[2]'>
                <SubmitButton label="Register" type="submit"/>
            </div>
        </form>
    )
}
