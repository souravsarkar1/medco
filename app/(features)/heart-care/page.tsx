import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";

export default function HeartCareSection() {
    const features = [
        {
            title: "Comprehensive Heart Check-ups",
            description:
                "Get regular heart screenings to detect potential issues early and maintain a healthy heart.",
            skeleton: <SkeletonOne />,
            className:
                "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
        },
        {
            title: "Advanced Cardiac Treatments",
            description:
                "Our state-of-the-art facilities offer cutting-edge treatments, including minimally invasive procedures.",
            skeleton: <SkeletonTwo />,
            className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
        },
        {
            title: "Expert Cardiologists",
            description:
                "Consult with top cardiologists to receive personalized treatment plans tailored to your needs.",
            skeleton: <SkeletonThree />,
            className:
                "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
        },
        {
            title: "Post-Treatment Care & Recovery",
            description:
                "Our holistic approach ensures smooth recovery with dedicated post-treatment care programs.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
        },
    ];
    return (
        <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
            <div className="px-8">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                    Leading-Edge Heart Care for a Healthier Future
                </h4>

                <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                    Our dedicated team of cardiologists and specialists provide top-quality care, from diagnosis to treatment and beyond.
                </p>
            </div>

            <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className="h-full w-full">{feature.skeleton}</div>
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
    return <p className="text-xl md:text-2xl text-black dark:text-white">{children}</p>;
};

const FeatureDescription = ({ children }: { children: React.ReactNode }) => {
    return <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-300 my-2">{children}</p>;
};

const SkeletonOne = () => (
    <Image src="https://plus.unsplash.com/premium_photo-1661770261598-37fb2e976a40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Heart Checkup" width={800} height={800} className="rounded-sm" />
);

const SkeletonTwo = () => (
    <Image src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cardiac Treatment" width={800} height={800} className="rounded-sm" />
);

const SkeletonThree = () => (
    <Image src="https://plus.unsplash.com/premium_photo-1718349374495-b1d09644f973?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Expert Cardiologists" width={800} height={800} className="rounded-sm" />
);

const SkeletonFour = () => (
    <Image src="https://plus.unsplash.com/premium_photo-1722198062846-523a7fdf7dcf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Post-Treatment Care" width={800} height={800} className="rounded-sm" />
);
