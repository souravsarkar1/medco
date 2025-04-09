'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
                isAvailable: boolean;
                consultationFee: number;
            };
            inPerson?: {
                isAvailable: boolean;
                consultationFee: number;
            };
        };
        consultationModes: {
            video: boolean;
            audio: boolean;
            chat: boolean;
        };
    };
}

const BookDoctorPage = () => {
    const params = useParams();
    const router = useRouter();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        appointmentType: 'Online',
        consultationType: 'Video',
        selectedSlot: '',
    });

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`/api/doctors/${params.id}`);
                setDoctor(response.data.doctor);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
                toast.error("Failed to fetch doctor details");
                router.push('/doctor/find-doctor'); // Redirect back to search page on error
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [params.id, router]);

    const getAvailableConsultationTypes = () => {
        if (!doctor) return [];

        const types = [];
        const { consultationModes } = doctor.consultationInfo;

        if (consultationModes.video) types.push("Video");
        if (consultationModes.audio) types.push("Audio");
        if (consultationModes.chat) types.push("Chat");

        return types;
    };

    const getAvailableAppointmentTypes = () => {
        if (!doctor) return [];

        const types = [];
        const { consultationType } = doctor.consultationInfo;

        if (consultationType.online?.isAvailable) types.push("Online");
        if (consultationType.inPerson?.isAvailable) types.push("InPerson");

        return types;
    };

    const handleBooking = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error("Please login to book an appointment");
                router.push('/login');
                return;
            }

            const consultationFee = bookingData.appointmentType === 'Online'
                ? doctor?.consultationInfo.consultationType.online.consultationFee
                : doctor?.consultationInfo.consultationType.inPerson?.consultationFee;

            const response = await axios.post('/api/appointments/create', {
                doctorId: params.id,
                ...bookingData,
                consultationFee
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Appointment booked successfully!");
            router.push('/appointments');
        } catch (error) {
            console.error("Booking error:", error);
            toast.error("Failed to book appointment");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Doctor not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Book Appointment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">
                            Dr. {doctor.personalInfo.firstName} {doctor.personalInfo.lastName}
                        </h2>
                        <p className="text-gray-500">
                            {doctor.professionalDetails.specializations.join(", ")}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2">Appointment Type</label>
                            <Select
                                value={bookingData.appointmentType}
                                onValueChange={(value) => setBookingData({
                                    ...bookingData,
                                    appointmentType: value
                                })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select appointment type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getAvailableAppointmentTypes().map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type === 'InPerson' ? 'In Person' : type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block mb-2">Consultation Type</label>
                            <Select
                                value={bookingData.consultationType}
                                onValueChange={(value) => setBookingData({
                                    ...bookingData,
                                    consultationType: value
                                })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select consultation type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getAvailableConsultationTypes().map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="font-semibold">Consultation Fee:</p>
                            <p className="text-lg">
                                ₹{bookingData.appointmentType === 'Online'
                                    ? doctor.consultationInfo.consultationType.online.consultationFee
                                    : doctor.consultationInfo.consultationType.inPerson?.consultationFee || 'N/A'
                                }
                            </p>
                        </div>

                        <Button
                            onClick={handleBooking}
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Confirm Booking"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookDoctorPage;
