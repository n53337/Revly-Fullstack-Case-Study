import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import '@ant-design/v5-patch-for-react-19';
import { Providers } from "@/providers";
import AppNavbar from "@/components/app-navbar";

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Revly Case Study",
  description: "Revly case study fullstack app for the interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  antialiased`}
      >
        <Providers>

          <main className="min-h-screen w-full">
            <AppNavbar>
            {children}
            </AppNavbar>
          </main>

        </Providers>
      </body>
    </html>
  );
}
