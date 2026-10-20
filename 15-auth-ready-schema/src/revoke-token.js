import { prisma } from "./db.js";

async function main() {
  const tokenId = 1;

  const token = await prisma.refreshToken.update({
    where: {
      id: tokenId,
    },
    data: {
      revoked: true,
    },
    select: {
      id: true,
      userId: true,
      revoked: true,
      expiresAt: true,
    },
  });

  console.log("Refresh token revoked:");
  console.log(token);
}

main()
  .catch((error) => {
    console.error("Token revocation failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });