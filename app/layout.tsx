'use client';

import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { GlobalNavbar } from "@/components/Global.Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/lib/redux/provider";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

// Move metadata to a separate file since we're using 'use client'
const metadata: Metadata = {
  title: "Medico",
  description: "Medico - Your Health Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        <ReduxProvider>
          <GlobalNavbar />
          {children}
          <Footer />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
