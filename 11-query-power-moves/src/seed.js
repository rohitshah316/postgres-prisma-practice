import {prisma} from "./db.js"

async function main() {
  // Clear existing sample data in the correct order
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  // Create users and posts
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Alex",
        email: "alex@gmail.com",
        age: 21,
        posts: {
          create: [
            {
              title: "Learning Prisma",
              content: "My first Prisma post",
              published: true,
              views: 120,
              tags: {
                create: [{ name: "Prisma" }, { name: "Database" }],
              },
            },
            {
              title: "SQL Basics",
              content: "Understanding SQL queries",
              published: true,
              views: 80,
              tags: {
                connect: [{ name: "Database" }],
              },
            },
          ],
        },
      },
    }),

    prisma.user.create({
      data: {
        name: "Ani",
        email: "ani@gmail.com",
        age: 20,
        posts: {
          create: [
            {
              title: "Node.js Guide",
              content: "Building server applications",
              published: false,
              views: 45,
              tags: {
                create: [{ name: "Node.js" }],
              },
            },
          ],
        },
      },
    }),

    prisma.user.create({
      data: {
        name: "Rohit Shah",
        email: "rohit@gmail.com",
        age: 21,
      },
    }),
  ]);

  console.log(`Created ${users.length} users.`);
  console.log("Sample data inserted successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });