
import { prisma } from "./db.js";

async function main() {
  // First post gets both tags
  const firstPost = await prisma.post.update({
    where: { id: 1 },
    data: {
      tags: {
        connect: [
          { id: 1 },
          { id: 2 },
        ],
      },
    },
    include: { tags: true },
  });

  // Second post shares the PostgreSQL tag
  const secondPost = await prisma.post.update({
    where: { id: 2 },
    data: {
      tags: {
        connect: { id: 2 },
      },
    },
    include: { tags: true },
  });

  console.log("First post:", JSON.stringify(firstPost, null, 2));
  console.log("Second post:", JSON.stringify(secondPost, null, 2));
}

main()
  .catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
