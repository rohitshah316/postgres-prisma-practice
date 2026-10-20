import {prisma} from "./db.js";

async function main(){
    const users=await prisma.user.findMany();

    console.log("Databse connected successfully!");
    console.log("Users:",users);
}

main()
    .catch((err)=>{
        console.error("Database connection failed:",err.message)
        process.exitCode = 1;
    })
    .finally(
        async ()=>{
            await prisma.$disconnect();
        }
    )