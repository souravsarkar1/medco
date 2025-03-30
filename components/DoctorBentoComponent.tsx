import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
    IconHeartbeat,
    IconStethoscope,
    IconPill,
    IconFirstAidKit,
    IconMicroscope,
    IconHospital,
    IconUserHeart,
} from "@tabler/icons-react";
import Image from "next/image";

export function BentoGridDemo() {
    return (
        <BentoGrid className="max-full mx-auto">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}

const Skeleton = ({ image }: { image: string }) => (
    <div id="our-service-department" className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <Image
            src={image}
            alt="placeholder"
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-xl"
            loader={({ src }) => src}
        />
    </div>
);

const items = [
    {
        title: "Advanced Cardiology",
        description: "Explore the latest innovations in heart care and treatment.",
        header: <Skeleton image="https://plus.unsplash.com/premium_photo-1718349374495-b1d09644f973?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
        icon: <IconHeartbeat className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Comprehensive Diagnostics",
        description: "Cutting-edge technology for accurate and early diagnosis.",
        header: <Skeleton image="https://images.unsplash.com/photo-1576671414121-aa0c81c869e1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
        icon: <IconMicroscope className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Pharmaceutical Innovations",
        description: "Breakthrough medications for better health outcomes.",
        header: <Skeleton image="https://images.unsplash.com/photo-1512069843211-ff3b764416be?q=80&w=1554&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
        icon: <IconPill className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Emergency Care",
        description: "Providing rapid and efficient treatment in critical situations.",
        header: <Skeleton image="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
        icon: <IconFirstAidKit className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Holistic Patient Care",
        description: "Ensuring comprehensive wellness through personalized treatments.",
        header: <Skeleton image="https://plus.unsplash.com/premium_photo-1664478271539-104f41cd103e?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
        icon: <IconUserHeart className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Hospital Facilities",
        description: "State-of-the-art infrastructure for superior medical care.",
        header: <Skeleton image="https://images.unsplash.com/photo-1597764690523-15bea4c581c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
        icon: <IconHospital className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Expert Consultations",
        description: "Connect with leading specialists for medical advice and care.",
        header: <Skeleton image="https://plus.unsplash.com/premium_photo-1661770160867-2c3a5092ec3b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
        icon: <IconStethoscope className="h-4 w-4 text-neutral-500" />,
    },
];

