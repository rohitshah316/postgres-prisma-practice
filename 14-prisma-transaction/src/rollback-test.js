import { prisma } from "./db.js";

async function main() {
  try {
    await prisma.$transaction([
      prisma.account.update({
        where: { id: 1 },
        data: {
          balance: { decrement: 100 },
        },
      }),

      prisma.account.update({
        where: { id: 9999 },
        data: {
          balance: { increment: 100 },
        },
      }),
    ]);

    console.log("Transfer successful!");
  } catch (error) {
    console.log("Transfer failed as expected.");
    console.log("Error:", error.code ?? error.message);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });