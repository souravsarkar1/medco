import { connectDB } from "@/lib/mongodb";
import { DoctorModel } from "@/app/models/allModels";
import { NextResponse } from "next/server";

interface TimeSlot {
    startTime: string;
    endTime: string;
    isBooked: boolean;
    _id: string;
}

interface DaySlot {
    day: string;
    slots: TimeSlot[];
    _id: string;
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const doctor: any = await DoctorModel.findById(params.id)
            .select('-personalInfo.password')
            .lean();

        if (!doctor) {
            return NextResponse.json(
                { error: "Doctor not found" },
                { status: 404 }
            );
        }

        const transformTimeSlots = (timeSlots: DaySlot[]) => {
            return timeSlots.map(daySlot => ({
                ...daySlot,
                slots: daySlot.slots.map((slot: any) => {
                    if (typeof slot === 'object' && '0' in slot) {
                        const timeString = Array.from(Array(11).keys())
                            .map(i => slot[i.toString()])
                            .join('');
                        const [startTime, endTime] = timeString.split('-');

                        return {
                            startTime,
                            endTime,
                            isBooked: slot.isBooked,
                            _id: slot._id
                        };
                    }

                    return slot;
                })
            }));
        };

        if (doctor.consultationInfo?.consultationType) {
            const { online, inPerson } = doctor.consultationInfo.consultationType;

            if (online?.timeSlots) {
                doctor.consultationInfo.consultationType.online.timeSlots =
                    transformTimeSlots(online.timeSlots);
            }

            if (inPerson?.timeSlots) {
                doctor.consultationInfo.consultationType.inPerson.timeSlots =
                    transformTimeSlots(inPerson.timeSlots);
            }
        }

        return NextResponse.json({ doctor }, { status: 200 });
    } catch (error) {
        console.error("Error fetching doctor:", error);
        return NextResponse.json(
            { error: "Failed to fetch doctor details" },
            { status: 500 }
        );
    }
}
