"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { BentoGridDemo } from "@/components/DoctorBentoComponent";

export default function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Empowering Health, Transforming Lives.
            </h2>
            <Carousel items={cards} />
            <BentoGridDemo />
        </div>
    );
}

const DummyContent = ({ image }: { image: string }) => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                Your Health, Our Priority.
                            </span>{" "}
                            Stay informed with the latest advancements in healthcare, wellness
                            tips, and expert medical insights. Whether it’s preventive care,
                            managing chronic conditions, or understanding new treatments, we’re
                            here to guide you towards a healthier life.
                        </p>
                        <Image
                            src={image}
                            alt="Healthcare professionals discussing medical reports"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Health & Wellness",
        title: "Tips for a healthier lifestyle.",
        src: "https://images.unsplash.com/photo-1583912261172-9f4c6d9f2c16?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent image="https://images.unsplash.com/photo-1583912261172-9f4c6d9f2c16?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
    },
    {
        category: "Medical Research",
        title: "Latest advancements in cancer treatment.",
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent image="https://images.unsplash.com/photo-1583912261172-9f4c6d9f2c16?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
    },
    {
        category: "Surgery",
        title: "Breakthroughs in robotic-assisted surgeries.",
        src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent image="https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
    },
    {
        category: "Mental Health",
        title: "Managing stress and anxiety effectively.",
        src: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent image="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
    },
    {
        category: "Pediatrics",
        title: "Essential vaccinations for newborns.",
        src: "https://images.unsplash.com/photo-1595436065982-84fa400d8d8e?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent image="https://images.unsplash.com/photo-1595436065982-84fa400d8d8e?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
    },
    {
        category: "Career",
        title: "Hiring experienced medical professionals.",
        src: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent image="https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />,
    },
];

