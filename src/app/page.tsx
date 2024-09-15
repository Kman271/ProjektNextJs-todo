"use client"
import LoginButton from "@/components/LoginButton";
import React from "react";
import RegisterButton from "@/components/RegisterButton";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <main className="flex flex-col h-full items-center justify-center space-y-8 z-10">
                <div className="mt-[-5rem] flex flex-col items-center space-y-2 shadow-gray-800 drop-shadow-xl">
                    <h1>LevelNote</h1>
                    <h2>Lets start!</h2>
                </div>
                <div className='flex flex-row items-center justify-center space-x-4 w-[50%]'>
                    <hr className='inline bg-gray-300 border-none h-1 w-[45%] rounded-2xl'/>
                    <div className='block w-[10px] h-[10px] rounded-full bg-gray-300'/>
                    <hr className='inline bg-gray-300 border-none h-1 w-[45%] rounded-2xl'/>
                </div>
                <div className="mx-auto w-fit">
                    <p className="mx-auto mb-4 w-fit text-[1.25rem] font-bold drop-shadow-xl">
                        click on the buttons below to begin your journey!</p>
                    <div className="flex flex-row justify-center space-x-2.5">
                        <LoginButton/>
                        <RegisterButton/>
                    </div>
                </div>
            </main>

            <div className="bg-stone-400
          blur h-full w-full absolute -z-10
          ">
                <Image className="brightness-50"
                       src="/Home.jpg" alt='Image of notes on the table' fill={true} objectFit={'cover'}/>
            </div>
        </>
    )
}