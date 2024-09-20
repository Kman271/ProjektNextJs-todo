import React from "react";
import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import Image from "next/image";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '800'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode; }>
) {
  return (
      <html lang="en" className="text-[1.2rem] h-full overflow-hidden">
        <body className={`${poppins.className} flex flex-col h-full overflow-hidden items-center justify-center z-10 bg-black
        `}>
          {children}

        </body>
      </html>
  );
}
