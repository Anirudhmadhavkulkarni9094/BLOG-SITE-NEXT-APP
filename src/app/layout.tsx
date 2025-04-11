import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})



export const metadata: Metadata = {
  title: "Tech-Espresso ☕",
  description: "A blog site built with Coffee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppins.variable} antialiased`}>
        <Navbar></Navbar>
          <div className="flex min-h-screen">
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
