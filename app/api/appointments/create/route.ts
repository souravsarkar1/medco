import { connectDB } from "@/lib/mongodb";
import { AppointmentModel, DoctorModel } from "@/app/models/allModels";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');

        // Extract only the token without 'Bearer ' prefix
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized", code: "NO_TOKEN" },
                { status: 401 }
            );
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'your-secret-key'
            ) as { userId: string };

            await connectDB();
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
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

                // Format the date string correctly (strip time part)
                const dateStr = new Date(timeSlot.date).toISOString().split('T')[0];

                // Get day name in correct timezone
                const dayName = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });

                // Debug
                console.log('Processing appointment for:', {
                    date: dateStr,
                    dayName,
                    startTime: timeSlot.startTime,
                    endTime: timeSlot.endTime
                });

                const slotPath = appointmentType === 'Online'
                    ? 'consultationInfo.consultationType.online.timeSlots'
                    : 'consultationInfo.consultationType.inPerson.timeSlots';

                // First check if the doctor exists and has the time slot
                const doctor = await DoctorModel.findOne({
                    _id: doctorId,
                    [`${slotPath}`]: {
                        $elemMatch: {
                            day: dayName
                        }
                    }
                }).session(session);

                if (!doctor) {
                    await session.abortTransaction();
                    return NextResponse.json(
                        { error: "Doctor not found or doesn't have slots for this day" },
                        { status: 400 }
                    );
                }

                // Get the specific day's slots
                const daySlots = appointmentType === 'Online'
                    ? doctor.consultationInfo.consultationType.online.timeSlots
                    : doctor.consultationInfo.consultationType.inPerson.timeSlots;

                const specificDay = daySlots.find((slot: any) => slot.day === dayName);

                // Debug
                console.log('Found day slots:', specificDay);

                if (!specificDay || !specificDay.slots.some((slot: any) => {
                    if (typeof slot === 'string') {
                        const [start, end] = slot.split('-');
                        return start === timeSlot.startTime && end === timeSlot.endTime;
                    }
                    return slot.startTime === timeSlot.startTime &&
                        slot.endTime === timeSlot.endTime &&
                        !slot.isBooked;
                })) {
                    await session.abortTransaction();
                    return NextResponse.json(
                        { error: "Time slot not found in doctor's schedule" },
                        { status: 400 }
                    );
                }

                // Check for existing appointments
                const existingAppointment = await AppointmentModel.findOne({
                    doctorId,
                    'timeSlot.date': new Date(dateStr),
                    'timeSlot.startTime': timeSlot.startTime,
                    'timeSlot.endTime': timeSlot.endTime,
                    status: { $ne: 'Cancelled' }
                }).session(session);

                if (existingAppointment) {
                    await session.abortTransaction();
                    return NextResponse.json(
                        { error: "Time slot is already booked" },
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

                // Update the doctor's slot as booked
                if (typeof specificDay.slots[0] === 'object') {
                    await DoctorModel.updateOne(
                        {
                            _id: doctorId,
                            [`${slotPath}.day`]: dayName,
                            [`${slotPath}.slots`]: {
                                $elemMatch: {
                                    startTime: timeSlot.startTime,
                                    endTime: timeSlot.endTime
                                }
                            }
                        },
                        {
                            $set: {
                                [`${slotPath}.$[outer].slots.$[inner].isBooked`]: true
                            }
                        },
                        {
                            arrayFilters: [
                                { "outer.day": dayName },
                                {
                                    "inner.startTime": timeSlot.startTime,
                                    "inner.endTime": timeSlot.endTime
                                }
                            ],
                            session
                        }
                    );
                }

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
        } catch (tokenError) {
            if (tokenError instanceof jwt.TokenExpiredError) {
                return NextResponse.json(
                    {
                        error: "Your session has expired. Please login again.",
                        code: "TOKEN_EXPIRED"
                    },
                    { status: 401 }
                );
            }
            if (tokenError instanceof jwt.JsonWebTokenError) {
                return NextResponse.json(
                    {
                        error: "Invalid authentication token",
                        code: "INVALID_TOKEN"
                    },
                    { status: 401 }
                );
            }
            throw tokenError;
        }
    } catch (error: any) {
        console.error("Error creating appointment:", error);
        return NextResponse.json(
            { error: "Failed to create appointment" },
            { status: 500 }
        );
    }
}
