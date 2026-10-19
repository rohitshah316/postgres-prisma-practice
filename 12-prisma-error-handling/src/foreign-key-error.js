import { Prisma } from "../generated/prisma/client.ts";
import { prisma } from "./db.js";

async function main() {
  try {
    await prisma.post.create({
      data: {
        title: "Post with missing author",
        authorId: 99999,
      },
    });

    console.log("Post created successfully.");
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      console.log("Post creation failed: author does not exist.");
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});


// Error

// Meaning

// Typical HTTP status

// P2002

// Unique constraint violation

// 409 Conflict

// P2025

// Required record not found

// 404 Not Found

// P2003

// Foreign key constraint violation

// 400 Bad Request or 409 Conflict, depending on context

