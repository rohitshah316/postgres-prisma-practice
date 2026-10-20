import { prisma } from "./db.js";

async function main() {
  const userId = 1;

  const activeTokens = await prisma.refreshToken.findMany({
    where: {
      userId,
      revoked: false,
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      userId: true,
      expiresAt: true,
      revoked: true,
      createdAt: true,
    },
    orderBy: {
      expiresAt: "asc",
    },
  });

  console.log("Active refresh tokens:", activeTokens);
  console.log("Number of active tokens:", activeTokens.length);
}

main()
  .catch((error) => {
    console.error("Active-token query failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });