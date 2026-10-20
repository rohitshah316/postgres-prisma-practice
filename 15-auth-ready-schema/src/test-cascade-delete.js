
import { prisma } from "./db.js";

async function main() {
  // Create a temporary user.
  const user = await prisma.user.create({
    data: {
      email: "cascade-test@example.com",
      passwordHash: "demo-hash-not-for-real-auth",
      refreshTokens: {
        create: [
          {
            tokenHash: "cascade-test-token-hash-1",
            expiresAt: new Date(Date.now() + 60 * 60 * 1000),
          },
          {
            tokenHash: "cascade-test-token-hash-2",
            expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
          },
        ],
      },
    },
    include: {
      refreshTokens: true,
    },
  });

  console.log("Temporary user created:", user.id);
  console.log("Tokens before deletion:", user.refreshTokens.length);

  // Delete the user. The database should cascade-delete their tokens.
  await prisma.user.delete({
    where: { id: user.id },
  });

  // Verify the related token records are gone.
  const remainingTokens = await prisma.refreshToken.count({
    where: { userId: user.id },
  });

  console.log("Tokens after deletion:", remainingTokens);

  if (remainingTokens === 0) {
    console.log("Cascade delete works correctly!");
  } else {
    throw new Error("Cascade delete test failed");
  }
}

main()
  .catch((error) => {
    console.error("Cascade test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
