import { Prisma } from "../generated/prisma/client.ts";

export function handlePrismaError(error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          status: 409,
          message: "A record with this value already exists.",
        };

      case "P2025":
        return {
          status: 404,
          message: "The requested record was not found.",
        };

      case "P2003":
        return {
          status: 400,
          message: "Invalid reference to a related record.",
        };

      default:
        return {
          status: 500,
          message: "A database error occurred.",
        };
    }
  }

  return {
    status: 500,
    message: "An unexpected error occurred.",
  };
}