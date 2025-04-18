import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AppointmentModel } from "@/app/models/allModels";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const doctorId = searchParams.get('doctorId');
        const date = searchParams.get('date');
        const appointmentType = searchParams.get('appointmentType');

        if (!doctorId || !date || !appointmentType) {
            return NextResponse.json(
                { error: "Missing required parameters" },
                { status: 400 }
            );
        }

        await connectDB();

        // Find all booked appointments for the specified date and doctor
        const bookedAppointments = await AppointmentModel.find({
            doctorId,
            'timeSlot.date': new Date(date),
            appointmentType,
            status: { $ne: 'Cancelled' } // Exclude cancelled appointments
        }).select('timeSlot.startTime timeSlot.endTime');

        // Extract time slots from appointments
        const bookedSlots = bookedAppointments.map(appointment => ({
            startTime: appointment.timeSlot.startTime,
            endTime: appointment.timeSlot.endTime
        }));

        return NextResponse.json({ bookedSlots });
    } catch (error: any) {
        console.error("Error fetching booked slots:", error);
        return NextResponse.json(
            { error: "Failed to fetch booked slots" },
            { status: 500 }
        );
    }
}