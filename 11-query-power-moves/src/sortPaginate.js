import { prisma } from "./db.js";

async function main() {
  // 1. Sort users by age, youngest first
  const youngestFirst = await prisma.user.findMany({
    orderBy: {
      age: "asc",
    },
  });

  console.log("YOUNGEST FIRST:", youngestFirst);

  // 2. Sort posts by views, highest first
  const popularPosts = await prisma.post.findMany({
    orderBy: {
      views: "desc",
    },
  });

  console.log("POPULAR POSTS:", popularPosts);


  // 3. Get page 1: first 2 posts
const page1 = await prisma.post.findMany({
  orderBy: { id: "asc" },
  skip: 0,
  take: 2,
});

console.log("PAGE 1:", page1);

// 4. Get page 2: next 2 posts
const page2 = await prisma.post.findMany({
  orderBy: { id: "asc" },
  skip: 2,
  take: 2,
});

console.log("PAGE 2:", page2);


// 5. Get the first 2 posts
const firstBatch = await prisma.post.findMany({
  orderBy: { id: "asc" },
  take: 2,
});

console.log("FIRST BATCH:", firstBatch);

// 6. Get the next posts after the last post in the first batch
const lastPost = firstBatch[firstBatch.length - 1];

const nextBatch = await prisma.post.findMany({
  cursor: { id: lastPost.id },
  skip: 1,
  take: 2,
  orderBy: { id: "asc" },
});

console.log("NEXT BATCH:", nextBatch);

// 7. Count posts for each user
const usersWithPostCounts = await prisma.user.findMany({
  select: {
    name: true,
    _count: {
      select: {
        posts: true,
      },
    },
  },
});

console.log("USERS WITH POST COUNTS:", usersWithPostCounts);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });