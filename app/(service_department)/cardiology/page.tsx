"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconHeartbeat,
    IconStethoscope,
    IconPill,
    IconReportMedical,
    IconChartLine,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function BentoGridThirdDemo() {
    return (
        <div className="mt-25">
            <div className="mb-10 flex items-center justify-center">
                <h1 className="text-2xl font-bold">Our Cardiology Features</h1>
            </div>
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
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">❤️</span>
                </div>
                <div className="w-full bg-gray-100 h-6 rounded-full dark:bg-neutral-900 relative overflow-hidden">
                    <span className="absolute left-2 text-[0.8rem] text-gray-500 whitespace-nowrap">
                        ECG Reading: 72 BPM
                    </span>
                </div>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <div className="w-full bg-gray-100 h-6 rounded-full dark:bg-neutral-900 relative overflow-hidden">
                    <span className="absolute right-2 text-[0.8rem] text-gray-500 whitespace-nowrap">
                        BP: 120/80 mmHg
                    </span>
                </div>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">❤️</span>
                </div>
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">❤️</span>
                </div>
                <div className="w-full bg-gray-100 h-6 rounded-full dark:bg-neutral-900 relative overflow-hidden">
                    <span className="absolute left-2 text-[0.8rem] text-gray-500 whitespace-nowrap">
                        Cholesterol: 180 mg/dL
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

    // Medical test data with labels and values
    const medicalTests = [
        { label: "Ejection Fraction", value: "65%" },
        { label: "Troponin Level", value: "0.01 ng/mL" },
        { label: "BNP", value: "150 pg/mL" },
        { label: "CRP", value: "2.1 mg/L" },
        { label: "LDL Cholesterol", value: "100 mg/dL" },
        { label: "HDL Cholesterol", value: "55 mg/dL" }
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-2"
        >
            {medicalTests.map((test, i) => (
                <motion.div
                    key={"medical-test-" + i}
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
                        <span className="text-xs font-semibold text-red-500 dark:text-red-400">
                            {test.value}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" />
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
            style={{ border: "1px solid #e5e7eb", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1732628348854-56a54f1da2ad?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
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
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="ECG"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Basic ECG Interpretation
                </p>
                <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Essential
                </p>
            </motion.div>
            <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                <Image
                    src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Heart"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Cardiac Anatomy Review
                </p>
                <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Fundamental
                </p>
            </motion.div>
            <motion.div
                variants={second}
                className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <Image
                    src="https://images.unsplash.com/photo-1551601651-bc60f254d532?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Medication"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Cardiac Medications Guide
                </p>
                <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Important
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
                    src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="doctor"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="text-xs text-neutral-500">
                    Our cardiology department offers comprehensive care for all heart conditions,
                    from preventive screenings to advanced surgical interventions.
                </p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <p className="text-xs text-neutral-500">24/7 Cardiac Emergency Services</p>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shrink-0" />
            </motion.div>
        </motion.div>
    );
};
const items = [
    {
        title: "Heart Health Screening",
        description: (
            <span className="text-sm">
                Comprehensive cardiovascular risk assessment and early detection.
            </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <IconHeartbeat className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Cardiac Diagnostics",
        description: (
            <span className="text-sm">
                Advanced diagnostic tests including ECG, Echo, and Stress Tests.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <IconStethoscope className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Preventive Cardiology",
        description: (
            <span className="text-sm">
                Personalized plans to reduce your risk of heart disease.
            </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <IconPill className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Cardiac Treatment Options",
        description: (
            <span className="text-sm">
                Explore medical, interventional, and surgical treatments.
            </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <IconReportMedical className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Recovery & Rehabilitation",
        description: (
            <span className="text-sm">
                Cardiac rehab programs to restore heart health after treatment.
            </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <IconChartLine className="h-4 w-4 text-neutral-500" />,
    },
];