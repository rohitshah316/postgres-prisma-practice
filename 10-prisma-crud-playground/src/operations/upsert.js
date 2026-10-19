import { prisma } from "../db.js";

async function main(){
    const user1=await prisma.user.upsert({
        where:{
            email:"alex@gmail.com",
        },
        update:{
            name:"Alex Updated with Upsert"
        },
        create:{
            name:"Alex Created With Upsert",
            email:"alex@gmail.com"
        }
    });
    const user2=await prisma.user.upsert({
        where:{
            email:"ani@gmail.com",
        },
        update:{
            name:"Ani Updated with Upsert"
        },
        create:{
            name:"Ani Created With Upsert",
            email:"ani@gmail.com"
        }
    });


    console.log("Upserted Users:",user1,user2);
}

main()
  .catch((error) => {
    console.error("Upsert failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });