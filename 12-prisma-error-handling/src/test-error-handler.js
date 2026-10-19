import { Prisma } from "../generated/prisma/client.ts";
import { handlePrismaError } from "./error-handler.js";

const testErrors = [
  new Prisma.PrismaClientKnownRequestError("Duplicate email", {
    code: "P2002",
    clientVersion: "7.10.1",
    meta: { target: ["email"] },
  }),
  new Prisma.PrismaClientKnownRequestError("Record not found", {
    code: "P2025",
    clientVersion: "7.10.1",
  }),
  new Prisma.PrismaClientKnownRequestError("Foreign key violation", {
    code: "P2003",
    clientVersion: "7.10.1",
    meta: { field_name: "authorId" },
  }),
];

for (const error of testErrors) {
  console.log(handlePrismaError(error));
}