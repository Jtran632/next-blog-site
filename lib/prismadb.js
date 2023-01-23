import { PrismaClient } from "@prisma/client";
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
