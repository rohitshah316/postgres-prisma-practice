import { prisma } from "./db.js";

async function main() {
  // 1. Count all posts
  const totalPosts = await prisma.post.count();

  console.log("TOTAL POSTS:", totalPosts);

  // 2. Calculate aggregate statistics for post views
  const viewStats = await prisma.post.aggregate({
    _avg: {
      views: true,
    },
    _sum: {
      views: true,
    },
    _min: {
      views: true,
    },
    _max: {
      views: true,
    },
    _count: {
      views: true,
    },
  });

  console.log("VIEW STATISTICS:", viewStats);

  // 3. Group posts by published status
  const postsByStatus = await prisma.post.groupBy({
    by: ["published"],
    _count: {
      id: true,
    },
    _sum: {
      views: true,
    },
    _avg: {
      views: true,
    },
    orderBy: {
      published: "asc",
    },
  });

  console.log("POSTS BY STATUS:", postsByStatus);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });