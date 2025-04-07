import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BreadCrumbs from "@/components/molecule/Breadcrumbs/BreadCrumbs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog-site",
  description: "A blog site built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="p-3">
          <BreadCrumbs/>
        </div>
          <div className="flex min-h-screen">

          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
