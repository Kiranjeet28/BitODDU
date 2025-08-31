// lib/job/handler/job.handler.ts
import { PrismaClient } from '@prisma/client';
import { CreateJobInput, UpdateJobInput } from '../schema';

const prisma = new PrismaClient();

export const JobHandler = {
  async createJob(companyId: string, data: CreateJobInput) {
    return prisma.job.create({
      data: {
        ...data,
        applicationDeadline: new Date(data.applicationDeadline),
        companyId
      }
    });
  },

  async updateJob(jobId: string, data: UpdateJobInput) {
    return prisma.job.update({
      where: { id: jobId },
      data: {
        ...data,
        ...(data.applicationDeadline && { applicationDeadline: new Date(data.applicationDeadline) })
      }
    });
  },

  async deleteJob(jobId: string) {
    return prisma.job.delete({ where: { id: jobId } });
  },

  async getJobById(jobId: string) {
    return prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: { select: { id: true, companyName: true, hrName: true } },
        _count: { select: { applications: true } }
      }
    });
  }
};
