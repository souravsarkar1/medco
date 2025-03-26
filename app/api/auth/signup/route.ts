
import { connectDB } from "@/lib/mongodb";
import { PatientModel } from "@/app/models/allModels";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, password } = await req.json();

        // Validate inputs
        if (!firstName || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectDB();

        const existingUser = await PatientModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new PatientModel({ personalInfo: { firstName, lastName, email, password: hashedPassword } });
        await newUser.save();

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        );
    }
}
