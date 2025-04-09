import { connectDB } from "@/lib/mongodb";
import { DoctorModel } from "@/app/models/allModels";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const doctor = await DoctorModel.findById(params.id)
            .select('-personalInfo.password');

        if (!doctor) {
            return NextResponse.json(
                { error: "Doctor not found" },
                { status: 404 }
            );
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
