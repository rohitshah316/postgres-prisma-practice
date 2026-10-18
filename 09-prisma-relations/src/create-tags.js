
import { prisma } from "./db.js";

async function main() {
  const prismaTag = await prisma.tag.create({
    data: {
      name: "Prisma",
    },
  });

  const postgresTag = await prisma.tag.create({
    data: {
      name: "PostgreSQL",
    },
  });

  console.log("Created tags:", prismaTag, postgresTag);
}

main()
  .catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
