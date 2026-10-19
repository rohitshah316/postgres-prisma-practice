
import { prisma } from "../db.js";

async function main() {
  // Create a temporary user for deletion practice
//   const testUser = await prisma.user.create({
//     data: {
//       name: "Delete Practice",
//       email: "delete-practice@example.com",
//     },
//   });

//   console.log("User created:", testUser);

  // Delete that exact user using their unique ID
  const deletedUser = await prisma.user.delete({
    where: {
      id: 5,
    },
  });

  console.log("User deleted:", deletedUser);
}

main()
  .catch((error) => {
    console.error("Delete failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
