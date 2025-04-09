import { connectDB } from "@/lib/mongodb";
import { AppointmentModel } from "@/app/models/allModels";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your-secret-key'
        ) as { userId: string };

        await connectDB();

        const { doctorId, appointmentType, consultationType } = await req.json();

        const appointment = new AppointmentModel({
            patientId: decoded.userId,
            doctorId,
            appointmentType,
            consultationType,
            scheduledDateTime: new Date(), // You might want to add date/time selection
            status: 'Scheduled',
            consultationFee: 500, // You might want to get this from doctor's profile
        });

        await appointment.save();

        return NextResponse.json(
            { message: "Appointment created successfully", appointment },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json(
            { error: "Failed to create appointment" },
            { status: 500 }
        );
    }
}