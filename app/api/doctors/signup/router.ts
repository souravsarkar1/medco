import { connectDB } from "@/lib/mongodb";
import { DoctorModel } from "@/app/models/allModels";
import { NextResponse } from "next/server";




export async function POST(req: Request) {
    try {
        await connectDB();

        const { firstName, lastName, email, password } = await req.json();

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if doctor with same email exists
        const existingDoctor = await DoctorModel.findOne({ "personalInfo.email": email });

        if (existingDoctor) {
            return NextResponse.json({ error: "Doctor already exists" }, { status: 400 });
        }

        // Create new doctor
        const newDoctor = new DoctorModel({
            personalInfo: {
                firstName,
                lastName,
                email,
            },
            password // Assuming password is stored securely (hashed)
        });

        await newDoctor.save();

        return NextResponse.json({ message: "Doctor registered successfully", doctor: newDoctor }, { status: 201 });
    } catch (error) {
        console.error("Error registering doctor:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
