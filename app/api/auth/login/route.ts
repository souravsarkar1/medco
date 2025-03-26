import { connectDB } from "@/lib/mongodb";
import { PatientModel } from "@/app/models/allModels";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Validate inputs
        if (!email || !password) {
            return NextResponse.json(
                { error: "Missing email or password" },
                { status: 400 }
            );
        }

        await connectDB();

        // Find user by email
        const user = await PatientModel.findOne({ 'personalInfo.email': email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        if (!user.personalInfo || !user.personalInfo.password) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.personalInfo.password
        );

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Prepare response with user details (excluding sensitive information)
        const userResponse = {
            id: user._id,
            email: user.personalInfo.email,
            firstName: user.personalInfo.firstName,
            lastName: user.personalInfo.lastName,
            stepsCompleted: user.personalInfo.howManyStepsCompleted || 0
        };

        // Return response with token and user details
        return NextResponse.json(
            {
                message: "Login successful",
                token,
                user: userResponse
            },
            {
                status: 200,
                headers: {
                    'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
                }
            }
        );

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: "Failed to login" },
            { status: 500 }
        );
    }
}