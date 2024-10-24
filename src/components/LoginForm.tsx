'use client'
import React, {useEffect, useState} from "react";
import SubmitButton from "@/components/SubmitButton";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {signIn} from "@/libs/auth/helpers";
import {useSession} from "next-auth/react";
import useSessionValidation from "@/libs/auth/utils";

export default function LoginForm() {

    useSessionValidation();

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter()
    const {data: session, status} = useSession();

    useEffect( () => {
        if(status === 'authenticated') {
            console.log("Redirecting to user panel...")
            router.push(`/userPanel/${session?.user?.name}`);
        }
    }, [session?.user?.name, status, router]);

    useEffect( () => {
        const errorParam = searchParams?.get('error');
        if (errorParam) {
            setError(decodeURIComponent(errorParam));  // Decode the error param in case it is URL-encoded
        } else {
            setError(null);  // Clear error if no error param is present
        }
    }, [searchParams]);


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = React.useState<string|null>(null);



    const submitClickHandler = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = new FormData();
        form.append("username", username);
        form.append("password", password);

        try {

            // console.log("begin to sign in with formData:", form);
            const response = await signIn(username, form, pathname);

            if(!response.ok) throw new Error();

            // console.log("Sign in finished with response:", response);
            router.push(response.url);

        } catch (error: any) {

            setError(error.message || "Unexpected error");
            console.error("SignIn Error:", error);
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
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value)
                        }}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value)
                        }}
                        required
                    />
                </div>

            </div>

            { error && <p className='text-red-600'>{error}</p> }

            <div className='flex-grow-[2]'>
                <SubmitButton label="Log in"
                              type="submit"/>
            </div>
        </form>

    )
}