
import { prisma } from "./db.js";

async function main() {
  // 1. Find a user and all their posts
  const user = await prisma.user.findUnique({
    where: { id: 1 },
    include: {
      posts: true,
    },
  });

  console.log("USER WITH POSTS:");
  console.log(JSON.stringify(user, null, 2));

  // 2. Find a post, its author, and its tags
  const post = await prisma.post.findUnique({
    where: { id: 1 },
    include: {
      author: true,
      tags: true,
    },
  });

  console.log("POST WITH AUTHOR AND TAGS:");
  console.log(JSON.stringify(post, null, 2));

  // 3. Return only selected fields
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      author: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log("SELECTED FIELDS:");
  console.log(JSON.stringify(posts, null, 2));
}

main()
  .catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
