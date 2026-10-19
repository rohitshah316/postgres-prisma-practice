import { prisma } from "../db.js";


async function main(){
    //1. find a user by thier unique email
    const uniqueUser=await prisma.user.findUnique({
        where:{
            email:"alex@gmail.com"
        },
    });

    console.log("Unique User found:",uniqueUser);


    //2. find the first user matching a condition
    const firstUser=await prisma.user.findFirst({
        where:{
            name:{
                contains:"Alex",
            }
        }
    });

    console.log("First User:",firstUser);

    //3. find all users
    const allUser=await prisma.user.findMany();
    console.log("FindMany:",allUser)
}








main()
  .catch((error) => {
    console.error("Read failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });