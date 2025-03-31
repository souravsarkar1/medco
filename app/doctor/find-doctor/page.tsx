'use client'

import { useState } from "react";


const FindDoctorPage = () => {
    const [doctors, setDoctors] = useState([]);
    return (
        <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
                Find Doctor
            </h1>
        </div>
    );
};

export default FindDoctorPage;