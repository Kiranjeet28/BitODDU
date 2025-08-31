import { z } from 'zod';

// Enums
export const JobTypeSchema = z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT', 'FREELANCE']);
export const WorkModeSchema = z.enum(['REMOTE', 'ON_SITE', 'HYBRID']);
export const ApplicationStatusSchema = z.enum(['PENDING', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'SELECTED', 'WITHDRAWN']);

// Job Creation Schema
export const CreateJobSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(5000),
  requirements: z.array(z.string().min(1)).min(1).max(20),
  location: z.string().min(2).max(100),
  jobType: JobTypeSchema,
  workMode: WorkModeSchema,
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  experienceMin: z.number().min(0).max(50).optional(),
  experienceMax: z.number().min(0).max(50).optional(),
  skillsRequired: z.array(z.string().min(1)).min(1).max(30),
  qualifications: z.array(z.string().min(1)).min(1).max(10),
  applicationDeadline: z.string().datetime().refine((date) => new Date(date) > new Date(), {
    message: 'Application deadline must be in the future'
  })
}).refine((data) => !(data.salaryMin && data.salaryMax && data.salaryMin > data.salaryMax), {
  message: 'Minimum salary cannot be greater than maximum salary',
  path: ['salaryMin']
}).refine((data) => !(data.experienceMin && data.experienceMax && data.experienceMin > data.experienceMax), {
  message: 'Minimum experience cannot be greater than maximum experience',
  path: ['experienceMin']
});

// Update schema
export const UpdateJobSchema = CreateJobSchema.partial().extend({
  isActive: z.boolean().optional()
});

// Application Schema
export const CreateJobApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  coverLetter: z.string().max(2000).optional(),
  resumeUrl: z.string().url().optional(),
  notes: z.string().max(1000).optional()
});

// Queries
export const JobQuerySchema = z.object({
  page: z.string().transform(val => parseInt(val) || 1).optional(),
  limit: z.string().transform(val => Math.min(parseInt(val) || 10, 50)).optional(),
  search: z.string().optional(),
  jobType: JobTypeSchema.optional(),
  workMode: WorkModeSchema.optional(),
  location: z.string().optional(),
  salaryMin: z.string().transform(val => parseFloat(val) || undefined).optional(),
  salaryMax: z.string().transform(val => parseFloat(val) || undefined).optional(),
  companyId: z.string().optional(),
  isActive: z.string().transform(val => val === 'true').optional()
});

export type CreateJobInput = z.infer<typeof CreateJobSchema>;
export type UpdateJobInput = z.infer<typeof UpdateJobSchema>;
export type CreateJobApplicationInput = z.infer<typeof CreateJobApplicationSchema>;
export type JobQueryInput = z.infer<typeof JobQuerySchema>;
