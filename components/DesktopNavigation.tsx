"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import Link from "next/link";

export function DesktopNavigation() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Services">
                <div className="grid grid-cols-2 gap-4 text-sm bg-black/95 p-4 rounded-lg shadow-2xl">
                    <HoveredLink href="/doctor" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Our Services
                    </HoveredLink>
                    <HoveredLink href="/doctor#our-service-department" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Our Services
                    </HoveredLink>
                </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Departments">
                <div className="grid grid-cols-3 gap-4 text-sm bg-black/95 p-4 rounded-lg shadow-2xl">
                    <HoveredLink href="/cardiology" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Cardiology
                    </HoveredLink>
                    <HoveredLink href="/orthopedics" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Orthopedics
                    </HoveredLink>
                    <HoveredLink href="/neurology" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Neurology
                    </HoveredLink>
                    <HoveredLink href="/pediatrics" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Pediatrics
                    </HoveredLink>
                    <HoveredLink href="/dermatology" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Dermatology
                    </HoveredLink>
                    <HoveredLink href="/gynecology" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Gynecology
                    </HoveredLink>
                </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Health Packages">
                <div className="grid grid-cols-2 gap-4 text-sm bg-black/95 p-4 rounded-lg shadow-2xl">
                    <HoveredLink href="/basic-health" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Basic Health Checkup
                    </HoveredLink>
                    <HoveredLink href="/advanced-health" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Advanced Health Checkup
                    </HoveredLink>
                    <HoveredLink href="/diabetes-care" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Diabetes Care Package
                    </HoveredLink>
                    <HoveredLink href="/heart-care" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Heart Care Package
                    </HoveredLink>
                </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Doctors">
                <div className="grid grid-cols-2 gap-4 text-sm bg-black/95 p-4 rounded-lg shadow-2xl">
                    <HoveredLink href="/doctor/find-doctor" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Find a Doctor
                    </HoveredLink>
                    <HoveredLink href="/appointments" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Book an Appointment
                    </HoveredLink>
                    <HoveredLink href="/second-opinion" className="text-gray-200 hover:text-white hover:bg-gray-800/50 p-2 rounded">
                        Get a Second Opinion
                    </HoveredLink>
                </div>

            </MenuItem>
            <Link href="/emergency" >
                Emergency
            </Link>
        </Menu>
    );
}