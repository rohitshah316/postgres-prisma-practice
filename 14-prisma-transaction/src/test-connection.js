import {prisma} from "./db.js"

async function main(){
    const accounts=await prisma.account.findMany();

    console.log("Database connected successfully");
    console.log("Accounts:",accounts)
}

main()
.catch((error) => {
    console.error("Database connection failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });