"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconBone,
    IconMassage,
    IconMedicineSyrup,
    IconPhysotherapist,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Activity } from "lucide-react";

export default function BentoGridThirdDemo() {
    return (
        <div className="mt-25">
            <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={cn("[&>p:text-lg]", item.className)}
                        icon={item.icon}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}

const SkeletonOne = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🦴</span>
                </div>
                <div className="w-full bg-gray-100 h-6 rounded-full dark:bg-neutral-900 relative overflow-hidden">
                    <span className="absolute left-2 text-[0.8rem] text-gray-500 whitespace-nowrap">
                        Joint Mobility: 85%
                    </span>
                </div>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <div className="w-full bg-gray-100 h-6 rounded-full dark:bg-neutral-900 relative overflow-hidden">
                    <span className="absolute right-2 text-[0.8rem] text-gray-500 whitespace-nowrap">
                        Pain Level: 2/10
                    </span>
                </div>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🦴</span>
                </div>
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🦴</span>
                </div>
                <div className="w-full bg-gray-100 h-6 rounded-full dark:bg-neutral-900 relative overflow-hidden">
                    <span className="absolute left-2 text-[0.8rem] text-gray-500 whitespace-nowrap">
                        Recovery Progress: 70%
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

const SkeletonTwo = () => {
    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2,
            },
        },
    };

    const orthopedicTests = [
        { label: "Range of Motion", value: "120°" },
        { label: "Bone Density", value: "-1.2 T-score" },
        { label: "Muscle Strength", value: "4/5" },
        { label: "Gait Analysis", value: "Normal" },
        { label: "Ligament Stability", value: "Grade 1" },
        { label: "Cartilage Health", value: "Mild Wear" }
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-2"
        >
            {orthopedicTests.map((test, i) => (
                <motion.div
                    key={"ortho-test-" + i}
                    variants={variants}
                    style={{
                        maxWidth: Math.random() * (100 - 40) + 40 + "%",
                    }}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-8 relative overflow-hidden"
                >
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium truncate">
                            {test.label}
                        </span>
                        <span className="text-xs font-semibold text-blue-500 dark:text-blue-400">
                            {test.value}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" />
                </motion.div>
            ))}
        </motion.div>
    );
};

const SkeletonThree = () => {
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
            style={{
                border: "1px solid #e5e7eb",
                backgroundImage: "url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <motion.div className="h-full w-full rounded-lg"></motion.div>
        </motion.div>
    );
};

const SkeletonFour = () => {
    const first = {
        initial: {
            x: 20,
            rotate: -5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    const second = {
        initial: {
            x: -20,
            rotate: 5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
        >
            <motion.div
                variants={first}
                className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <Image
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="X-ray"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Joint X-ray Analysis
                </p>
                <p className="border border-blue-500 bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Diagnostic
                </p>
            </motion.div>
            <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                <Image
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Spine"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Spinal Alignment Check
                </p>
                <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Essential
                </p>
            </motion.div>
            <motion.div
                variants={second}
                className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <Image
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Therapy"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Physical Therapy Plans
                </p>
                <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Rehab
                </p>
            </motion.div>
        </motion.div>
    );
};

const SkeletonFive = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
            >
                <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="orthopedic surgeon"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="text-xs text-neutral-500">
                    Our orthopedic specialists provide comprehensive care for bone, joint, and muscle conditions,
                    from sports injuries to joint replacements and spinal disorders.
                </p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <p className="text-xs text-neutral-500">Same-Day Injury Appointments Available</p>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 shrink-0" />
            </motion.div>
        </motion.div>
    );
};

const items = [
    {
        title: "Orthopedic Assessment",
        description: (
            <span className="text-sm">
                Comprehensive evaluation of musculoskeletal conditions and injuries.
            </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <IconBone className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Diagnostic Imaging",
        description: (
            <span className="text-sm">
                Advanced diagnostics including X-rays, MRI, and ultrasound.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <Activity className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Pain Management",
        description: (
            <span className="text-sm">
                Personalized treatment plans for acute and chronic pain relief.
            </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <IconMassage className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Treatment Options",
        description: (
            <span className="text-sm">
                Explore surgical and non-surgical orthopedic treatments.
            </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <IconMedicineSyrup className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Rehabilitation",
        description: (
            <span className="text-sm">
                Physical therapy programs to restore mobility and strength.
            </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <IconPhysotherapist className="h-4 w-4 text-neutral-500" />,
    },
];