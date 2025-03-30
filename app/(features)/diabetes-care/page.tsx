import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";

export default function DiabetesCare() {
    const features = [
        {
            title: "Personalized Diabetes Management",
            description:
                "Get customized treatment plans and continuous monitoring to manage diabetes effectively.",
            image: "https://images.unsplash.com/photo-1576169210859-6796c4b93c32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            className: "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
        },
        {
            title: "Diet and Nutrition Guidance",
            description:
                "Receive expert advice on meal planning and nutrition to keep your blood sugar levels in check.",
            image: "https://plus.unsplash.com/premium_photo-1733342485605-42058eb2daf3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
        },
        {
            title: "Advanced Monitoring Tools",
            description:
                "Track your glucose levels with the latest technology, ensuring real-time health updates.",
            image: "https://plus.unsplash.com/premium_photo-1663050693144-6b5bc76d2214?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
        },
        {
            title: "Comprehensive Patient Support",
            description:
                "Our dedicated team is available 24/7 to assist you with any concerns regarding your diabetes care.",
            image: "https://plus.unsplash.com/premium_photo-1664475450674-543acc07f709?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
        },
    ];

    return (
        <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">

            <div className="px-8">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                    Comprehensive Diabetes Care for a Healthier Life
                </h4>
                <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                    Our expert team provides advanced solutions for diabetes management, ensuring a better quality of life.
                </p>
            </div>

            <div className="relative ">
                <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className="h-full w-full">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    width={800}
                                    height={800}
                                    className="h-full w-full object-cover rounded-sm"
                                />
                            </div>
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({ children, className }: { children: React.ReactNode, className: string }) => {
    return <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>{children}</div>;
};

const FeatureTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
            {children}
        </p>
    );
};

const FeatureDescription = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className="text-sm md:text-base max-w-4xl text-left mx-auto text-neutral-500 font-normal dark:text-neutral-300 text-left max-w-sm mx-0 md:text-sm my-2">
            {children}
        </p>
    );
};
