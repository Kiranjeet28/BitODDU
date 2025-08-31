// src/app/api/student/route.ts
import { NextRequest, NextResponse } from "next/server";
import { updateResume } from "./handlers/buildResume";

// Handle POST requests for resume updates
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        console.log('API Request body:', body);
        console.log('Action:', body.action);
        
        if (!body.rollNo) {
            return NextResponse.json(
                { success: false, error: "Roll number is required" },
                { status: 400 }
            );
        }

        switch (body.action) {
            case 'resume':
                const result = await updateResume(body.rollNo, body);
                
                if (result.success) {
                    return NextResponse.json(result, { status: 200 });
                } else {
                    return NextResponse.json(result, { status: 400 });
                }
            
            default:
                return NextResponse.json(
                    { success: false, error: "Invalid action" },
                    { status: 400 }
                );
        }
    } catch (error: any) {
        console.error('Route handler error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: "Internal server error",
                details: error.message 
            },
            { status: 500 }
        );
    }
}

// Handle GET requests for loading resume data
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const rollNo = searchParams.get('rollNo');
        
        if (!rollNo) {
            return NextResponse.json(
                { success: false, error: "Roll number is required" },
                { status: 400 }
            );
        }

        // Import prisma here to load student data
        const { prisma } = await import("@/app/resources/lib/prisma");
        
        const student = await prisma.student.findUnique({
            where: { rollNo: rollNo },
            include: {
                education: true,
                experience: true,
                projects: true,
                skills: true,
                languages: true,
            },
        });

        if (!student) {
            return NextResponse.json(
                { success: false, error: "Student not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, student },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('GET handler error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: "Internal server error",
                details: error.message 
            },
            { status: 500 }
        );
    }
}