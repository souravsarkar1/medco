"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Edit, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserDetails } from "./Global.Navbar";

interface UserDropdownProps {
    userDetails: UserDetails;
}

export function UserDropdown({ userDetails }: UserDropdownProps) {
    const router = useRouter();

    const handleEditProfile = () => {
        router.push(`/user/${userDetails.id}`);
    };

    const handleLogout = () => {
        // Implement logout logic
        console.log("Logging out");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt={userDetails.name}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-800 text-white">
                        {userDetails.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 text-white border-gray-800">
                <DropdownMenuLabel className="text-gray-300">
                    {userDetails.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                    onClick={handleEditProfile}
                    className="focus:bg-gray-900 hover:bg-gray-800 cursor-pointer"
                >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="focus:bg-red-900 hover:bg-red-800 cursor-pointer text-red-500 focus:text-red-300"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}