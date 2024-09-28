"use client"
import {signOut} from "@/libs/auth/helpers";
import React from "react";


export default function SignOutButton() {
    return (
        <button onClick={(e) => {
            e.preventDefault();
            signOut().then( () => {console.log("Logged out")} );
        }}
                className='flex items-center h-full w-[10rem] rounded-md shadow-md shadow-gray-900
                                  bg-gradient-to-br from-gray-600 to-gray-700
                                  hover:bg-gradient-to-br hover:from-orange-600 hover:to-orange-700'>
            <span className="ml-4">Sign out</span>
        </button>
    )
}