import bcrypt from "bcryptjs";
import { prisma } from "./db.js";

async function main() {
  try {
    await prisma.user.create({
      data: {
        email: "alex@gmail.com",
        passwordHash: await bcrypt.hash("AnotherDemoPassword123!", 12),
      },
    });

    console.log("Unexpected: duplicate user was created.");
  } catch (error) {
    if (
      error.code === "P2002" ) {
      console.log("Duplicate email rejected correctly.");
       console.log("Prisma error code:", error.code);
    } else {
      throw error;
    }
  }
}

main()
  .catch((error) => {
    console.error("Test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });