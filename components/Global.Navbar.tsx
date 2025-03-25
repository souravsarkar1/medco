"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, User, X } from "lucide-react";
import { DesktopNavigation } from "@/components/DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { UserDropdown } from "@/components/UserDropdown";
import Link from "next/link";

export interface UserDetails {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    gender?: string;
    age?: number;
    bloodGroup?: string;
    height?: number;
}

interface NavbarProps {
    isAuth?: boolean;
    userDetails?: UserDetails;
}

export function GlobalNavbar({
    isAuth = false,
    userDetails
}: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
                            Medco
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <DesktopNavigation />

                        {isAuth && userDetails ? (
                            <UserDropdown userDetails={userDetails} />
                        ) : (
                            <div className="flex items-center gap-2">
                                <User className="text-white" />
                                <p className="text-white">Login</p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <MobileNavigation
                        isAuth={isAuth}
                        userDetails={userDetails}
                    />
                )}
            </div>
        </nav>
    );
}