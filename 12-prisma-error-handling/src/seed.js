import { prisma } from "./db.js";

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "alex@example.com",
    },
    update: {},
    create: {
      name: "Alex",
      email: "alex@example.com",
    },
  });

  console.log("Seed user:", user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });