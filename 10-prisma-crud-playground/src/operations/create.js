import {prisma} from "../db.js";

async function main(){
    const user=await prisma.user.create({
        data:{
            name:"Alex Shrestha",
            email:"alex@gmail.com",
        },
    });
    console.log("Created User:",user);
}

main()
      .catch((error) => {
    console.error("Create failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });