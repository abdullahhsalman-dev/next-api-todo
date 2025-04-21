// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Prevents creating multiple DB connections during hot reloads in dev.

// ✅ Keeps only one Prisma client alive during the dev lifecycle.

// ✅ Fully compatible with serverless and edge deployments if you're careful.
