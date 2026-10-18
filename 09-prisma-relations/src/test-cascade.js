
import { prisma } from "./db.js";

async function main() {
  // Create a disposable user with one post
  const user = await prisma.user.create({
    data: {
      name: "Temporary User",
      email: "temporary@example.com",
      posts: {
        create: {
          title: "Temporary Post",
        },
      },
    },
    include: {
      posts: true,
    },
  });

  console.log("Before delete:", user);

  // Delete the user; PostgreSQL cascades to their posts
  await prisma.user.delete({
    where: { id: user.id },
  });

  const remainingPosts = await prisma.post.findMany({
    where: { authorId: user.id },
  });

  console.log("Posts remaining after delete:", remainingPosts);
}

main()
  .catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


//   Quick revision notes
// Concept

// What you learned

// @relation

// Defines relationships between models

// authorId

// Foreign key stored in Post

// Nested writes

// Create a user and their posts together

// connect

// Link existing records

// Implicit many-to-many

// Prisma manages _PostToTag

// include

// Retrieve related records

// select

// Retrieve specific fields

// onDelete: Cascade

// Delete dependent records automatically

// prisma migrate dev

// Create and apply schema migrations

// Prisma Studio

// Inspect and manage database records visually