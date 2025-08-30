// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "STUDENT" | "COMPANY" | "TPO";
      // Student specific fields
      rollNo?: string;
      branch?: string;
      graduationYear?: number;
      // Company specific fields
      hrName?: string;
      hrContact?: string;
      hrLinkedIn?: string;
      // TPO specific fields
      institutionName?: string;
      contactNo?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "STUDENT" | "COMPANY" | "TPO";
    // Student specific fields
    rollNo?: string;
    branch?: string;
    graduationYear?: number;
    // Company specific fields
    hrName?: string;
    hrContact?: string;
    hrLinkedIn?: string;
    // TPO specific fields
    institutionName?: string;
    contactNo?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "STUDENT" | "COMPANY" | "TPO";
    // Student specific fields
    rollNo?: string;
    branch?: string;
    graduationYear?: number;
    // Company specific fields
    hrName?: string;
    hrContact?: string;
    hrLinkedIn?: string;
    // TPO specific fields
    institutionName?: string;
    contactNo?: string;
  }
}