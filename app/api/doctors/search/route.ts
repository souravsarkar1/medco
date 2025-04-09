import { connectDB } from "@/lib/mongodb";
import { DoctorModel } from "@/app/models/allModels";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
    let connection = false;

    try {
        // 1. Parse search parameters
        const url = new URL(req.url);
        const specialization = url.searchParams.get('specialization') || '';
        const name = url.searchParams.get('name') || '';

        // 2. Connect to database
        try {
            await connectDB();
            connection = true;
        } catch (dbError: any) {
            console.error("Database connection error:", dbError);
            return NextResponse.json(
                { error: "Database connection failed. Please try again." },
                { status: 500 }
            );
        }

        // 3. Build search query
        const query: any = {};

        if (specialization.trim()) {
            query['professionalDetails.specializations'] = {
                $regex: specialization.trim(),
                $options: 'i'
            };
        }

        if (name.trim()) {
            query['$or'] = [
                { 'personalInfo.firstName': { $regex: name.trim(), $options: 'i' } },
                { 'personalInfo.lastName': { $regex: name.trim(), $options: 'i' } }
            ];
        }

        // 4. Execute query
        const doctors = await DoctorModel.find(query)
            .select({
                'personalInfo.firstName': 1,
                'personalInfo.lastName': 1,
                'personalInfo.profileImage': 1,
                'professionalDetails.specializations': 1,
                'professionalDetails.yearsOfExperience': 1,
                'consultationInfo.consultationType.online.consultationFee': 1,
                'ratings': 1
            })
            .limit(50)
            .lean();

        // 5. Return results
        return NextResponse.json({
            success: true,
            doctors,
            count: doctors.length
        });

    } catch (error: any) {
        // Improved error logging
        const errorDetails = {
            message: error.message,
            name: error.name,
            code: error.code,
            connection: connection
        };

        console.error("Search API error:", errorDetails);

        return NextResponse.json({
            error: "Failed to search doctors. Please try again later.",
            details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
        }, {
            status: 500
        });
    }
}
