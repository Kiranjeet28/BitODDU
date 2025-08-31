// src/app/api/student/handlers/buildResume.ts
import { prisma } from "@/app/resources/lib/prisma";
import { resumeSchema, ResumeInput } from "../schema";

export async function updateResume(rollNo: string, rawData: ResumeInput) {
  try {
    // ✅ Validate input again inside handler (safety)
    const parsed = resumeSchema.safeParse(rawData);
    if (!parsed.success) {
      throw {
        type: "ValidationError",
        details: parsed.error.flatten(),
      };
    }
    const data = parsed.data;

    // ✅ Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { rollNo: rollNo },
    });
    if (!existingStudent) {
      throw { type: "NotFoundError", message: "Student not found" };
    }

    // ✅ Perform update with transaction to ensure data consistency
    const updatedStudent = await prisma.$transaction(async (tx) => {
      // Delete existing related data
      await tx.education.deleteMany({
        where: { studentId: existingStudent.id }
      });
      await tx.experience.deleteMany({
        where: { studentId: existingStudent.id }
      });
      await tx.project.deleteMany({
        where: { studentId: existingStudent.id }
      });
      await tx.skill.deleteMany({
        where: { studentId: existingStudent.id }
      });
      await tx.language.deleteMany({
        where: { studentId: existingStudent.id }
      });

      // Update student with new data
      return await tx.student.update({
        where: { rollNo: rollNo },
        data: {
          name: data.name,
          address: data.address,
          linkedin: data.linkedin,
          phoneNo: data.phoneNo,
          course: data.course,
          branch: data.branch,
          graduationYear: data.graduationYear,
          cgpa: data.cgpa,

          // Create new related data
          education: {
            create: data.education?.map((e) => ({
              course: e.course,
              collegeName: e.collegeName,
              startYear: e.startYear,
              duration: e.duration,
              cgpa: e.cgpa,
            })) || [],
          },
          experience: {
            create: data.experience?.map((exp) => ({
              companyName: exp.companyName,
              position: exp.position,
              startYear: exp.startYear,
              endYear: exp.endYear,
              achievement: exp.achievement,
            })) || [],
          },
          projects: {
            create: data.projects?.map((p) => ({
              title: p.title,
              description: p.description,
              link: p.link,
            })) || [],
          },
          skills: {
            create: data.skills?.map((s) => ({
              name: s.name,
              level: s.level,
            })) || [],
          },
          languages: {
            create: data.languages?.map((l) => ({
              name: l.name,
              fluency: l.fluency,
            })) || [],
          },
        },
        include: {
          education: true,
          experience: true,
          projects: true,
          skills: true,
          languages: true,
        },
      });
    });

    return { success: true, student: updatedStudent };
  } catch (err: any) {
    console.error("❌ Error in updateResume:", err);

    if (err.type === "ValidationError") {
      return { success: false, error: "Invalid input", details: err.details };
    }

    if (err.type === "NotFoundError") {
      return { success: false, error: err.message };
    }

    // Prisma error codes (optional detailed handling)
    if (err.code === "P2002") {
      return { success: false, error: "Duplicate value (unique constraint failed)" };
    }

    if (err.code === "P2003") {
      return { success: false, error: "Foreign key constraint failed" };
    }

    if (err.code === "P2025") {
      return { success: false, error: "Record not found" };
    }

    return { success: false, error: "Unexpected error occurred" };
  }
}