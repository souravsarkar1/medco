"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    User,
    MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { toast } from "sonner";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { ImagesSlider } from "@/components/ui/images-slider";
import { IconEmergencyBed, IconSocial } from "@tabler/icons-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Basic form validation
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Here you would typically send the form data to a backend
        console.log("Form Submitted:", formData);

        // Show success toast
        toast.success("Message Sent");

        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            message: ""
        });
    };

    return (
        <div className="relative mx-auto my-10 mt-23 mb-10 flex max-w-7xl flex-col items-center justify-center">
            {/* Hero Section Similar to Previous Component */}
            <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>

            <div className="px-4 py-1 md:py-2">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-3xl md:text-5xl font-bold mb-2 text-slate-700 dark:text-slate-300"
                >
                    Contact MedCo Support
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 mb-2"
                >
                    We're here to help you with any questions or concerns. Reach out to our support team and we'll get back to you as soon as possible.
                </motion.p>
            </div>

            <div className="container mx-auto max-w-6xl px-2">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Information */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <MessageCircle className="h-6 w-6 text-primary" />
                                <span>Contact Information</span>
                            </CardTitle>
                            <CardDescription>
                                We're here to help and answer any question you might have
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <MapPin className="h-6 w-6 text-primary shrink-0" />
                                    <div>
                                        <p className="font-semibold">Our Office</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            123 Healthcare Lane, Medical District, MC 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Phone className="h-6 w-6 text-primary shrink-0" />
                                    <div>
                                        <p className="font-semibold">Phone</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            (555) 123-4567
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Mail className="h-6 w-6 text-primary shrink-0" />
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            support@medco.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Clock className="h-6 w-6 text-primary shrink-0" />
                                    <div>
                                        <p className="font-semibold">Hours</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Mon-Fri: 9am - 5pm
                                            <br />
                                            Sat: 10am - 2pm
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <IconSocial className="h-6 w-6 text-primary shrink-0" />
                                    <div>
                                        <p className="font-semibold">Social Media</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Follow us on Twitter
                                            <br />
                                            Connect on LinkedIn
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <IconEmergencyBed className="h-6 w-6 text-primary shrink-0" />
                                    <div>
                                        <p className="font-semibold">Emergency Support</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            24/7 Emergency Line
                                            <br />
                                            1-800-MEDICO-HELP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Send className="h-6 w-6 text-primary" />
                                <span>Send Us a Message</span>
                            </CardTitle>
                            <CardDescription>
                                Fill out the form and we'll get back to you within 24 hours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Your Name"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="you@example.com"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="(555) 123-4567"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell us how we can help you..."
                                        className="min-h-[120px]"
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    <Send className="mr-2 h-4 w-4" /> Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}