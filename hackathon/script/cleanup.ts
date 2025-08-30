// scripts/cleanup.ts
import { prisma } from "@/app/resources/lib/prisma";

async function cleanup() {
  await prisma.auth.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.tPO.deleteMany({});
  console.log("Cleaned old test data.");
}

cleanup().finally(() => process.exit());
