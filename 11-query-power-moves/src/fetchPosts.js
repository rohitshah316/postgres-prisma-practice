import {prisma} from "./db.js";

async function main(){
    const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true,
  },
});

console.dir(usersWithPosts, { depth: null });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });