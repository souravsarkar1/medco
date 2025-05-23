'use client';

import { AuthMiddleware } from '@/components/AuthMiddleware';
import { useAppSelector } from '@/lib/redux/hooks';
import axiosInstance from '@/lib/axios';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { format, isWeekend, getDay } from "date-fns";

interface TimeSlot {
    startTime: string;
    endTime: string;
    isBooked: boolean;
}

interface DaySlot {
    day: string;
    slots: string[];
}

interface Doctor {
    _id: string;
    personalInfo: {
        firstName: string;
        lastName: string;
        profileImage?: string;
    };
    professionalDetails: {
        specializations: string[];
    };
    consultationInfo: {
        consultationType: {
            online: {
                isAvailable: boolean;
                consultationFee: number;
                timeSlots: DaySlot[];
            };
            inPerson: {
                isAvailable: boolean;
                consultationFee: number;
                timeSlots: DaySlot[];
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
    const router = useRouter();
    const params = useParams();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [bookingData, setBookingData] = useState({
        appointmentType: 'Online',
        consultationType: 'Video',
        selectedSlot: '',
    });

    const getDayName = (date: Date): string => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[getDay(date)];
    };

    const isDateDisabled = (date: Date) => {
        if (date < new Date()) return true;
        if (!doctor) return true;  // Add this check

        const dayName = getDayName(date);
        const consultationType = bookingData.appointmentType === 'Online'
            ? doctor.consultationInfo.consultationType.online
            : doctor.consultationInfo.consultationType.inPerson;

        // Add null check before accessing timeSlots
        if (!consultationType?.timeSlots) return true;

        const hasSlots = consultationType.timeSlots.some(slot => slot.day === dayName);
        return !hasSlots;
    };

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axiosInstance.get(`/api/doctors/${params.id}`);
                setDoctor(response.data.doctor);
            } catch (error) {
                console.error("Error fetching doctor:", error);
                toast.error("Failed to fetch doctor details");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [params.id]);

    useEffect(() => {
        if (doctor && selectedDate) {
            try {
                const consultationType = bookingData.appointmentType === 'Online'
                    ? doctor.consultationInfo.consultationType.online
                    : doctor.consultationInfo.consultationType.inPerson;

                const dayName = getDayName(selectedDate);
                const daySlot = consultationType.timeSlots.find(slot => slot.day === dayName);

                // Debug logging
                console.log('Day slot found:', daySlot);

                if (daySlot?.slots) {
                    const fetchBookedSlots = async () => {
                        try {
                            const formattedDate = selectedDate.toISOString().split('T')[0];
                            console.log('Fetching booked slots for:', {
                                doctorId: doctor._id,
                                date: formattedDate,
                                appointmentType: bookingData.appointmentType
                            });

                            const response = await axiosInstance.get('/api/appointments/booked-slots', {
                                params: {
                                    doctorId: doctor._id,
                                    date: formattedDate,
                                    appointmentType: bookingData.appointmentType
                                }
                            });

                            const bookedSlots = response.data.bookedSlots;
                            console.log('Booked slots:', bookedSlots);

                            // Convert slots to TimeSlot objects
                            const timeSlots: TimeSlot[] = daySlot.slots
                                .filter((slot: any) => {
                                    if (typeof slot === 'string') {
                                        const [startTime, endTime] = slot.split('-');
                                        const isBooked = bookedSlots.some(
                                            (bookedSlot: any) =>
                                                bookedSlot.startTime === startTime &&
                                                bookedSlot.endTime === endTime
                                        );
                                        return !isBooked;
                                    }
                                    return !slot.isBooked;
                                })
                                .map(slot => {
                                    if (typeof slot === 'string') {
                                        const [startTime, endTime] = slot.split('-');
                                        return {
                                            startTime,
                                            endTime,
                                            isBooked: false
                                        };
                                    }
                                    return slot;
                                });

                            console.log('Available time slots:', timeSlots);
                            setAvailableSlots(timeSlots);
                        } catch (error) {
                            console.error('Error fetching booked slots:', error);
                            setAvailableSlots([]);
                        }
                    };

                    fetchBookedSlots();
                } else {
                    setAvailableSlots([]);
                }
            } catch (error) {
                console.error('Error processing time slots:', error);
                setAvailableSlots([]);
            }
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDate, bookingData.appointmentType, doctor]);

    // Add this debug effect
    useEffect(() => {
        console.log('Available slots updated:', availableSlots);
    }, [availableSlots]);

    const getAvailableConsultationTypes = () => {
        if (!doctor?.consultationInfo?.consultationModes) return [];

        const types = [];
        const { consultationModes } = doctor.consultationInfo;

        if (consultationModes?.video) types.push("Video");
        if (consultationModes?.audio) types.push("Audio");
        if (consultationModes?.chat) types.push("Chat");

        return types;
    };

    const getAvailableAppointmentTypes = () => {
        if (!doctor?.consultationInfo?.consultationType) return [];

        const types = [];
        const { consultationType } = doctor.consultationInfo;

        if (consultationType?.online?.isAvailable) types.push("Online");
        if (consultationType?.inPerson?.isAvailable) types.push("InPerson");

        return types;
    };

    const handleBooking = async () => {
        try {
            if (!selectedDate || !bookingData.selectedSlot) {
                toast.error("Please select a date and time slot");
                return;
            }

            if (!isAuthenticated) {
                toast.error("Please login to book an appointment");
                router.push('/login');
                return;
            }

            setLoading(true);

            const [startTime, endTime] = bookingData.selectedSlot.split('-');
            const consultationFee = bookingData.appointmentType === 'Online'
                ? doctor?.consultationInfo.consultationType.online.consultationFee
                : doctor?.consultationInfo.consultationType.inPerson?.consultationFee;

            // Format date to YYYY-MM-DD
            const formattedDate = selectedDate.toISOString().split('T')[0];

            const response = await axiosInstance.post('/api/appointments/create', {
                doctorId: params.id,
                appointmentType: bookingData.appointmentType,
                consultationType: bookingData.consultationType,
                timeSlot: {
                    date: formattedDate,
                    startTime,
                    endTime
                },
                consultationFee
            });

            toast.success("Appointment booked successfully!");
            router.push('/appointments');
        } catch (error: any) {
            console.error("Booking error:", error);

            if (error.response?.status === 401) {
                toast.error("Your session has expired. Please login again.");
                router.push('/login');
                return;
            }

            toast.error(error.response?.data?.error || "Failed to book appointment");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-muted-foreground">Doctor not found</p>
            </div>
        );
    }

    return (
        <AuthMiddleware>
            <div className="container mx-auto px-4 py-8 mt-10">
                <Card className="max-w-2xl mx-auto shadow-lg">
                    <CardHeader className="border-b">
                        <CardTitle className="text-2xl font-bold text-primary">Book Appointment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold text-foreground">
                                Dr. {doctor.personalInfo.firstName} {doctor.personalInfo.lastName}
                            </h2>
                            <p className="text-muted-foreground">
                                {doctor.professionalDetails.specializations?.join(", ")}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Appointment Type
                                </label>
                                <Select
                                    value={bookingData.appointmentType}
                                    onValueChange={(value) => {
                                        setBookingData({
                                            ...bookingData,
                                            appointmentType: value,
                                            consultationType: value === 'Online' ? 'Video' : 'Physical',
                                            selectedSlot: ''
                                        });
                                        setSelectedDate(null);
                                        setAvailableSlots([]);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
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

                            {bookingData.appointmentType === 'Online' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Consultation Type
                                    </label>
                                    <Select
                                        value={bookingData.consultationType}
                                        onValueChange={(value) => setBookingData({
                                            ...bookingData,
                                            consultationType: value
                                        })}
                                    >
                                        <SelectTrigger className="w-full">
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
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Select Date
                                </label>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate as any}
                                    onSelect={setSelectedDate as any}
                                    className="rounded-md border"
                                    disabled={isDateDisabled}
                                />
                            </div>

                            {selectedDate && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Select Time Slot
                                    </label>
                                    {availableSlots.length > 0 ? (
                                        <Select
                                            value={bookingData.selectedSlot}
                                            onValueChange={(value) => setBookingData(prev => ({
                                                ...prev,
                                                selectedSlot: value
                                            }))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select time slot" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableSlots.map((slot) => (
                                                    <SelectItem
                                                        key={`${slot.startTime}-${slot.endTime}`}
                                                        value={`${slot.startTime}-${slot.endTime}`}
                                                    >
                                                        {`${slot.startTime} - ${slot.endTime}`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No time slots available for this date
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="rounded-lg bg-muted p-4">
                                <p className="font-medium text-foreground">Consultation Fee:</p>
                                <p className="text-2xl font-bold text-primary mt-1">
                                    ₹{bookingData.appointmentType === 'Online'
                                        ? doctor.consultationInfo.consultationType.online.consultationFee
                                        : doctor.consultationInfo.consultationType.inPerson?.consultationFee
                                    }
                                </p>
                            </div>

                            <Button
                                onClick={handleBooking}
                                className="w-full text-base font-semibold"
                                disabled={loading || !selectedDate || !bookingData.selectedSlot}
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Confirm Booking"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthMiddleware>
    );
};

export default BookDoctorPage;
