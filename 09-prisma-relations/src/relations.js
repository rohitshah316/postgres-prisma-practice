
import { prisma } from "./db.js";

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Alex",
      email: "alex.relations@example.com",
      posts: {
        create: [
          {
            title: "Learning Prisma Relations",
            content: "My first related post!",
          },
          {
            title: "Understanding PostgreSQL",
            content: "Learning foreign keys and joins.",
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  console.log(JSON.stringify(user, null, 2));
}

main()
  .catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
