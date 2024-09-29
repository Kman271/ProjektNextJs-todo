"use client"

import {signOut} from "@/libs/auth/helpers";
import React from "react";

export function LogOutBtn() {

    return(
        <button onClick={signOut}>Sign out</button>
    )
}