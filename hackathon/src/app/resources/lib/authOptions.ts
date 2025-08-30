// lib/auth.ts
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
          include: {
            student: true,
            company: true,
            tpo: true,
          },
        });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // Collect role-specific profile data
        let profileData: Record<string, any> = {};
        switch (user.role) {
          case "STUDENT":
            if (user.student) {
              profileData = {
                rollNo: user.student.rollNo,
                branch: user.student.branch,
                graduationYear: user.student.graduationYear,
              };
            }
            break;

          case "COMPANY":
            if (user.company) {
              profileData = {
                hrName: user.company.hrName,
                hrContact: user.company.hrContact,
                hrLinkedIn: user.company.hrLinkedIn,
              };
            }
            break;

          case "TPO":
            if (user.tpo) {
              profileData = {
                institutionName: user.tpo.institutionName,
                contactNo: user.tpo.contactNo,
              };
            }
            break;
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
        token.id = user.id;
        token.role = user.role;

        // Attach role-specific data
        Object.assign(token, user);
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "STUDENT" | "COMPANY" | "TPO";

        // Attach role-specific data
        Object.assign(session.user, token);
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
