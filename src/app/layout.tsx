import React, {useEffect} from "react";
import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import {useSession} from "next-auth/react";
import {signOut} from "@/libs/auth/helpers";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '800'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

function useSessionValidation() {
    const { data: session } = useSession();

    useEffect(() => {
        // Check if the session exists
        if (session) {
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            const tokenExpiration = parseInt(session.expires); // 30 minutes expiration from token issuance

            // If the session token has expired, sign out the user

            console.log("token expiration:", tokenExpiration, "time now:", currentTime);

            if (currentTime > tokenExpiration) {
                alert('Session expired. You will be logged out.');
                signOut().then();
            }
        }
    }, [session]);
}

export default function RootLayout( {children}: Readonly<{ children: React.ReactNode; }> ) {

    useSessionValidation();

    return (
      <html lang="en" className="text-[1.2rem] h-full overflow-hidden">
        <body className={`${poppins.className} flex flex-col h-full overflow-hidden items-center justify-center z-10 bg-black`}>
          {children}
        </body>
      </html>
  )

}
