import React from "react";
import AnimatedBackground from "@/components/animatedBackground";


export default function AuthLayout(
    {children} : Readonly<{ children: React.ReactNode; }>
) {
    return(
        <AnimatedBackground>
            <div className="flex items-center justify-center h-full w-full
        bg-[linear-gradient(to right, black, black 50%, green 50%, green 75%, yellow 75%, yellow)] bg-auto bg-repeat
        ">
                {children}
            </div>
        </AnimatedBackground>
    )
}