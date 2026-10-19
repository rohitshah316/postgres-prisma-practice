import { prisma } from "../db.js";

async function main() {
  const updatedUser = await prisma.user.update({
    where: {
      email: "alex@gmail.com",
    },
    data: {
      name: "Alex Shrestha Updated",
    },
  });

  console.log("Updated User:", updatedUser);
}

main()
  .catch((error) => {
    console.error("Update failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });