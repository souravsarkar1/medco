"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from "motion/react";
import {
    AlertCircle,
    Phone,
    MapPin,
    Ambulance,
    Hospital,
    Pill,
    Clock,
    Heart,
    Menu,
    X,
    ChevronRight,
    Shield
} from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';

const EmergencyPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
            {/* Border decorative elements */}
            <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent" />
            </div>
            <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-black">
                <div className="flex items-center gap-2">
                    <div className="size-7 rounded-full bg-gradient-to-br from-red-500 to-pink-500" />
                    <h1 className="text-base font-bold md:text-2xl">Medico</h1>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400">
                        Home
                    </Link>
                    <Link href="/emergency" className="text-red-500 font-medium dark:text-red-400">
                        Emergency
                    </Link>
                    <Link href="/services" className="text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400">
                        Services
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400">
                        Contact
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className="hidden md:block">
                    <Link href="/login">
                        <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Login
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-16 z-40 w-full bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800"
                >
                    <div className="flex flex-col p-4 space-y-3">
                        <Link href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md">
                            Home
                        </Link>
                        <Link href="/emergency" className="px-4 py-2 text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md font-medium">
                            Emergency
                        </Link>
                        <Link href="/services" className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md">
                            Services
                        </Link>
                        <Link href="/contact" className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md">
                            Contact
                        </Link>
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <Link href="/login">
                                <button className="w-full transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="w-full mt-20 px-4 py-8 md:py-12">
                {/* Emergency Alert Banner */}
                <Alert className="bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 mb-8">
                    <AlertCircle className="h-6 w-6 mr-2" />
                    <AlertDescription className="font-medium">
                        For immediate life-threatening emergencies, call emergency services at 911 immediately.
                    </AlertDescription>
                </Alert>

                {/* Main Heading */}
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
                    >
                        Emergency Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                    >
                        Quick access to emergency information and resources. Our priority is your safety and well-being.
                    </motion.p>
                </div>

                {/* Emergency Call Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="max-w-3xl mx-auto mb-12"
                >
                    <Link href="tel:911">
                        <button className="w-full transform rounded-lg bg-red-600 hover:bg-red-700 px-6 py-4 font-medium text-white transition-all duration-300 flex items-center justify-center gap-3 text-lg md:text-xl">
                            <Phone className="h-6 w-6" />
                            Emergency Call: 911
                        </button>
                    </Link>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Emergency Department */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                    >
                        <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full w-fit mb-4">
                            <Hospital className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Emergency Department</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Open 24/7 for all medical emergencies. Immediate care for serious injuries and critical conditions.
                        </p>
                        <Link href="/emergency/department">
                            <button className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium">
                                Find nearest location <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </Link>
                    </motion.div>

                    {/* Urgent Care */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                    >
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
                            <Ambulance className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Urgent Care</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            For non-life-threatening but urgent medical needs. Extended hours and shorter wait times.
                        </p>
                        <Link href="/urgent-care">
                            <button className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                                Check availability <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </Link>
                    </motion.div>

                    {/* Pharmacy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                    >
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-4">
                            <Pill className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">24-Hour Pharmacy</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Access to essential medications any time of day or night. Emergency prescriptions available.
                        </p>
                        <Link href="/pharmacy/emergency">
                            <button className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
                                Find 24-hour pharmacies <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </Link>
                    </motion.div>

                    {/* Virtual Care */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                    >
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
                            <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Virtual Emergency Care</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Immediate video consultations with emergency physicians for assessment and guidance.
                        </p>
                        <Link href="/virtual-care">
                            <button className="flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
                                Start virtual visit <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </Link>
                    </motion.div>

                    {/* First Aid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                    >
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full w-fit mb-4">
                            <Heart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">First Aid Resources</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Access critical first aid information and step-by-step guides for emergency situations.
                        </p>
                        <Link href="/first-aid">
                            <button className="flex items-center text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium">
                                View first aid guides <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </Link>
                    </motion.div>

                    {/* Emergency Contacts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                    >
                        <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full w-fit mb-4">
                            <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Emergency Contacts</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Important phone numbers and contacts for various emergency services and support lines.
                        </p>
                        <Link href="/emergency-contacts">
                            <button className="flex items-center text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium">
                                Save emergency contacts <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="mt-16 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 max-w-6xl mx-auto"
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                        <MapPin className="h-6 w-6 mr-2 text-red-500" />
                        Nearby Emergency Facilities
                    </h2>

                    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-80 flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Interactive map would load here<br />
                            <span className="text-sm">Showing nearby hospitals, urgent care centers, and pharmacies</span>
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-800 dark:text-white">City General Hospital</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">2.3 miles away</p>
                            <p className="text-green-600 dark:text-green-400 text-sm">Open 24/7</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-800 dark:text-white">MediQuick Urgent Care</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">1.1 miles away</p>
                            <p className="text-green-600 dark:text-green-400 text-sm">Open until 11 PM</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-800 dark:text-white">Health First Pharmacy</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">0.8 miles away</p>
                            <p className="text-green-600 dark:text-green-400 text-sm">24-Hour Service</p>
                        </div>
                    </div>
                </motion.div>

                {/* Emergency FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="mt-16 max-w-4xl mx-auto"
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Emergency Care FAQ</h2>

                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-2">When should I call 911 instead of going to urgent care?</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Call 911 for life-threatening emergencies such as chest pain, difficulty breathing, severe bleeding, stroke symptoms, or serious accidents. Urgent care is for non-life-threatening conditions that need prompt attention.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-2">What information should I have ready for emergency responders?</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Have your address, phone number, description of the emergency, current medications, allergies, and medical history ready. Stay on the line until the dispatcher tells you to hang up.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-2">What should I bring to the emergency room?</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Bring your ID, insurance card, list of current medications, allergies information, and medical history. If possible, bring a small bag with essential personal items for comfort.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/emergency/faq">
                            <button className="inline-flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium">
                                View all emergency FAQs <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="w-full border-t border-neutral-200 bg-white px-4 py-8 mt-16 dark:border-neutral-800 dark:bg-black">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="size-6 rounded-full bg-gradient-to-br from-red-500 to-pink-500" />
                            <h3 className="text-lg font-bold">Medico</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Your AI-powered medical assistant for personalized healthcare guidance.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">Home</Link></li>
                            <li><Link href="/emergency" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">Emergency</Link></li>
                            <li><Link href="/services" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">Services</Link></li>
                            <li><Link href="/contact" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Emergency Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/emergency/department" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">Emergency Department</Link></li>
                            <li><Link href="/urgent-care" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">Urgent Care</Link></li>
                            <li><Link href="/first-aid" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">First Aid Guides</Link></li>
                            <li><Link href="/emergency-contacts" className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">Emergency Contacts</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center text-gray-600 dark:text-gray-400"><Phone className="h-4 w-4 mr-2" /> Emergency: 911</li>
                            <li className="flex items-center text-gray-600 dark:text-gray-400"><Phone className="h-4 w-4 mr-2" /> Support: (555) 123-4567</li>
                            <li className="flex items-center text-gray-600 dark:text-gray-400"><MapPin className="h-4 w-4 mr-2" /> 123 Medical Center Drive</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
                    <p>&copy; {new Date().getFullYear()} Medico. All rights reserved.</p>
                    <p className="mt-1">Emergency information provided for guidance only. Always seek professional medical help in emergencies.</p>
                </div>
            </footer>
        </div>
    );
};

export default EmergencyPage;