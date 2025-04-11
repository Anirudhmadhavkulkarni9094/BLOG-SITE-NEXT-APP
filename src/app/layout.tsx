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
  title: "Tech-Espresso ☕ - Curated Daily Reads on AI, DEV, and Tech Research",
  description: "A blog site built with Coffee — explore techblogs, AI trends, and daily reads curated to keep you updated, inspired, and ahead in the tech world.",
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
