import { prisma } from "./db.js";

async function main() {
  const alex = await prisma.account.create({
    data: {
      owner: "Alex",
      balance: "1000.00",
    },
  });

  const ani = await prisma.account.create({
    data: {
      owner: "Ani",
      balance: "500.00",
    },
  });

  console.log("Accounts created:");
  console.log(alex);
  console.log(ani);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });