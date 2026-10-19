import { prisma } from "./db.js";


async function main(){
    try{
        const user =await prisma.user.create({
            data:{
                name:"Another Alex",
                email:"alex@example.com"
            }
        })
    }catch(err){
        console.log("ERROR NAME:",err.name);
        console.log("ERROR CODE:",err.code);
        console.log("ERROR MESSAGE:",err.message);
    }
}

main().finally(async () => {
  await prisma.$disconnect();
});