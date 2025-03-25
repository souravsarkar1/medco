"use client";

import Link from "next/link";
import {
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Github,
    Heart,
    Mail
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: Twitter,
            href: "https://twitter.com/medco",
            label: "Twitter"
        },
        {
            icon: Facebook,
            href: "https://facebook.com/medco",
            label: "Facebook"
        },
        {
            icon: Instagram,
            href: "https://instagram.com/medco",
            label: "Instagram"
        },
        {
            icon: Linkedin,
            href: "https://linkedin.com/company/medco",
            label: "LinkedIn"
        },
        {
            icon: Github,
            href: "https://github.com/medco",
            label: "GitHub"
        }
    ];

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy", href: "/privacy" }
    ];

    return (
        <footer className="w-full py-12 text-neutral-600 dark:text-neutral-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
                            MedCo
                        </h3>
                        <p className="text-sm">
                            Innovative healthcare solutions bringing compassionate medical care to your doorstep.
                        </p>
                        <div className="flex space-x-3 mt-6">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                            Quick Links
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm hover:text-primary transition-colors duration-300"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                            Contact Us
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span className="text-sm">support@medco.com</span>
                            </div>
                            <div className="text-sm">
                                123 Healthcare Lane
                                <br />
                                Medical District, MC 12345
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
                    <p className="text-sm flex items-center justify-center">
                        © {currentYear} MedCo. All Rights Reserved
                        <Heart className="h-4 w-4 ml-2 text-red-500" fill="currentColor" />
                    </p>
                </div>
            </div>
        </footer>
    );
}