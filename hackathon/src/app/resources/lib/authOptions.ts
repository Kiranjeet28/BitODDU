import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.auth.findUnique({
          where: { email: credentials.email },
          // Include related data based on role
          include: {
            student: true,
            company: true,
            tpo: true,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return user data with profile information
        let profileData = {};
        
        if (user.role === "STUDENT" && user.student) {
          profileData = {
            rollNo: user.student.rollNo,
            branch: user.student.branch,
            graduationYear: user.student.graduationYear,
          };
        } else if (user.role === "COMPANY" && user.company) {
          profileData = {
            hrName: user.company.hrName,
            hrContact: user.company.hrContact,
            hrLinkedIn: user.company.hrLinkedIn,
          };
        } else if (user.role === "TPO" && user.tpo) {
          profileData = {
            institutionName: user.tpo.institutionName,
            contactNo: user.tpo.contactNo,
          };
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          ...profileData,
        };
      },
    }),
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Store all user data in JWT token
        token.role = user.role;
        token.id = user.id;
        
        // Store role-specific data
        if (user.role === "STUDENT") {
          token.rollNo = (user as any).rollNo;
          token.branch = (user as any).branch;
          token.graduationYear = (user as any).graduationYear;
        } else if (user.role === "COMPANY") {
          token.hrName = (user as any).hrName;
          token.hrContact = (user as any).hrContact;
          token.hrLinkedIn = (user as any).hrLinkedIn;
        } else if (user.role === "TPO") {
          token.institutionName = (user as any).institutionName;
          token.contactNo = (user as any).contactNo;
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        // Add custom fields to session
        session.user.id = token.id as string;
        session.user.role = token.role as "STUDENT" | "COMPANY" | "TPO";
        
        // Add role-specific data to session
        if (token.role === "STUDENT") {
          (session.user as any).rollNo = token.rollNo;
          (session.user as any).branch = token.branch;
          (session.user as any).graduationYear = token.graduationYear;
        } else if (token.role === "COMPANY") {
          (session.user as any).hrName = token.hrName;
          (session.user as any).hrContact = token.hrContact;
          (session.user as any).hrLinkedIn = token.hrLinkedIn;
        } else if (token.role === "TPO") {
          (session.user as any).institutionName = token.institutionName;
          (session.user as any).contactNo = token.contactNo;
        }
      }
      return session;
    },
  },
  
  pages: {
    signIn: "/login",
  },
  
  // Add some security options
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);