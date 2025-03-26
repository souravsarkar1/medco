import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken"
import { PatientModel } from "@/app/models/allModels";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Extract the Authorization header
        const authHeader = req.headers.get('authorization');

        // Check if Authorization header exists and starts with Bearer
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: "Unauthorized - No token provided" },
                { status: 401 }
            );
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Connect to database
        await connectDB();

        // Verify JWT token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        if (!decoded || !decoded.userId) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        // Find user in database
        const user = await PatientModel.findById(decoded.userId).select("-personalInfo.password");
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        // Handle specific JWT verification errors
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json(
                { error: "Unauthorized - Token expired" },
                { status: 401 }
            );
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        console.error("Error fetching user details:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    // Extract the Authorization header
    const authHeader = req.headers.get('authorization');

    // Check if Authorization header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: "Unauthorized: No token provided" },
            { status: 401 }
        );
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your-secret-key'
        ) as { userId: string };

        // Get the user ID from the decoded token
        const userId = decoded.userId;

        // Parse the request body
        const data = await req.json();

        // Validate user ID consistency
        if (data.userId && data.userId !== userId) {
            return NextResponse.json(
                { error: "Unauthorized: User ID mismatch" },
                { status: 403 }
            );
        }

        await connectDB();

        // Find the existing user by the verified user ID
        const existingUser = await PatientModel.findById(userId);

        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update personal info
        if (data.personalInfo) {
            existingUser.personalInfo = {
                ...existingUser.personalInfo,
                ...data.personalInfo,
                // Ensure steps completed is incremented
                howManyStepsCompleted: 2
            };
        }

        // Update medical history if provided
        if (data.medicalHistory) {
            existingUser.medicalHistory = {
                ...existingUser.medicalHistory,
                ...data.medicalHistory
            };
        }

        // Update appointments if provided
        if (data.appointments) {
            existingUser.appointments = [
                ...(existingUser.appointments || []),
                ...data.appointments
            ];
        }

        // Update preferred doctors if provided
        if (data.preferredDoctors) {
            existingUser.preferredDoctors = [
                ...(existingUser.preferredDoctors || []),
                ...data.preferredDoctors
            ];
        }

        // Save the updated user
        await existingUser.save();

        return NextResponse.json(
            {
                message: "Profile updated successfully",
                stepsCompleted: 2
            },
            { status: 200 }
        );
    } catch (error) {
        // Handle different types of JWT verification errors
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json(
                { error: "Unauthorized: Token expired" },
                { status: 401 }
            );
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { error: "Unauthorized: Invalid token" },
                { status: 401 }
            );
        }

        console.error("Profile update error:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}