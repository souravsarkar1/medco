"use client";
import React, { useState } from "react";
import { HoveredLink } from "./ui/navbar-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Edit, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";



export function MobileNavigation({
    isAuth = false,
    userDetails
}: any) {
    const router = useRouter();

    const handleEditProfile = () => {
        if (userDetails) {
            router.push(`/user/${userDetails.id}`);
        }
    };

    const handleLogout = () => {
        // Implement logout logic
        console.log("Logging out");
    };

    return (
        <div className="md:hidden bg-black/95 absolute inset-x-0 top-16">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <MobileMenuItem title="Services">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <HoveredLink href="/general-consultation" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                            General Consultation
                        </HoveredLink>
                        <HoveredLink href="/telemedicine" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                            Telemedicine
                        </HoveredLink>
                        <HoveredLink href="/diagnostics" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                            Diagnostic Tests
                        </HoveredLink>
                        <HoveredLink href="/pharmacy" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                            Pharmacy
                        </HoveredLink>
                        <HoveredLink href="/mental-health" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                            Mental Health Services
                        </HoveredLink>
                    </div>
                </MobileMenuItem>
                {/* Add other menu items similarly */}

                {/* Mobile User Section */}
                {isAuth && userDetails && (
                    <div className="p-4 border-t border-gray-800">
                        <div className="flex items-center mb-4">
                            <Avatar className="mr-4">
                                <AvatarImage
                                    src="/placeholder-avatar.jpg"
                                    alt={userDetails.name}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-gray-800 text-white">
                                    {userDetails.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-white font-semibold">{userDetails.name}</p>
                                <p className="text-gray-400 text-sm">{userDetails.email}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <button
                                onClick={handleEditProfile}
                                className="w-full flex items-center text-white hover:bg-gray-800 p-2 rounded"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center text-red-500 hover:bg-red-900/20 p-2 rounded"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function MobileMenuItem({
    title,
    children
}: {
    title: string,
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-3 py-2 font-medium text-white hover:bg-gray-900"
            >
                {title}
            </button>
            {isOpen && (
                <div className="p-4 bg-black/90">
                    {children}
                </div>
            )}
        </div>
    );
}