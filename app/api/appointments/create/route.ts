import { connectDB } from "@/lib/mongodb";
import { AppointmentModel, DoctorModel } from "@/app/models/allModels";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

        const {
            doctorId,
            appointmentType,
            consultationType,
            timeSlot,
            consultationFee
        } = await req.json();

        // Validate required fields
        if (!doctorId || !appointmentType || !consultationType || !timeSlot) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Start a MongoDB session for transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Check if the doctor exists
            const doctor = await DoctorModel.findById(doctorId).session(session);
            if (!doctor) {
                await session.abortTransaction();
                return NextResponse.json(
                    { error: "Doctor not found" },
                    { status: 404 }
                );
            }

            // Check if the time slot is available
            const slotPath = appointmentType === 'Online'
                ? 'consultationInfo.consultationType.online.timeSlots'
                : 'consultationInfo.consultationType.inPerson.timeSlots';

            const dateStr = new Date(timeSlot.date).toISOString().split('T')[0];

            // Find the specific time slot
            const existingSlot = await DoctorModel.findOne({
                _id: doctorId,
                [`${slotPath}.date`]: new Date(dateStr),
                [`${slotPath}.slots`]: {
                    $elemMatch: {
                        startTime: timeSlot.startTime,
                        endTime: timeSlot.endTime,
                        isBooked: false
                    }
                }
            }).session(session);

            if (!existingSlot) {
                await session.abortTransaction();
                return NextResponse.json(
                    { error: "Time slot is not available" },
                    { status: 400 }
                );
            }

            // Create the appointment
            const appointment = new AppointmentModel({
                patientId: decoded.userId,
                doctorId,
                appointmentType,
                consultationType,
                timeSlot: {
                    date: new Date(dateStr),
                    startTime: timeSlot.startTime,
                    endTime: timeSlot.endTime
                },
                status: 'Scheduled',
                consultationFee,
                createdAt: new Date()
            });

            await appointment.save({ session });

            // Update the slot as booked
            await DoctorModel.updateOne(
                {
                    _id: doctorId,
                    [`${slotPath}.date`]: new Date(dateStr),
                    [`${slotPath}.slots.startTime`]: timeSlot.startTime
                },
                {
                    $set: {
                        [`${slotPath}.$[date].slots.$[slot].isBooked`]: true
                    }
                },
                {
                    arrayFilters: [
                        { "date.date": new Date(dateStr) },
                        { "slot.startTime": timeSlot.startTime }
                    ],
                    session
                }
            );

            await session.commitTransaction();

            return NextResponse.json(
                {
                    message: "Appointment created successfully",
                    appointment
                },
                { status: 201 }
            );
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json(
            { error: "Failed to create appointment" },
            { status: 500 }
        );
    }
}
