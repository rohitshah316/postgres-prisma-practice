import { Prisma } from "../generated/prisma/client.ts";
import { prisma } from "./db.js";

async function main() {
  try {
    await prisma.user.update({
      where: {
        id: 99999,
      },
      data: {
        name: "Updated Name",
      },
    });

    console.log("User updated successfully.");
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.log("Update failed: user not found.");
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});