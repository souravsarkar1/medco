'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";


interface Doctor {
    _id: string;
    personalInfo: {
        firstName: string;
        lastName: string;
        profileImage?: string;
    };
    professionalDetails: {
        specializations: string[];
        yearsOfExperience: number;
    };
    consultationInfo: {
        consultationType: {
            online: {
                consultationFee: number;
            };
        };
    };
    ratings: {
        averageRating: number;
        totalReviews: number;
    };
}

const FindDoctorPage = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [specialization, setSpecialization] = useState("");

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            setDoctors([]); // Clear existing results

            const response = await axios.get('/api/doctors/search', {
                params: {
                    name: searchTerm.trim(),
                    specialization: specialization.trim()
                }
            });

            if (response.data.doctors) {
                setDoctors(response.data.doctors);
            } else {
                setDoctors([]);
            }

        } catch (error) {
            // More robust error handling
            let errorMessage = "Failed to fetch doctors. Please try again.";

            if (axios.isAxiosError(error)) {
                console.error("Doctor search error details:", {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });

                // Use the server error message if available
                errorMessage = error.response?.data?.error || errorMessage;
            } else {
                console.error("Doctor search error:", error);
            }

            toast.error(errorMessage);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 mt-25">
            <div className="mb-8">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    Find Your Doctor
                </h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <Input
                        placeholder="Search by doctor name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <Input
                        placeholder="Specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={fetchDoctors}>
                        {loading ? <Loader2 className="animate-spin" /> : "Search"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <Card key={doctor._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {doctor?.personalInfo?.profileImage && (
                                    <img
                                        src={doctor.personalInfo.profileImage}
                                        alt={`${doctor?.personalInfo?.firstName || ''} ${doctor?.personalInfo?.lastName || ''}`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                )}
                                <div>
                                    <h3 className="text-xl">
                                        Dr. {doctor?.personalInfo?.firstName || 'N/A'} {doctor?.personalInfo?.lastName || ''}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {doctor?.professionalDetails?.specializations?.join(", ") || 'No specialization listed'}
                                    </p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p>Experience: {doctor?.professionalDetails?.yearsOfExperience || 0} years</p>
                                <p>Consultation Fee: ₹{doctor?.consultationInfo?.consultationType?.online?.consultationFee || 'N/A'}</p>
                                <p>
                                    Rating: {doctor?.ratings?.averageRating?.toFixed(1) || '0.0'} ⭐ ({doctor?.ratings?.totalReviews || 0} reviews)
                                </p>
                                <Link
                                    href={`/doctor/book/${doctor._id}`}
                                    className="block w-full"
                                >
                                    <Button className="w-full mt-4">
                                        Book Appointment
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {doctors.length === 0 && !loading && (
                <div className="text-center py-10">
                    <p className="text-gray-500">No doctors found. Try adjusting your search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default FindDoctorPage;
