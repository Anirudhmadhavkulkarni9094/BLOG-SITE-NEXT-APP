import Sidebar from "@/components/molecule/Sidebar/Sidebar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})
 

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
      <body className={`${poppins.variable} ${poppins.variable} antialiased`}>

        <div className="flex min-h-screen">
          <Sidebar />
        <ToastContainer>
        </ToastContainer>
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
