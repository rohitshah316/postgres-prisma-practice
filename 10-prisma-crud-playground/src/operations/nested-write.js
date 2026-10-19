
import { prisma } from "../db.js";

async function main() {
  const userWithPosts = await prisma.user.create({
    data: {
      name: "Rohit Shah",
      email: "rohit@gmail.com",
      posts: {
        create: [
          {
            title: "Learning Prisma Nested Writes",
            content: "My first post created with Prisma!",
            published: true,
          },
          {
            title: "Understanding Database Relations",
            content: "A user can have multiple posts.",
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  console.dir(userWithPosts, { depth: null });
}

main()
  .catch((error) => {
    console.error("Nested write failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
