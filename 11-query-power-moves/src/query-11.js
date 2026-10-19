import { prisma } from "./db.js";


async function main() {
    // 1. Find all users
  const allUsers = await prisma.user.findMany();
  console.log("ALL USERS:", allUsers);

  // 2. Find a user by exact email
  const user = await prisma.user.findMany({
    where: {
      email: "alex@gmail.com",
    },
  });
  console.log("ALEX:", user);



   //3. Find users whose names contain "Rohit"
  const nameMatch = await prisma.user.findMany({
    where: {
      name: {
        contains: "Rohit",
      },
    },
  });
  console.log("NAME MATCH:", nameMatch);

// 4. Find users whose age is either 20 or 21
  const ageMatch = await prisma.user.findMany({
    where: {
      age: {
        in: [20, 21],
      },
    },
  });
  console.log("AGE MATCH:", ageMatch);


  // 5. AND: age is 21 AND name contains "Alex"
const andUsers = await prisma.user.findMany({
  where: {
    AND: [
      { age: 21 },
      {
        name: {
          contains: "Alex",
        },
      },
    ],
  },
});

console.log("AND USERS:", andUsers);

// 6. OR: age is 20 OR name contains "Rohit"
const orUsers = await prisma.user.findMany({
  where: {
    OR: [
      { age: 20 },
      {
        name: {
          contains: "Rohit",
        },
      },
    ],
  },
});

console.log("OR USERS:", orUsers);

// 7. Combined: age is at least 21 AND name contains "Alex" OR "Rohit"
const combinedUsers = await prisma.user.findMany({
  where: {
    age: {
      gte: 21,
    },
    OR: [
      { name: { contains: "Alex" } },
      { name: { contains: "Rohit" } },
    ],
  },
});

console.log("COMBINED USERS:", combinedUsers);
}   


main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });