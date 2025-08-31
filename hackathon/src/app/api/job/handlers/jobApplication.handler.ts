// lib/job/handler/jobApplication.handler.ts
import { PrismaClient } from '@prisma/client';
import { CreateJobApplicationInput } from '../schema';

const prisma = new PrismaClient();

export const JobApplicationHandler = {
  async applyJob(studentId: string, jobId: string, data: CreateJobApplicationInput) {
    return prisma.jobApplication.create({
      data: {
        studentId,
        jobId,
        coverLetter: data.coverLetter,
        resumeUrl: data.resumeUrl,
        notes: data.notes
      }
    });
  },

  async getApplicationsByJob(jobId: string) {
    return prisma.jobApplication.findMany({
      where: { jobId },
      include: {
        student: { select: { id: true, name: true, rollNo: true } }
      }
    });
  }
};
