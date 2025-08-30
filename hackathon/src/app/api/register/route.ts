import { NextResponse } from "next/server";
import { RegisterSchema } from "./schema";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/resources/lib/prisma";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = RegisterSchema.safeParse(json);

    if (!parsed.success) {
      const err = parsed.error.flatten();
      return NextResponse.json(
        { error: "Validation failed", fieldErrors: err.fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check if email already exists
    const emailExists = await prisma.auth.findUnique({
      where: { email: data.email },
    });

    if (emailExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Extra check: if role is STUDENT, ensure rollNo is unique
    if (data.role === "STUDENT") {
      const rollNoExists = await prisma.student.findUnique({
        where: { rollNo: data.rollNo },
      });

      if (rollNoExists) {
        return NextResponse.json(
          { error: "Roll number already exists" },
          { status: 409 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    let createdAuth;

    if (data.role === "STUDENT") {
      createdAuth = await prisma.auth.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: "STUDENT",
          student: {
            create: {
              rollNo: data.rollNo,
              branch: data.branch,
              graduationYear: data.graduationYear,
            },
          },
        },
        select: { id: true },
      });

    } else if (data.role === "COMPANY") {
      createdAuth = await prisma.auth.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: "COMPANY",
          company: {
            create: {
              hrName: data.hrName,
              hrContact: String(data.hrContact),
              hrLinkedIn: data.hrLinkedIn ?? "",
            },
          },
        },
        select: { id: true },
      });

    } else if (data.role === "TPO") {
      createdAuth = await prisma.auth.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: "TPO",
          tpo: {
            create: {
              institutionName: data.institutionName,
              contactNo: data.contactNo,
            },
          },
        },
        select: { id: true },
      });

    } else {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Registered successfully", userId: createdAuth.id },
      { status: 201 }
    );

  } catch (e: any) {
    console.error("Register Error:", e);

    if (e.code === "P2002") {
      return NextResponse.json(
        { error: `${e.meta?.target?.join(", ")} must be unique` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
