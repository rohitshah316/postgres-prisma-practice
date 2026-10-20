import bcrypt from "bcryptjs";
import {prisma} from "./db.js";

async function main(){
    const email="alex@gmail.com";
    const password="alexsmart123";

    //hash the password before storing it.
    const passwordHash=await bcrypt.hash(password,12)

    const user=await prisma.user.create({
        data:{
            email,
            passwordHash
        },
        select:{
            id:true,
            email:true,
            createdAt:true,
            updatedAt:true,
        },
    });

    console.log("User created successfully:");
    console.log(user);
}

main()
  .catch((error) => {
    console.error("User creation failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });