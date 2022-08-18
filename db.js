import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

//for connecting user with product
// products  Product[]
//   user User @relation(fields: [userId], references: [id])
//   userId Int
