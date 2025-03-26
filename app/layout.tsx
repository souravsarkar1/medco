import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { GlobalNavbar } from "@/components/Global.Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medico",
  description: "Medico - Your Health Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const userDetails = {
    id: "user123",
    name: "Sourav Sarkar",
    email: "souravsarkar@gmail.com",
    phone: "+91 9876543210",
    address: "123, Main Street, Anytown, India",
    gender: "Male",
    age: 25,
    bloodGroup: "A+",
    height: 170,
  };


  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        <GlobalNavbar isAuth={true} userDetails={userDetails} />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
