import { z } from "zod";

// ---------- Common helpers ----------
const Email = z.string().trim().toLowerCase().email("Invalid email");
const Password = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password too long")
  .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Password must contain letters and numbers");
const Contact = z
  .string()
  .trim()
  .regex(/^[+]?\d{7,15}$/i, "Contact number must be 7-15 digits (optionally starting with +)");

// ---------- Role-based main schema ----------
export const RegisterSchema = z.discriminatedUnion("role", [
  // STUDENT schema
  z.object({
    role: z.literal("STUDENT"),
    email: Email,
    password: Password,
    confirmPassword: z.string(),
    rollNo: z.string().trim().min(1, "Roll No. is required"),
    branch: z.string().trim().min(1, "Branch is required"),
    graduationYear: z
      .coerce.number()
      .int("Graduation Year must be an integer")
      .gte(2000, "Graduation Year seems too old")
      .lte(2100, "Graduation Year seems too far in future"),
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  }),

  // COMPANY schema
  z.object({
    role: z.literal("COMPANY"),
    email: Email,
    password: Password,
    confirmPassword: z.string(),
    hrName: z.string().trim().min(2, "HR Name is required"),
    hrContact: z.union([
  z.string().regex(/^[0-9]{10}$/),
  z.number().refine(num => num.toString().length === 10, "Must be a 10 digit number")
])
,
    hrLinkedIn: z
      .string()
      .refine((val) => val === "" || z.string().url().safeParse(val).success, {
        message: "Invalid LinkedIn URL",
      })
      .optional()
      .or(z.literal("").transform(() => undefined)),
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  }),

  // TPO schema
  z.object({
    role: z.literal("TPO"),
    email: Email,
    password: Password,
    confirmPassword: z.string(),
    institutionName: z.string().trim().min(2, "Institution Name is required"),
    contactNo: Contact,
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  }),
]);
