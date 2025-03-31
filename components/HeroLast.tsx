"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export function HeroParallaxDemo() {
    return (
        <div className="w-4xl mx-auto mt-20">
            <HeroParallax products={products} />
        </div>
    )
}
export const products = [
    {
        title: "MedCo Telehealth",
        link: "https://medco.com/telehealth",
        thumbnail:
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Electronic Health Records",
        link: "https://medco.com/ehr",
        thumbnail:
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "MedCo Pharmacy",
        link: "https://medco.com/pharmacy",
        thumbnail:
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "AI Diagnostics",
        link: "https://medco.com/ai-diagnostics",
        thumbnail:
            "https://images.unsplash.com/photo-1579165466741-6c067db3d0a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Patient Portal",
        link: "https://medco.com/portal",
        thumbnail:
            "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Medical Research",
        link: "https://medco.com/research",
        thumbnail:
            "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Health Analytics",
        link: "https://medco.com/analytics",
        thumbnail:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    // {
    //     title: "MedCo Mobile App",
    //     link: "https://medco.com/mobile",
    //     thumbnail:
    //         "https://images.unsplash.com/photo-1581093450021-4a7360e9a7c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    // },
    {
        title: "Clinical Trials",
        link: "https://medco.com/trials",
        thumbnail:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Virtual Consultations",
        link: "https://medco.com/consultations",
        thumbnail:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "MedCo Wearables",
        link: "https://medco.com/wearables",
        thumbnail:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Health Insurance",
        link: "https://medco.com/insurance",
        thumbnail:
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    // {
    //     title: "MedCo Labs",
    //     link: "https://medco.com/labs",
    //     thumbnail:
    //         "https://images.unsplash.com/photo-1576110397660-50d6deb6a4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    // },

    {
        title: "Mental Health",
        link: "https://medco.com/mental-health",
        thumbnail:
            "https://images.unsplash.com/photo-1593814681464-eef5af2b0628?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "MedCo Community",
        link: "https://medco.com/community",
        thumbnail:
            "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
];