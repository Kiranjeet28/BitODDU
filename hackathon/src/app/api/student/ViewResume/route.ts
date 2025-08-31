import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/resources/lib/prisma";

// Handle GET requests - fetch formatted resume data
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

        const student = await prisma.student.findUnique({
            where: { rollNo: rollNo },
            include: {
                education: {
                    orderBy: { startYear: 'desc' }
                },
                experience: {
                    orderBy: { startYear: 'desc' }
                },
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

        // Format the data for resume display
        const resumeData = {
            ...student,
            // Ensure phone number is properly formatted
            phoneNo: student.phoneNo ? formatPhoneNumber(student.phoneNo) : null,
            // Format experience dates
            experience: student.experience.map(exp => ({
                ...exp,
                period: formatPeriod(exp.startYear, exp.endYear ?? undefined)
            })),
            // Format education dates
            education: student.education.map(edu => ({
                ...edu,
                period: formatEducationPeriod(edu.startYear, edu.duration)
            }))
        };

        return NextResponse.json({
            success: true,
            resume: resumeData,
        });
    } catch (error) {
        console.error('GET Resume error:', error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

function formatPhoneNumber(phone: string): string {
    // Remove any non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as per your preference
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone; // Return original if not 10 digits
}

function formatPeriod(startYear: number, endYear?: number): string {
    if (endYear) {
        return `${startYear} - ${endYear}`;
    }
    return `${startYear} - Present`;
}

function formatEducationPeriod(startYear: number, duration: number): string {
    const endYear = startYear + duration;
    return `${startYear} - ${endYear}`;
}