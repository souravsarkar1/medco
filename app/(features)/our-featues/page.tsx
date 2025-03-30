import { cn } from "@/lib/utils";
import {
    IconHeartbeat,
    IconUserHeart,
    IconStethoscope,
    IconAmbulance,
    IconShieldCheck,
    IconReportMedical,
    IconFirstAidKit,
    IconHospital,
} from "@tabler/icons-react";

export default function MedicalFeaturesSection() {
    const features = [
        {
            title: "Advanced Medical Technology",
            description: "We use cutting-edge medical technology for precise diagnosis and treatment.",
            icon: <IconStethoscope />,
        },
        {
            title: "Expert Doctors",
            description: "Our team consists of highly qualified and experienced medical professionals.",
            icon: <IconUserHeart />,
        },
        {
            title: "24/7 Emergency Services",
            description: "Round-the-clock emergency services with quick response time.",
            icon: <IconAmbulance />,
        },
        {
            title: "Comprehensive Health Check-ups",
            description: "Full-body check-ups and preventive screenings for a healthier future.",
            icon: <IconReportMedical />,
        },
        {
            title: "Personalized Treatment Plans",
            description: "Tailored treatment plans to meet individual health needs.",
            icon: <IconHeartbeat />,
        },
        {
            title: "Health Insurance Assistance",
            description: "Seamless insurance claim support and medical financing options.",
            icon: <IconShieldCheck />,
        },
        {
            title: "State-of-the-Art Facilities",
            description: "Modern hospitals with world-class medical infrastructure.",
            icon: <IconHospital />,
        },
        {
            title: "Comprehensive Pharmacy Services",
            description: "Access to a fully stocked pharmacy for all medical needs.",
            icon: <IconFirstAidKit />,
        },
    ];
    return (
        <div className="mt-25">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4 text-center">Medical Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
