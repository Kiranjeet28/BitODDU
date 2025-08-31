// src/app/api/student/schema/index.ts
import { z } from "zod";

// Education Schema
const educationSchema = z.object({
  course: z.string().min(1, "Course is required"),
  collegeName: z.string().min(1, "College name is required"),
  startYear: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  duration: z.coerce.number().int().positive(), // in years or months
  cgpa: z.coerce.number().min(0).max(10).optional(),
});

// Experience Schema
const experienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startYear: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  endYear: z.coerce.number().int().min(1900).max(new Date().getFullYear()).optional(),
  achievement: z.string().optional(),
});

// Project Schema
const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().optional(),
  link: z.string().url().optional().or(z.literal("").transform(() => undefined)),
});

// Skill Schema
const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
});

// Language Schema
const languageSchema = z.object({
  name: z.string().min(1, "Language name is required"),
  fluency: z.enum(["Native", "Professional", "Intermediate", "Beginner"]).optional(),
});

// Main Resume Schema
export const resumeSchema = z.object({
  action: z.enum(["resume"]),
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("").transform(() => undefined)),
  phoneNo: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  course: z.string().min(1, "Course is required"),
  branch: z.string().min(1, "Branch is required"),
  graduationYear: z.coerce.number().int().min(1900).max(2100),
  cgpa: z.coerce.number().min(0).max(10).optional(),

  // Arrays for Resume Sections
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  projects: z.array(projectSchema).optional(),
  skills: z.array(skillSchema).optional(),
  languages: z.array(languageSchema).optional(),
});

export type ResumeInput = z.infer<typeof resumeSchema>;